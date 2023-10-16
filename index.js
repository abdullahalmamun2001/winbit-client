const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config()

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_Password}@cluster0.kbqlzif.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

// banking Collection

const bankCollection = client.db("winbit").collection("bankingCollection");
const trxCollection = client.db("winbit").collection("trx");









app.get('/bank',async(req,res)=>{
    const result=await bankCollection.find().toArray();
    res.send(result);
})

app.post('/trx',async(req,res)=>{
    const body=req.body;
    const result=await trxCollection.insertOne(body);
    res.send(result);
})


    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('winbit is running')
  })
  
  app.listen(port, () => {
    console.log(`winbit is running on port ${port}`);
  })