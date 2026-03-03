const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION_STRING = "mongodb://localhost:27017/";
const DATABASENAME = "MyDB";
let database;

app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

async function start() {
  try {
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(DATABASENAME);
    console.log("Connected to MongoDB");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.post("/api/books/AddBook", multer().none(), async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const numOfDocs = await database.collection("Books").countDocuments();

    await database.collection("Books").insertOne({
      id: String(numOfDocs + 1),
      title: req.body.title,
      desc: req.body.description,
      price: Number(req.body.price) || 0,
      author: req.body.author?.trim() || "Unknown",
      genre: req.body.genre?.trim() || "General",
    });

    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    await database.collection("Books").deleteOne({ id: req.query.id });
    res.json("Deleted successfully!");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
});