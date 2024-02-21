import os
from dotenv import load_dotenv
from supabase import create_client, Client
from database.models import Item, Store, Tag, ItemPrice, ItemPriceTags

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
        return result.data
    
    def insert_table(self, table_name, data):
        """
        Insert data into a specified table.
        
        :param table_name: Name of the table to insert into.
        :param data: Data to insert.
        :return: Result of the insert.
        """
        result = self.client.table(table_name).insert(data).execute()
        return result.data
    
    
    def delete_table(self, table_name, where_clause):
        """
        Delete data from a specified table.
        
        :param table_name: Name of the table to delete from.
        :param where_clause: Where clause to filter the rows to delete.
        :return: Result of the delete.
        """
        result = self.client.table(table_name).delete().match(where_clause).execute()
        return result.data
    
    def insert_store(self, store: Store) -> Store:
        """
        Insert a store into the table.
        
        :param store: Store to insert.
        :return: Result of the insert.
        """
        print(store.to_dict_no_id())
        result = self.client.table("stores").insert(store.to_dict_no_id()).execute()
        return Store(id=result.data[0]["id"], name=result.data[0]["name"])
    
    def insert_item(self, item: Item) -> Item:
        """
        Insert an item into the table.
        
        :param item: Item to insert.
        :return: Result of the insert.
        """
        result = self.client.table("items").insert(item.to_dict_no_id()).execute()
        return Item(id=result.data[0]["id"], name=result.data[0]["name"])
    
    def insert_item_price(self, item_price: ItemPrice):
        """
        Insert an item price into the table.
        
        :param item_price: Item price to insert.
        :return: Result of the insert.
        """
        result = self.client.table("item_prices").insert(item_price.to_dict_no_id()).execute()
        return ItemPrice(
            id=result.data[0]["id"],
            item_id=result.data[0]["item_id"],
            store_id=result.data[0]["store_id"],
            price=result.data[0]["price"],
            quantity=result.data[0]["quantity"],
            unit=result.data[0]["unit"],
            datetime=result.data[0]["datetime"],
            image_url=result.data[0]["image_url"]
        )
        
    def insert_tag(self, tag: Tag) -> Tag:
        """
        Insert a tag into the table.
        
        :param tag: Tag to insert.
        :return: Result of the insert.
        """
        result = self.client.table("tags").insert(tag.to_dict_no_id()).execute()
        return Tag(id=result.data[0]["id"], name=result.data[0]["name"])
    
    def insert_item_price_tag(self, item_price_tags: ItemPriceTags):
        """
        Insert an item price tag into the table.
        
        :param item_price_tags: Item price tag to insert.
        :return: Result of the insert.
        """
        result = self.client.table("item_price_tags").insert(item_price_tags.to_dict_no_id()).execute()
        return ItemPriceTags(
            id=result.data[0]["id"],
            tag_id=result.data[0]["tag_id"],
            item_price_id=result.data[0]["item_price_id"]
        )
    
    def get_items_with_name(self, name: str) -> Item:
        """
        Get an item with a specified name from a table.
        
        :param name: Name of the item to retrieve.
        :return: Result of the query.
        """
        result = self.client.table("items").select("*").eq("name", name).execute()
        
        if len(result.data) == 0:
            return None
        
        return [Item(id=item["id"], name=item["name"]) for item in result.data][0]

    def get_stores_with_name(self, name: str) -> Store:
        """
        Get a store with a specified name from a table.
        
        :param name: Name of the store to retrieve.
        :return: Result of the query.
        """
        result = self.client.table("stores").select("*").eq("name", name).execute()
        
        if len(result.data) == 0:
            return None
        
        return [Store(id=store["id"], name=store["name"]) for store in result.data][0]
    
    def get_tags_with_name(self, name: str) -> Tag:
        """
        Get a tag with a specified name from a table.
        
        :param name: Name of the tag to retrieve.
        :return: Result of the query.
        """
        result = self.client.table("tags").select("*").eq("name", name).execute()
        
        if len(result.data) == 0:
            return None
        
        return [Tag(id=tag["id"], name=tag["name"]) for tag in result.data][0]