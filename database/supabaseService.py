from database.supabaseClient import SupabaseClient
from database.utils import get_keywords

class SupabaseService:
    def __init__(self):
        self.client = SupabaseClient()

    def upsertStore():
        return
    
    def upsertItem():
        # check if item exists with same name at same store
        # if it does, delete all 
        return
    
    def insertPrice():
        return
    
    
    def query_table(self, table_name, select_query="*"):
        """
        Perform a query on a specified table.
        
        :param table_name: Name of the table to query.
        :param select_query: Columns to select, defaults to '*'.
        :return: Result of the query.
        """
        result = SupabaseClient.query_table(self.client, table_name, select_query)
        return result
    
    def delete_all_from_table(self, table_name):
        """
        Delete all rows from a specified table.
        
        :param table_name: Name of the table to delete from.
        :return: Result of the delete.
        """
        result = SupabaseClient.delete_table(self.client, table_name, "TRUE")
        return result