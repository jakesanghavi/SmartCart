import { SupabaseClient } from "./supabaseClient.js"; // Assuming the file path to your SupabaseClient class
import levenshtein from "js-levenshtein"; // Assuming the file path to your string-cosine-similarity module

class SupabaseService {
  constructor() {
    this.client = new SupabaseClient();
  }

  async getItemsForSearchTerm(searchTerm) {
    /**
     * Get items that match the search term.
     *
     * @param {string} searchTerm - The search term.
     * @return {Object} Result of the query.
     */
    const items = await this.client.queryTableIlike(
      "generic_items",
      "name",
      `%${searchTerm}%`
    );
    // calculate score for each item
    items.forEach((item) => {
      // Value 0 to 1 based on similarity of letters
      const similarity =
        1 - levenshtein(item.name, searchTerm) / item.name.length;

      // Value 0 or 1 based on whether the item name starts with the search term
      const containsStart = item.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(searchTerm.toLowerCase()))
        ? 1
        : 0;

      item.score = similarity + containsStart * 0.2;
    });

    // sort items by score
    items.sort((a, b) => b.score - a.score);

    // remove score from items
    items.forEach((item) => delete item.score);

    return items;
  }

  // Get all stores names and IDs from the database
  async getStoreNames() {
    let data = "";
    await this.client.client
      .from("stores")
      .select("*")
      .then((response) => {
        data = response;
      });

    return data.data;
  }

  // Get all items offered by a given store (by ID)
  async storeItems(id) {
    let data = "";
    await this.client.client
      .from("item_prices")
      .select("*")
      .eq("store_id", id)
      .select("items(id, name), *")
      .then((response) => {
        data = response;
      });

    return data.data;
  }

  async getDeals() {
    // get all deals
    // join with item prices
    return [
      {
        id: 1,
        item_name: "Apple",
        item_price: 0.99,
        item_quantity: 1,
        percent_price_decrease: 0.1,
        cheaper_than: "1 week ago",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/1130px-Red_Apple.jpg",
      },
      {
        id: 2,
        item_name: "Banana",
        item_price: 0.49,
        item_quantity: 1,
        percent_price_decrease: 0.2,
        cheaper_than: "1 week ago",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg",
      },
      {
        id: 3,
        item_name: "Orange",
        item_price: 0.79,
        item_quantity: 1,
        percent_price_decrease: 0.15,
        cheaper_than: "1 week ago",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/1024px-Orange-Whole-%26-Split.jpg",
      },
    ];
  }
}

// Initialize an instance of the class and export that
// This prevents recreating a SuperbaseService with each
// component re-render.
const supabaseService = new SupabaseService();

export { supabaseService };
