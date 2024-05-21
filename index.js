const express = require("express");
const connectDB = require("./db/connectdb");
const dotenv = require("dotenv");
const cors = require("cors");
const userRegister = require("./routes/User");
const userSlots = require ("./routes/Slots");
const userinter = require("./routes/Interview");

const random = require("./routes/Todo");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", random);
app.use("/user",userRegister);
app.use("/slot",userSlots);
app.use("/inter",userinter);
const port = 4000;

// Make sure to define or retrieve your DATABASE_URL properly
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
