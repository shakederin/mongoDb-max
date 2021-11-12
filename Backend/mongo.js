const path = require("path");
const csv = require("csvtojson");
const  mongoose  = require("mongoose");
const Agent = require("./models/AgentModel");
require("dotenv").config();

const connectionString = process.env.CONNECTIONSTRING;

mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});

const csvFilePath = path.resolve("./dataXL.csv");

csv().fromFile(csvFilePath)
.then((agentJsonData)=>{
    const DataToSend = agentJsonData.map((agent)=>{
            const licenseNumber = Object.values(agent)[0].trim();
            const fullName = Object.values(agent)[1].trim();
            const city = Object.values(agent)[2].trim();
            if(!licenseNumber || !fullName || !city){
                console.log("one of the fields is empty");
                return
            }
        return{
            licenseNumber,
            fullName,
            city
        }
    })
    Agent.insertMany(DataToSend)
    .then(()=>{
        console.log("add");
    }).catch((err)=>{
        console.log(err);
    }
    )
})


