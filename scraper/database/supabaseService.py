from database.supabaseClient import SupabaseClient
from scraper.database.models import ScraperObject, Item, Store, ItemPrice, Tag, ItemPriceTags

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
    
    def insert_scraper_objects(self, scraper_objects: list[ScraperObject]) -> None:
        for obj in scraper_objects:
            # Check all values in ScraperObject exist
            if not obj.store_name or not obj.item_name or not obj.item_price or not obj.item_quantity or not obj.item_unit:
                print(f"Missing values in ScraperObject: {obj}")
                continue
            
            # Insert or find existing store and item
            store: Store = self.client.get_stores_with_name(obj.store_name)
            item: Item = self.client.get_items_with_name(obj.item_name)

            if not store:
                store = self.client.insert_store(Store(name=obj.store_name))
            
            if not item:
                item = self.client.insert_item(Item(name=obj.item_name))      

            # Insert item price
            item_price: ItemPrice = ItemPrice(
                item_id=item.id,
                store_id=store.id,
                price=obj.item_price,
                quantity=obj.item_quantity,
                unit=obj.item_unit,
                datetime=obj.datetime,
                image_url=obj.image_url
                )
            
            print(item.to_dict_no_id())
            print(store.to_dict_no_id())
            print(obj.to_dict())
            print(item_price.to_dict_no_id())
            item_price: ItemPrice = self.client.insert_item_price(item_price)
            
            # Insert tags
            for tag in obj.tags:
                tag_obj: Tag = self.client.get_tags_with_name(tag)
                if not tag_obj:
                    tag_obj = self.client.insert_tag(Tag(name=tag))
                
                # Insert item price tags
                item_price_tag = ItemPriceTags(tag_id=tag_obj.id, item_price_id=item_price.id)
                self.client.insert_item_price_tag(item_price_tag)
    
    def query_all_items(self) -> list[Item]:
        result = self.client.query_table(table_name="items")
        
        output = []
        for item in result:
            print(item)
            output.append(Item(
                id=item["id"],
                name=item["name"],
            ))
            
        return output
