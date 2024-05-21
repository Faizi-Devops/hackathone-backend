const Inter = require("../models/Interview");
const mongoose = require('mongoose');
const slots = require("../models/Slots")

const addInter = async (req, res) => {
    console.log("Hello")
    try {
        // Destructure the request body to get necessary fields
        const { schedule, candiname, status } = req.body;
        console.log("status", schedule, candiname, status)

        // Validate that schedule is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(schedule)) {
            return res.status(400).json({ msg: 'Invalid slots ID' });
        }

        // Check if the slot exists
        const slot = await slots.findById(schedule);
        if (!slot) {
            return res.status(404).json({ msg: 'Slot not found' });
        }

        // Create a new interview instance
        const newInterview = new Inter({
            slo: schedule, // Correct this to 'slot' or 'schedule' depending on your model
            candiname,
            status
        });

        // Save the interview instance
        await newInterview.save(); // Save the instance, not the model
        console.log("save")

        // Return success response
        res.status(201).json({ msg: 'Interview added successfully', interview: newInterview });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
const getInter = async(req,res) =>{
    try {
        const interviews = await Inter.find().populate("slo");
        res.status(200).json(interviews);
    } catch (error) {
        console.error("Error fetching interviews:", error);
        res.status(500).json({ error: 'Failed to fetch interviews', details: error.message });
    }

}
const delInter = async(req,res) =>{
    const { id } = req.params;

    try {
        const deletedInterview = await Inter.findByIdAndDelete(id);

        if (!deletedInterview) {
            return res.status(404).json({ error: 'Interview not found' });
        }

        res.status(200).json({ message: 'Interview deleted successfully', deletedInterview });
    } catch (error) {
        console.error("Error deleting interview:", error);
        res.status(500).json({ error: 'Failed to delete interview', details: error.message });
    }

}
const getinterbyid = async(req,res) =>{
    const { id } = req.params;
    try {
        const interview = await Inter.findById(id);
        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }
        res.status(200).json(interview);
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        res.status(500).json({ error: 'Failed to fetch interview by ID', details: error.message });
    }

}

    const updateInter = async (req, res) => {
        console.log("Hello");
        try {
            // Destructure the request body to get necessary fields
            const { schedule, candiname, status } = req.body;
            const { id } = req.params; // Get the interview ID from the URL parameters
            console.log("status", schedule, candiname, status);
    
            // Validate that schedule is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(schedule)) {
                return res.status(400).json({ msg: 'Invalid slots ID' });
            }
    
            // Check if the slot exists
            const slot = await slots.findById(schedule);
            if (!slot) {
                return res.status(404).json({ msg: 'Slot not found' });
            }
    
            // Check if the interview exists
            const interview = await Inter.findById(id);
            if (!interview) {
                return res.status(404).json({ msg: 'Interview not found' });
            }
    
            // Update the interview fields
            interview.slo = schedule; // Correct this to 'slot' or 'schedule' depending on your model
            interview.candiname = candiname;
            interview.status = status;
    
            // Save the updated interview instance
            await interview.save(); // Save the instance, not the model
            console.log("save");
    
            // Return success response
            res.status(200).json({ msg: 'Interview updated successfully', interview });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    };
 
    


module.exports = {
    addInter,
    getInter,
    delInter,
    getinterbyid,
    updateInter
   
};
