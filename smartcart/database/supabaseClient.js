import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

class SupabaseClient {
  constructor() {
    // Retrieve the environment variables
    const supabaseUrl = process.env.SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_KEY || "";

    // Initialize the Supabase client
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async queryTable(table_name, select_query = "*") {
    /**
     * Perform a query on a specified table.
     *
     * @param {string} table_name - Name of the table to query.
     * @param {string} select_query - Columns to select, defaults to '*'.
     * @return {Object} Result of the query.
     */
    const { data, error } = await this.client
      .from(table_name)
      .select(select_query);
    if (error) throw error;
    return data;
  }

  async insertTable(table_name, data) {
    /**
     * Insert data into a specified table.
     *
     * @param {string} table_name - Name of the table to insert into.
     * @param {Object} data - Data to insert.
     * @return {Object} Result of the insert.
     */
    const { data: insertedData, error } = await this.client
      .from(table_name)
      .insert(data);
    if (error) throw error;
    return insertedData;
  }
}

export { SupabaseClient };
