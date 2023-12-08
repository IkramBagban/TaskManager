import { createContext, useState } from "react";

export const TaskContext = createContext({
  tasks: [],
  setTasksToStore: (tasks) => {},
  addTask : task =>{},
  updateTask : (updatedTask) => {},
});

export const TaskProvider = ({children}) =>{
    const [tasks, setTasks] = useState();

    const addTask = (task) => {
        console.log('task has been added to store.',task)
        setTasks(prev => [...prev, task])
    }

    const updateTask = (updatedTask)=>{
        console.log('udpated task', updatedTask)
        const {_id} = updatedTask;
        const taskIndex = tasks.findIndex(t => t._id    === _id)
        
        if(taskIndex === -1) {
            alert('task not found.')
            return;
        }

        tasks[taskIndex] = updatedTask;
        setTasks([...tasks])
    }

    const value = {
        tasks : tasks ,
        setTasksToStore:setTasks,
        addTask : addTask,
        updateTask: updateTask
    }

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    )
}


