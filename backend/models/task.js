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
    // console.log(data);
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

  static getTasks = (cb) =>{
    getTasksFromDB(tasks =>{
        console.log(tasks);
        cb(tasks)
    })
  }
}


module.exports = Tasks;