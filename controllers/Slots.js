const Slots = require("../models/Slots");
const Interviews = require("../models/Interview");

const createSlot = async (req, res) => {
    const { date, startTime, endTime, interviewer } = req.body;
    console.log(date, startTime, endTime, interviewer);

    // Check if required fields are present
    if (!date || !startTime || !endTime || !interviewer) {
        return res.status(400).json({ error: 'All fields are required (date, startTime, endTime, interviewer)' });
    }

    try {
        // Check if there's already a slot that overlaps with the new slot
        // const existingSlot = await Slots.findOne({
            
        //     $or: [
        //         { startTime: { $lt: endTime, $gte: startTime } },
        //         { endTime: { $gt: startTime, $lte: endTime } }
        //     ]
        // });

        // if (existingSlot) {
        //     return res.status(400).json({ error: 'Slot overlap error', message: 'There is already a slot added for this time' });
        // }

        // Create a new slot instance
        const newSlot = new Slots({
            date,
            startTime,
            endTime,
            interviewer
        });

        // Save the slot to the database
        const savedSlot = await newSlot.save();

        // Respond with the saved slot
        res.status(201).json({
            date:savedSlot,
            meesage:"Slot Added Successfully"
        });
    } catch (error) {
        console.error("Error saving interview slot:", error);
        res.status(500).json({ error: 'Failed to save interview slot', details: error.message });
    }
};
const readSlots = async(req,res) =>{
    try {
        const interviews = await Slots.find();
        res.status(200).json(interviews);
    } catch (error) {
        console.error("Error fetching interviews:", error);
        res.status(500).json({ error: 'Failed to fetch interviews', details: error.message });
    }
}
const deleteSlot = async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the interview slot by ID
        const interviewSlot = await Slots.findByIdAndDelete(id);

        if (!interviewSlot) {
            return res.status(404).json({ error: 'Interview slot not found' });
        }

        // Delete all interviews associated with this slot
        const deletedInterviews = await Interviews.deleteMany({ "slo._id": id });

        // If deletion is successful, send a success message
        res.status(200).json({
            message: 'Slot and associated interviews deleted successfully',
            deletedSlot: interviewSlot, // Optionally, you can send the deleted slot back
            deletedInterviews: deletedInterviews // Optionally, send back info about deleted interviews
        });
    } catch (error) {
        console.error("Error deleting interview slot and associated interviews:", error);
        res.status(500).json({ error: 'Failed to delete interview slot and associated interviews', details: error.message });
    }
};


const getslotbyid = async(req,res) =>{
    const { id } = req.params;
    console.log(id)
    try {
        const interview = await Slots.findById(id);
        if (!interview) {
            return res.status(404).json({ error: 'Interview slot not found' });
        }
        res.status(200).json(interview);
    } catch (error) {
        console.error("Error fetching interview by ID:", error);
        res.status(500).json({ error: 'Failed to fetch interview by ID', details: error.message });
    }

}
const updateSlot = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const { date, startTime, endTime, interviewer } = req.body;
    console.log(date, startTime, endTime, interviewer);

    try {
        // Check if required fields are present
        if (!date || !startTime || !endTime || !interviewer) {
            return res.status(400).json({ error: 'All fields are required (date, startTime, endTime, interviewer)' });
        }

        // Simulate update in a database (replace this with actual database update)
        // const updatedSlot = await Slots.findByIdAndUpdate(
        //     id,
        //     { date, startTime, endTime, interviewer },
        //     { new: true, runValidators: true }
        // );

        // Simulated updated slot object
        const updatedSlot = {
            _id: id,
            date,
            startTime,
            endTime,
            interviewer
        };

        // Check if slot was updated
        if (!updatedSlot) {
            return res.status(404).json({ error: 'Slot not found' });
        }

        // Return updated slot
        res.status(200).json(
            updatedSlot);
    } catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ error: 'Failed to update slot', details: error.message });
    }
};




module.exports = {
    createSlot,
    readSlots,
    deleteSlot,
    getslotbyid,
    updateSlot
};
