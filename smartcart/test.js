import { SupabaseService } from "./database/supabaseService.js"; // Adjust the path as needed

async function testSupabaseService() {
  // Instantiate the SupabaseService
  const supabaseService = new SupabaseService();

  // Example usage: querying a table
  try {
    const items = await supabaseService.queryTable("items");
    console.log("Items:", items);
  } catch (error) {
    console.error("Error querying items:", error);
  }
}

// Call the test function
testSupabaseService();
