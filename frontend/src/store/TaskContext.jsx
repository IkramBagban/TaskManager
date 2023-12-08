import { createContext, useState } from "react";

export const TaskContext = createContext({
  tasks: [],
  setTasksToStore: (tasks) => {},
  addTask : task =>{},
  updateTask : updatedTask => {},
});

export const TaskProvider = ({children}) =>{
    const [tasks, setTasks] = useState();

    const addTask = (task) => {
        console.log('task has been added to store.')
        setTasks(prev => ([...prev, task]))
    }

    const value = {
        tasks : tasks ,
        setTasksToStore:setTasks,
        addTask : addTask
    }

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    )
}


