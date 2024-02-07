import pandas as pd
import re
from database.models import ScraperObject

def parse_string_to_list(string: str):
    """
    Parses list like "['Organic', 'Non-GMO']" to list of strings.
    
    :param string: String to parse.
    :return: List of strings.
    """
    string = string.strip("[]")  # Remove square brackets
    items = string.split(",")  # Split by comma
    
    # Remove leading and trailing spaces from each item
    items = [item.strip() for item in items]
    
    # Remove empty strings
    items = [item for item in items if item]
    
    return items

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
        item_price = float(row["Price"][1:])
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