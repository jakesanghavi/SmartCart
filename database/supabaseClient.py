import os
from dotenv import load_dotenv
from supabase import create_client, Client

class SupabaseClient:
    def __init__(self):
        # Load environment variables from .env file
        load_dotenv()

        # Retrieve the environment variables
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_KEY")

        # Initialize the Supabase client
        self.client: Client = create_client(url, key)

    def query_table(self, table_name, select_query="*"):
        """
        Perform a query on a specified table.
        
        :param table_name: Name of the table to query.
        :param select_query: Columns to select, defaults to '*'.
        :return: Result of the query.
        """
        result = self.client.table(table_name).select(select_query).execute()
        return result
