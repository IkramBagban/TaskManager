const fs = require("fs");
const path = require("path");

const tasksDBPath = path.resolve(__dirname, "..", "database", "tasks.json");

const getTasksFromDB = (cb) => {
  fs.readFile(tasksDBPath, "utf-8", (err, data) => {
    if (err) {
      const error = new Error(err);
      console.error("got some error while fetching Data From the DB", error);
      cb([]);
      return;
    }

    data = JSON.parse(data);
    cb(data);
  });
};

class Tasks {
  constructor(id, title, description, dueDate, priority, status) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  save(res) {
    getTasksFromDB((tasks) => {
      // update task.
      if (this._id) {
        const taskIndex = tasks.findIndex(
          (t) => t._id.toString() === this._id.toString()
        );

        if (taskIndex === -1) {
          res.status(404).json({ message: "Task Not Found." });
          return;
        }

        tasks[taskIndex] = this;

        fs.writeFile(tasksDBPath, JSON.stringify(tasks), (err) => {
          if (err) {
            res.status(500).json({ message: "Error While Updating Task" });
            return;
          }

          res
            .status(200)
            .json({ message: "Task Updated Successfully.", data: this });
        });
        return;
      }

      // create new task.
      tasks.push(this);
      this._id = tasks.length + 1;

      fs.writeFile(tasksDBPath, JSON.stringify(tasks), (err) => {
        if (err) {
          const error = new Error("got an error while updating the file.", err);
          res.status(500).json({ message: "Error Updatin Task" });
          throw error;
        }

        res
          .status(201)
          .send({ message: "Task Added Successfully", data: this });
      });
    });
  }

  static getTasks = (cb) => {
    getTasksFromDB((tasks) => {
      cb(tasks);
    });
  };
}

module.exports = Tasks;
