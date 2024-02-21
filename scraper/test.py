from database.supabaseService import SupabaseService
from database.utils import get_scraper_objects
from database.models import ScraperObject, Item
import pandas as pd

# Read csv
df: pd.DataFrame = pd.read_csv('./scraper/Giant_Eagle.csv')

objs: list[ScraperObject] = get_scraper_objects(df)

service: SupabaseService = SupabaseService()
service.insert_scraper_objects(objs)

items: list[Item] = service.query_all_items()

print(items[0].to_dict())
