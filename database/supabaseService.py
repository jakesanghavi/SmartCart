from database.supabaseClient import SupabaseClient
from database.utils import get_keywords
from database.models import ScraperObject, Item

class SupabaseService:
    def __init__(self):
        self.client = SupabaseClient()
    
    def query_table(self, table_name, select_query="*"):
        """
        Perform a query on a specified table.
        
        :param table_name: Name of the table to query.
        :param select_query: Columns to select, defaults to '*'.
        :return: Result of the query.
        """
        result = self.client.query_table(table_name, select_query)
        return result
    
    def delete_all_from_table(self, table_name):
        """
        Delete all rows from a specified table.
        
        :param table_name: Name of the table to delete from.
        :return: Result of the delete.
        """
        result = self.client.delete_table(table_name, "TRUE")
        return result
    
    def insert_scraper_objects(self, scraper_objects: list[ScraperObject]):
        return
    
    def queryAllItems(self) -> list[Item]:
        result = self.client.query_table(table_name="items")
        return result
