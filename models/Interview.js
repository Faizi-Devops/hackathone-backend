const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
    slo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Slots"
    },
    candiname: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled'],
        default: 'scheduled'
    }
    
});



const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = Interview;
