import React, { useEffect, useState } from 'react'
import { getUsers } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')
  useEffect(()=>{
    getUsers().then(data => {
      const existingUser = data.find(user=> user.id.toString() === token)
      setUser(existingUser)
      // console.log(`$user id ${token}{}`)
      // console.log('data', existingUser)
    }).catch(err => console.error(err))
    console.log('user', user)
  },[])

  const editClickHandler = () =>{
    navigate(`/profile/${token}`, {state:{user}})
  }
  return (
    <div>
      <h3>{user?.username}</h3>
      <p>{user?.email}</p>
      <p>{user?.phoneNumber}</p>
      <button onClick={editClickHandler}>edit</button>
    </div>
  )
}

export default Profile