const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
    licenseNumber : {
        type : Number,
        required : true,
        unique : true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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