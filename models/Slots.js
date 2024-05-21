const mongoose = require("mongoose");

const Slots = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    interviewer: {
        type: String,
        required: true
    }

});


const SlotsModel = mongoose.model("Slots", Slots);
module.exports = SlotsModel;
