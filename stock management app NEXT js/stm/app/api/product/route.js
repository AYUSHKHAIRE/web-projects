import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
// export async function GET(request) {
    // // Replace the uri string with your connection string.
    // const uri = "mongodb+srv://ayu:EtWgi1sSsSS2owap@mongolearn.haftbf7.mongodb.net/";
    
    // const client = new MongoClient(uri);
    //     try {
    //         const database = client.db('stock');
    //         const good = database.collection('goods');
            
    //         // Query for a movie that has the title 'Back to the Future'
    //         const query = {};
    //         const allproducts = await good.find(query).toArray();  
    //         console.log("featched products",allproducts);
    //         return NextResponse.json({allproducts});
    //   } finally {
    //     // Ensures that the client will close when you finish/error
    //     await client.close();
    //   }

// }

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://ayu:EtWgi1sSsSS2owap@mongolearn.haftbf7.mongodb.net/";
//
  const client = new MongoClient(uri);
  try {
    const database = client.db("stock");
    const goodsCollection = database.collection("goods");

    // Query for all products
    const query = {};
    const allProducts = await goodsCollection.find(query).toArray();

    // Log the fetched products in the server's terminal
    console.log("Fetched products:", allProducts);

    // Return the products as a JSON response to the client
    return NextResponse.json({ allproducts: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    // Return an error response if something goes wrong
    return NextResponse.error("Failed to fetch products", { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function POST(request) {
    // Replace the uri string with your connection string.
    let body = await request.json()
    const uri = "mongodb+srv://ayu:EtWgi1sSsSS2owap@mongolearn.haftbf7.mongodb.net/";
    
    const client = new MongoClient(uri);
        try {
            const database = client.db('stock');
            const good = database.collection('goods');
            
            // Query for a movie that has the title 'Back to the Future'
            const query = {};
            const product = await good.insertOne(body);  
            console.log(product,"Added successfully");
            return NextResponse.json({product,ok:true});
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}



