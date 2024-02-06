import difflib
import pandas as pd


# Find the n most similar items to the search input, where n is some predefined integer
def find_most_similar_items(input_item, item_list, n=5):
    # Use difflib to find the closest matches. This generally only finds 0 or 1 match, so we need to add more suggestions
    matches = difflib.get_close_matches(input_item, item_list, n=n)

    # If fewer than n matches are found, fill the list with the most similar items
    while len(matches) < n:
        remaining_items = set(item_list) - set(matches)
        
        '''
        1. difflib.SequenceMatcher(None, input_item, x).ratio(): This calculates the similarity ratio between the input_item and the current item (x) using the SequenceMatcher from the difflib module. The ratio() method returns a float between 0 and 1, where 1 means a perfect match.

        2. sum(word in x.lower() for word in input_item.lower().split()): This part counts the number of words in the input_item that are present in the current item (x). It converts both the input_item and x to lowercase to ensure case-insensitive comparison. The sum function adds up the True values, giving a count of matching words.

        3. (difflib.SequenceMatcher(None, input_item, x).ratio(), sum(word in x.lower() for word in input_item.lower().split())): This creates a tuple containing two values - the similarity ratio and the count of matching words.

        4. max(remaining_items, key=lambda x: (difflib.SequenceMatcher(None, input_item, x).ratio(), sum(word in x.lower() for word in input_item.lower().split()))): The max function is used to find the item (x) with the maximum value based on the key function. In this case, it finds the item with the highest similarity ratio and the highest count of matching words.
        
        5. So, the line essentially finds the item with the maximum overall score, considering both the similarity ratio and the count of matching words. This ensures that items containing specific words from the input have a higher score.
        '''
        most_similar = max(remaining_items, key=lambda x: (difflib.SequenceMatcher(None, input_item, x).ratio(), sum(word in x.lower() for word in input_item.lower().split())))
        matches.append(most_similar)

    return matches

# Read in the data
df = pd.read_csv('instacart_scraper_v1_results.csv')

# Make a list from our items
grocery_items = list(df['Item Name'])

# Simulate user input and create suggestions from it
user_input = "lemon"
suggested_items = find_most_similar_items(user_input, grocery_items)

print(f"Suggested items for '{user_input}':")
for i, suggestion in enumerate(suggested_items, start=1):
    print(f"{i}. {suggestion}")
