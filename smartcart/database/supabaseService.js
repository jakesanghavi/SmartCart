import { SupabaseClient } from "./supabaseClient.js"; // Assuming the file path to your SupabaseClient class

class SupabaseService {
  constructor() {
    this.client = new SupabaseClient();
  }

  async queryTable(table_name, select_query = "*") {
    /**
     * Perform a query on a specified table.
     *
     * @param {string} table_name - Name of the table to query.
     * @param {string} select_query - Columns to select, defaults to '*'.
     * @return {Object} Result of the query.
     */
    return await this.client.queryTable(table_name, select_query);
  }
}

export { SupabaseService };
