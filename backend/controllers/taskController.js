const Tasks = require("../models/task");

exports.getTasks = (req, res, next) => {
  // res.send('hello')
  Tasks.getTasks((tasks) => {
    res.json(tasks);
  });
};

exports.postTask = (req, res, next) => {
  const { title, description, dueDate, priority, status } = req.body;

  const task = new Tasks(null, title, description, dueDate, priority, status);
  task.save();
  res.status(201).send({message: "Task Added Successfully"})
};
