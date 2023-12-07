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
      if (this._id) {
        console.log("edit mode.");
        return;
      }
      tasks.push(this);
      this._id = tasks.length + 1;
      fs.writeFile(tasksDBPath, JSON.stringify(tasks), (err) => {
        if (err) {
          const error = new Error("got an error while updating the file.", err);
          console.error(error);
          throw error;
        }
        res.status(201).send({ message: "Task Added Successfully", data: this });
        console.log("Task Has Been Added.");
      });
    });
  }

  static getTasks = (cb) => {
    getTasksFromDB((tasks) => {
      console.log(tasks);
      cb(tasks);
    });
  };
}

module.exports = Tasks;
