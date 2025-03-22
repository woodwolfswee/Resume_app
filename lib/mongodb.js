import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function saveSkillsToDB(email, skills) {
  await client.connect();
  const db = client.db("job_recommendation");
  const collection = db.collection("users");

  await collection.updateOne(
    { email },
    { $set: { skills } },
    { upsert: true }
  );

  await client.close();
}
