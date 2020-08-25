import { MongoClient } from "https://deno.land/x/mongo@v0.9.2/mod.ts";

const CONFIG = JSON.parse(Deno.readTextFileSync("./config.json"));

interface PostSchema {
  _id: { $oid: string };
  author: string;
  message: string;
  date: string;
}

const client = new MongoClient();
client.connectWithUri(CONFIG.MONGO_DB.MONGO_DB_URL);

const db = client.database(CONFIG.MONGO_DB.DATABASE_NAME);
const collection = db.collection<PostSchema>(CONFIG.MONGO_DB.COLLECTION_NAME);

console.log("DB Connected.");

export const get_all_posts = async () => {
  const all_posts = await collection.find({});
  return JSON.stringify(all_posts);
};

export const insert_new_post = async (post_data: object) => {
  let results = await collection.insertOne(post_data);
};
