const Tasks = require("../models/task");

exports.getTasks = (req, res, next) => {
    // res.send('hello')
  Tasks.getTasks((tasks) => {
    res.json(tasks);
  });
};
