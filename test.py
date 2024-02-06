from database.supabaseService import SupabaseService


# Initialize the Supabase service
service = SupabaseService()

# Await the async query_table method
res = service.query_table(table_name="stores")

print(res)
