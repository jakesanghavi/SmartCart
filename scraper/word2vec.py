import gensim
from gensim.models import Word2Vec
from gensim.models.callbacks import CallbackAny2Vec
import gensim.downloader as api
from nltk.tokenize import word_tokenize
import nltk
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

'''
KNOWN ISSUE:

The corpus is far too large and crashes the kernel.
We need to somehow chunk the corpus in parts OR set a max size for it
to prevent this.

TODO:

After the crashing issue is fixed, we will need to save the model somewhere. We can then load
this into the website so we can get the embedding and the similarities on-demand
'''

# Required for code to work
nltk.download('punkt')

# Custom callback to print training progress
class LossCallback(CallbackAny2Vec):
    def __init__(self):
        self.epoch = 0

    def on_epoch_end(self, model):
        loss = model.get_latest_training_loss()
        if self.epoch == 0:
            print(f"Loss after epoch {self.epoch}: {loss}")
        else:
            print(f"Loss after epoch {self.epoch}: {loss - self.loss_previous_step}")
        self.epoch += 1
        self.loss_previous_step = loss

# Custom Word2Vec model
class CustomWord2Vec(nn.Module):
    def __init__(self, vocab_size, embed_size, default_embed=None):
        super(CustomWord2Vec, self).__init__()
        self.embeddings = nn.Embedding(vocab_size, embed_size)
        self.linear = nn.Linear(embed_size, vocab_size)
        self.default_embed = default_embed

    def forward(self, target, context):
        embeds_target = self.embeddings(target)
        embeds_context = self.embeddings(context)
        scores = torch.matmul(embeds_target, embeds_context.t())
        return scores

    def get_embedding(self, word_index):
        if word_index >= 0 and word_index < len(self.embeddings.weight):
            return self.embeddings(torch.tensor(word_index))

        # If the word hasn't existed in our training dataset, we have to use a default embedding.
        # We should set this later. Some of the products have weird names that likely aren't in the train set
        elif self.default_embed is not None:
            return self.default_embed
        else:
            raise ValueError("Out-of-vocabulary word and no default embedding provided")

# Train the model
def train_word2vec(corpus, embed_size=100, window_size=5, min_count=5, epochs=2, default_embed=None):
    # Tokenize the corpus
    tokenized_corpus = [word_tokenize(chunk.lower()) for sentence in corpus for chunk in sentence]

    # Create Word2Vec model
    word2vec_model = Word2Vec(
        sentences=tokenized_corpus,
        vector_size=embed_size,
        window=window_size,
        min_count=min_count,
        workers=4,
        callbacks=[LossCallback()],
    )

    # Get vocabulary and word embeddings
    vocab = word2vec_model.wv.index_to_key
    word_embeddings = word2vec_model.wv.vectors

    # Convert to PyTorch tensors
    vocab_size, embed_size = word_embeddings.shape
    vocab_tensor = torch.tensor(range(vocab_size))
    embed_tensor = torch.tensor(word_embeddings)

    # Initialize and train the model
    model = CustomWord2Vec(vocab_size, embed_size, default_embed=default_embed)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.SGD(model.parameters(), lr=0.01)

    for epoch in range(epochs):
        total_loss = 0
        for target in vocab_tensor:
            context = vocab_tensor[vocab_tensor != target]
            scores = model(target.repeat(len(context)), context)
            loss = criterion(scores, torch.arange(len(context)))
            total_loss += loss.item()
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        print(f"Epoch {epoch + 1}/{epochs}, Loss: {total_loss}")

    return model, vocab, embed_tensor

# Function to get phrase embedding by averaging word embeddings
def get_phrase_embedding(phrase, word2vec_model, default_embed):
    words = word_tokenize(phrase.lower())
    embeddings = [word2vec_model.get_embedding(word2vec_model.vocab.index(word))
                  if word in word2vec_model.vocab else default_embed
                  for word in words]
    
    embeddings = [embedding.numpy() for embedding in embeddings if embedding is not None]
    
    if len(embeddings) == 0:
        return default_embed.numpy() if default_embed is not None else np.zeros(word2vec_model.vector_size)
    
    return np.mean(embeddings, axis=0)

# Load the corpus from the API
corpus = api.load("text8")
default_embedding = torch.randn(100)  # Set a random default embedding for unseen words from the test set
model, vocab, embeddings = train_word2vec(corpus, default_embed=default_embedding)

# Test the model with a phrase
phrase = "Farmer's Promise Yellow Potatoes"
phrase_embedding = get_phrase_embedding(phrase, model, default_embedding)

print(f"Embedding for '{phrase}': {phrase_embedding}")
