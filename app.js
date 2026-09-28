const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.listen(8080,()=>{
    console.log("server is running on port 8080");
});
app.get('/',(req,res)=>{
    res.send("hello world");
});
app.get("/testlisting",async (req,res)=>{
    let sampleListing=new Listing({
        title:"Sample Listing",
        description:"This is a sample listing for testing purposes.",
        price:100,
        location:"Sample Location",
        country:"Sample Country"
    });
    sampleListing.save();
    res.send("Test listing created");
});