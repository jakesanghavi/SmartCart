import torch
from transformers import BertModel, BertTokenizer
import numpy as np
import pandas as pd
import Levenshtein
from difflib import SequenceMatcher
import json

# Load pre-trained model and tokenizer
model = BertModel.from_pretrained('bert-base-uncased')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Function to compute text embeddings in batches
def compute_embeddings(texts):
    inputs = tokenizer(texts, return_tensors="pt", padding=True, truncation=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1).numpy()
    return embeddings

# Function to compute cosine similarity
def cosine_similarity(embeddings1, embeddings2):
    norm1 = np.linalg.norm(embeddings1, axis=1)
    norm2 = np.linalg.norm(embeddings2, axis=1)
    dot_product = np.sum(embeddings1 * embeddings2, axis=1)
    similarity = dot_product / (norm1 * norm2)
    return similarity

# Function to find the longest common substring (LCS)
# This can help when cosine similarity and levenshtein distance
# don't get quite the best answers
def longest_common_substring(s1, s2):
    # Initialize a SequenceMatcher object with the two strings
    matcher = SequenceMatcher(None, s1, s2)
    
    # Find the longest matching block
    matcher = matcher.find_longest_match(0, len(s1), 0, len(s2))
    
    # Get the longest common substring
    longest_substring = s1[matcher.a: matcher.a + matcher.size]
    
    # Return the LCS/length of the search term to bound between 0 and 1
    return len(longest_substring)/len(s1)

# Load the data data
data = pd.read_csv('items_rows.csv')

# Get just the items column
items = data['name']

# Pre-compute embeddings for all items
item_embeddings = compute_embeddings(items.tolist())


# Initialize a dictionary to store k: v of item: [most similar items]
top_items = {}

# Compute similarities as a sum of all three similarity types
for idx, item in enumerate(items):
    # Initialize a list that will be the value of the dictionary for a given item
    # The list will contains lists [a, b] of the form [item, similarity] 
    top_items[item] = []
    # Compute the cosine similarity between the item and all other items
    similarities_cosine = cosine_similarity(item_embeddings[idx].reshape(1, -1), item_embeddings).flatten()
    
    # Iterate over the other items
    for i, other_item in enumerate(items):
        if i != idx:
            # Compute Levenshtein similarity
            distance = Levenshtein.distance(item, other_item)
            similarity_levenshtein = 1 - distance/len(other_item)
            # Compute our LCS similarity measure
            similarity_lcs = longest_common_substring(item, other_item)
            # Add together all three similarities and store them in the list
            similarity_combined = similarities_cosine[i] + similarity_levenshtein + similarity_lcs
            top_items[item].append([other_item, similarity_combined])
    
    # Sort the similarity list by the similarity, descending
    top_items[item].sort(key=lambda x: x[1], reverse=True)

# Iterate over each key-value pair in the dictionary and keep only the first 50 values
# Each store SHOULD have at least one item in the top 50, and this keeps the size of the dict
# small enough that when getting the JSON from the database, we don't introduce too much lag.
for key, value in top_items.items():
    top_items[key] = value[:50]
    # Get only the item names, we no longer actually need to store the similarities themselves
    top_items[key] = [sublist[0] for sublist in top_items[key]]
    
# Store this dict in a JSON file to be uploaded to the database
with open('item_similarities.json', 'w') as f:
    json.dump(top_items, f)
