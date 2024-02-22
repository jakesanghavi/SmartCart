import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// dotenv.config();

// const { env } = process;


class SupabaseClient {
  constructor() {
    // Retrieve the environment variables
    const supabaseUrl = process.env.SUPABASE_URL || "https://gbwczxfefgvovfqrhysd.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdid2N6eGZlZmd2b3ZmcXJoeXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNjE2MjAsImV4cCI6MjAyMjczNzYyMH0.LBQ2KJW0MqDZIKeHQTgpDBoxfrZ6mxvhg52oJZMYfW4";

    // Initialize the Supabase client
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Perform a query on a specified table.
   *
   * @param {string} table_name - Name of the table to query.
   * @param {string} select_query - Columns to select, defaults to '*'.
   * @param {string} filter_query - Filter condition, defaults to ''.
   * @return {Object} Result of the query.
   */
  async queryTable(table_name, select_query = "*", filter_query = "") {
    if (filter_query === "") {
      filter_query = "true";
    }

    const { data, error } = await this.client
      .from(table_name)
      .select(select_query)
      .filter(filter_query);

    if (error) throw error;
    return data;
  }

  async queryTableIlike(table_name, ilike_column, ilike_query) {
    const { data, error } = await this.client
      .from(table_name)
      .select()
      .ilike(ilike_column, ilike_query);

    if (error) throw error;
    return data;
  }
}

export { SupabaseClient };
