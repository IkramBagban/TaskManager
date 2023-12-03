import React from 'react'

const Input = ({label,placeHolder,value,type,name, onInputChange}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label><br />
      <input type={type} value={value}  name={name} placeholder={placeHolder} id={name} onChange={onInputChange}/>
    </div>
  )
}

export default Input