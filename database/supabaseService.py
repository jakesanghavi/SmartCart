from supabaseClient import SupabaseClient

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
        result = SupabaseClient.query_table(self.client, table_name, select_query)
        return result