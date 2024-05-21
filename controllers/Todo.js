const Todo = require("../models/Todo");





const randomnumbergenerate = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const response = {
    random_number: randomNumber,
  };
  res.send({
    message: response,
  });
};

module.exports = {  randomnumbergenerate };
