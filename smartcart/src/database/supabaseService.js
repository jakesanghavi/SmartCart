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

    let data = "";
    await this.client.client
      .from("deals_track")
      .select("*")
      .limit(10) //top 10 deals
      .then((response) => {
        data = response;
      });

    return data.data;
    // get all deals
    // join with item prices
  //   return [
  //     {
  //       id: 1,
  //       item_name: "Apple",
  //       item_price: 0.99,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.1,
  //       cheaper_than: "1 week ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/1130px-Red_Apple.jpg",
  //     },
  //     {
  //       id: 2,
  //       item_name: "Banana",
  //       item_price: 0.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.2,
  //       cheaper_than: "2 weeks ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg",
  //     },
  //     {
  //       id: 3,
  //       item_name: "Orange",
  //       item_price: 0.79,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.15,
  //       cheaper_than: "1 week ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/1024px-Orange-Whole-%26-Split.jpg",
  //     },
  //     {
  //       id: 4,
  //       item_name: "Grapes",
  //       item_price: 1.99,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.3,
  //       cheaper_than: "3 weeks ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/1024px-Table_grapes_on_white.jpg",
  //     },
  //     {
  //       id: 5,
  //       item_name: "Pineapple",
  //       item_price: 1.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.25,
  //       cheaper_than: "2 weeks ago",
  //       image_url:
  //         "https://www.kroger.com/product/images/large/front/0000000004430",
  //     },
  //     {
  //       id: 6,
  //       item_name: "Strawberry",
  //       item_price: 2.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.35,
  //       cheaper_than: "4 weeks ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/1024px-PerfectStrawberry.jpg",
  //     },
  //     {
  //       id: 7,
  //       item_name: "Blueberry",
  //       item_price: 3.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.4,
  //       cheaper_than: "4 days ago",
  //       image_url:
  //         "https://img.imageboss.me/fourwinds/width/425/dpr:2/shop/products/shutterstock_722035450blueberry2_78174de9-8c15-4dae-8612-0e2874138d9e.jpg?v=1588987406",
  //     },
  //     {
  //       id: 8,
  //       item_name: "Raspberry",
  //       item_price: 4.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.45,
  //       cheaper_than: "1 weeks ago",
  //       image_url:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Raspberries_%28Rubus_idaeus%29.jpg/1200px-Raspberries_%28Rubus_idaeus%29.jpg",
  //     },
  //     {
  //       id: 9,
  //       item_name: "Blackberry",
  //       item_price: 5.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.5,
  //       cheaper_than: "3 days ago",
  //       image_url:
  //         "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/69fa32f9-f2ca-4005-bd3a-40e98aca45f7-c1ec280.jpg?quality=90&resize=940,627",
  //     },
  //     {
  //       id: 10,
  //       item_name: "Watermelon",
  //       item_price: 6.49,
  //       item_quantity: 1,
  //       percent_price_decrease: 0.55,
  //       cheaper_than: "1 week ago",
  //       image_url:
  //         "https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
  //     },
  //   ];
  // }
  }
}
// Initialize an instance of the class and export that
// This prevents recreating a SuperbaseService with each
// component re-render.
const supabaseService = new SupabaseService();

export { supabaseService };
