import React from 'react'
import { useParams } from 'react-router-dom'


const TaskDetail = () => {

  
  console.log("details")
  const params = useParams();
  console.log(params)
  return (
    <div>TaskDetail : {params.taskId}</div>
  )
}

export default TaskDetail