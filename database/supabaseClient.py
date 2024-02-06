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
    
    def insert_table(self, table_name, data):
        """
        Insert data into a specified table.
        
        :param table_name: Name of the table to insert into.
        :param data: Data to insert.
        :return: Result of the insert.
        """
        result = self.client.table(table_name).insert(data).execute()
        return result
    
    def upsert_table(self, table_name, data):
        """
        Upsert data into a specified table.
        
        :param table_name: Name of the table to upsert into.
        :param data: Data to upsert.
        :return: Result of the upsert.
        """
        result = self.client.table(table_name).upsert(data).execute()
        return result   
    
    def delete_table(self, table_name, where_clause):
        """
        Delete data from a specified table.
        
        :param table_name: Name of the table to delete from.
        :param where_clause: Where clause to filter the rows to delete.
        :return: Result of the delete.
        """
        result = self.client.table(table_name).delete().match(where_clause).execute()
        return result
