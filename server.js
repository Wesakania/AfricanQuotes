console.log("Welcome to CRUDE")
const bodyParser = require("body-parser")
const express = require("express")
const app = express()


const MongoClient =require("mongodb").MongoClient
const connectionString = "mongodb+srv://Davis:kY9H6BksrLFz2Uy8@cluster0.zl3qhn5.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(connectionString,(err,client)=>{
  if(err) return console.error(err)
  console.log("Connected to Database")
  const db = client.db("star-wars-quotes")
  const quotesCollection = db.collection("quotes")

  app.set("view engine","ejs")
  app.use(bodyParser.urlencoded({extended:true})) 
  app.use(express.static("public"))
  app.use(bodyParser.json())
  app.get("/",(req,res) =>{
    quotesCollection.find().toArray()
     .then(results =>{
      console.log(results)
      res.render("index.ejs", {quotes:results})
     })
     .catch(error =>console.error(error))
    
  })

  app.post("/quotes",(req,res) =>{
    quotesCollection.insertOne(req.body)
    .then(result =>{
      console.log(result)
      res.redirect("/")
    })
    .catch(error =>console.error(error))
  })
 app.put("/quotes",(req,res) =>{
  quotesCollection.findOneAndUpdate(
    {name:"Ethiopia"},
    {
      $set:{
        name: req.body.name,
        quote: req.body.quote
      }
    },

    {
      upsert:true
    }
  )
  .then(result =>{
      console.log(result)
      res.json("success")
  })
  .catch(error =>console.error(error))
 })

 app.delete("/quotes",(req,res) =>{
  quotesCollection.deleteOne(
    {name:req.body.name}
  )
  .then(result =>{
    if (result.deletedCount === 0) {
      return res.json('No quote to delete')
    }
    res.json("Deleted African Quote")
  })
  .catch(error =>console.error(error))
 })
  

  app.listen(3000, function(){
    console.log("The Crude Listening on 3000")
  })
})





