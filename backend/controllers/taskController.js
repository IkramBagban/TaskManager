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
  task.save(res, task);
};

exports.updateTask = (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;

  const task = new Tasks(id, title, description, dueDate, priority, status);
  task.save(res);
};
