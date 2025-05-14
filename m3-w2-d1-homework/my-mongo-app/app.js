// app.js

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your URI if needed
const client = new MongoClient(uri);

const stats = [
  { city: 'San Juan', zip: '00926', state: 'PR', income: '34781', age: '44' },
  { city: 'Corona', zip: '11368', state: 'NY', income: '50797', age: '32' },
  { city: 'Chicago', zip: '60629', state: 'IL', income: '42019', age: '31' },
  { city: 'El Paso', zip: '79936', state: 'TX', income: '54692', age: '31' },
  { city: 'Los Angeles', zip: '90011', state: 'CA', income: '36954', age: '28' },
  { city: 'Norwalk', zip: '90650', state: 'CA', income: '66453', age: '35' }
];

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db('statsdb');
    console.log("Using database: statsdb");

    const collection = db.collection('uscensus');
    console.log("Using collection: uscensus");

    const result = await collection.insertMany(stats);
    console.log(`Inserted ${result.insertedCount} documents into 'uscensus' collection.`);
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.close();
    console.log("Connection to MongoDB closed.");
  }
}

run();