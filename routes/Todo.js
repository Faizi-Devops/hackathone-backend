const express= require ("express")
const router = express.Router();
const {randomnumbergenerate} = require("../controllers/Todo");


router.get('/random',randomnumbergenerate);

module.exports = router;