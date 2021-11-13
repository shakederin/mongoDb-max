const express = require("express");
const cors = require("cors");
const Agent = require("./models/AgentModel");
const  Mongoose  = require("mongoose");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 8080;

const connectionString = process.env.CONNECTIONSTRING;

Mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});


app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})

app.use(express.json());

app.use(cors());

app.get("/cities", (req ,res)=>{
    Agent.find({}).distinct("city").then((cities)=>{
        res.json(cities);
    }).catch(()=>{
        console.log("in catch");
        res.send("wrong");
    }
    )
})

app.get("/agents", (req,res)=>{
    const _city = req.query.city;
    Agent.find({city: _city}).then((names)=>{
        if(names.length === 0){
            res.status(403).send("write city name correctly")
            return
        };
    const ArrayToSend = [];    
        for(let info of names){
            const objToSend = {};
            objToSend.fullName = info.fullName;
            objToSend.licenseNumber = info.licenseNumber;
            ArrayToSend.push(objToSend)
        }
        res.send(ArrayToSend);
    }).catch((err)=>{
        console.log(err);
        res.send("wrong");
    }
    )
})

app.put("/agent/:id/edit", async (req,res)=>{
    const id = req.params.id;
    const newCity = req.body.city
    const result = await Agent.updateOne(
        {licenseNumber : +id},
        {$set: { city: newCity}}
        )
    res.send({id, newCity});
})