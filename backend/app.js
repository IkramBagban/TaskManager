const express = require("express");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');

const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

app.use("/users", userRoutes);
app.use('/tasks', taskRoutes);

app.use('/', (req, res) => {
  res.send(`
    <h1>Home</h1>
    <a href="/users"><button>users</button></a>
    <a href="/tasks"><button>tasks</button></a>
  `)
});

app.listen(PORT, () => {
  console.log(`Server Is Running At PORT ${PORT}`);
});
