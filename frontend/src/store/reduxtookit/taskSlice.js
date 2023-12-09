import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTasksToStore: (state, action) => {
    if(action.payload) state.tasks = action.payload.reverse();
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const { _id } = action.payload;
      const taskIndex = state.tasks.findIndex((t) => t._id === _id);

      if (taskIndex === -1) {
        alert("task not found.");
        return;
      }

      state.tasks[taskIndex] = action.payload;
    },

    emptyTasks : (state)=>{
        state.tasks = []
    }
  },
});

export const { addTasksToStore, addTask, updateTask,emptyTasks } = taskSlice.actions;
export default taskSlice.reducer;
