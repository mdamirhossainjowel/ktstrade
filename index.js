const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello There");
});
app.listen(port, () => {
  console.log(port);
});

const uri =
  "mongodb+srv://dbAlaeze:Alaeze@cluster0.lhcdr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("ktsofficial");
    const Products = database.collection("products");

    app.post("/product", async (req, res) => {
      const newProduct = req.body;

      const result = await Products.insertOne(newProduct);
      res.send(result);
    });
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = Products.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await Products.findOne(query);
      res.send(product);
    });
    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      const newdata = req.body;
      const query = { _id: ObjectId(id) };
      const product = await Products.findOneAndUpdate([
        { _query },
        { $set: { quantity: newdata } },
      ]);

      res.send(product);
    });
  } finally {
  }
}
run().catch(console.dir);
