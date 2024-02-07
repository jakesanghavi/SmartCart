import pandas as pd
import re
from database.models import ScraperObject

def get_keywords(string):
    """
    Get all sequential combinations of words in a string.
    
    :param string: String to get combinations from.
    :return: List of combinations.
    """
    stop_words = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"]
    punctuation = [".", ",", "!", "?", ";", ":", "'", '"', "(", ")", "[", "]", "{", "}", "<", ">", "/", "\\", "|", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "~", "`"]
    
    words = string.split()

    words = [word for word in words if word not in stop_words and word not in punctuation]
    
    combinations = []
    for i in range(len(words)):
        for j in range(i, len(words)):
            combinations.append(" ".join(words[i:j+1]))
    return combinations 


def parse_string_to_list(string: str):
    """
    Parses list like "['Organic', 'Non-GMO']" to list of strings.
    
    :param string: String to parse.
    :return: List of strings.
    """
    
    return string[1:-1].split(", ")

def parse_quantity_and_unit_from_amount(amount: str):
    """
    Parse the quantity and unit from the amount string, with default handling for "per" cases.
    
    Args:
    - amount_str (str): The amount string to parse.
    
    Returns:
    - float: The quantity parsed from the string, or 1.0 if implied by "per".
    - str: The unit parsed from the string, or None if no unit found.
    """
    amount = str(amount)  # Convert amount to string
    
    # Check for the "per [unit]" pattern first to handle special case
    per_match = re.search(r"per\s+([a-zA-Z]+)", amount)
    if per_match:
        return 1.0, per_match.group(1).lower()
    
    # Regular pattern match for quantity and unit
    match = re.search(r"(\d+(\.\d+)?)\s*([a-zA-Z]+)", amount)
    if match:
        quantity = float(match.group(1))  # Convert the quantity to float
        unit = match.group(3).lower()  # Keep the unit in lower case for consistency
        return quantity, unit
    else:
        return None, None

def get_scraper_objects(data: pd.DataFrame):
    """
    Convert a pandas dataframe to a list of ScraperObject objects.
    
    :param data: Pandas dataframe to convert.
    :return: List of ScraperObject objects.
    """
    scraper_objects: list[ScraperObject] = []
    
    for index, row in data.iterrows():
        store_name = row["Store"]
        item_name = row["Item Name"]
        item_price = row["Price"]
        item_quantity, item_unit = parse_quantity_and_unit_from_amount(row["Amount"])
        tags = parse_string_to_list(row["Tags"])
        
        obj = ScraperObject(
            store_name=store_name, 
            item_name=item_name, 
            item_price=item_price, 
            item_quantity=item_quantity, 
            item_unit=item_unit, 
            tags=tags)
        
        scraper_objects.append(obj)
        
    return scraper_objects