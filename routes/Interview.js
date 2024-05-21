const express= require ("express")
const router = express.Router();
const {addInter,getInter,delInter,getinterbyid,updateInter} = require("../controllers/Interview");


router.post('/create',addInter);
router.get('/read',getInter);
router.delete('/delete/:id',delInter);
router.get('/get/:id',getinterbyid);
router.put('/update/:id',updateInter);


module.exports = router;