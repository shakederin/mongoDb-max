const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
    licenseNumber : {
        type : Number,
        required : true,
        unique : true
    },
    fullName: {
        type: String,
        required: true
    },
      city: {
        type: String,
        required: true
    }
})

const Agent = mongoose.model("Agent", AgentSchema);

module.exports = Agent;