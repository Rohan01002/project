const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');

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
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send("hello world");
});
// index route
app.get('/listings',async (req,res)=>{
    const alllistings=await Listing.find({});
    res.render('listings/index.ejs',{alllistings});
})
//show route
app.get('/listings/:id',async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render('listings/show.ejs',{listing});
});
//new route
app.get('/listings/new',(req,res)=>{
    res.render('listings/new.ejs');
})
// app.get("/testlisting",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"Sample Listing",
//         description:"This is a sample listing for testing purposes.",
//         price:100,
//         location:"Sample Location",
//         country:"Sample Country"
//     });
//     sampleListing.save();
//     res.send("Test listing created");
// });