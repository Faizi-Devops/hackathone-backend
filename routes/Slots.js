const express= require ("express")
const router = express.Router();
const {createSlot,readSlots,deleteSlot,getslotbyid,updateSlot} = require("../controllers/Slots");


router.post('/create',createSlot);
router.get('/read',readSlots);
router.delete('/delete/:id',deleteSlot);
router.get('/get/:id',getslotbyid);
router.put('/update/:id',updateSlot);


module.exports = router;