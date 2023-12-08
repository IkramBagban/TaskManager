import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name : 'task',  
    initialState : {
        tasks : []
    },
    reducers : {
        addTasksToStore : (state, action) =>{
            state.tasks = action.payload;
        },
        addTask : (state, action) =>{
            state.tasks.push(action.payload?.task)
        }
    }

})


export const {addTasksToStore, addTask} = taskSlice.actions;
export default taskSlice.reducer