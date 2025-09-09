import { MongoClient } from "mongodb";

console.log("Hello!");

/**
 * See README.md for more information.
 */

const uri = "mongodb://localhost:27017/demo";

const client = new MongoClient(uri, {});

const main = async () => {
  await client.connect();

  const collection = client.db().collection("users");

  collection.insertMany([
    { name: "Alice", age: 25, gender: "female" },
    { name: "Bob", age: 17, gender: "male" },
    { name: "Charlie", age: 30, gender: "male" },
    { name: "David", age: 22, gender: "male" },
    { name: "Eve", age: 28, gender: "female" },
  ]);

  const pipeline = [
    {
      $match: {
        age: { $gte: 18 },
      },
    },
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ];

  const agg = await collection.aggregate(pipeline).toArray();

  console.log("Aggregation result:", agg);

  await client.close();
};

main().catch(console.error);
