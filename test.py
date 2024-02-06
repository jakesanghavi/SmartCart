import asyncio
from database.supabaseService import SupabaseService

async def main():
    # Initialize the Supabase service
    service = SupabaseService()

    # Await the async query_table method
    res = await service.query_table("users")

    print(res)

if __name__ == "__main__":
    asyncio.run(main())
