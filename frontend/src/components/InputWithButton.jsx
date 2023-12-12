import React, { useState } from 'react'
import Input from './Input';

const InputWithButton = ({onClick,buttonLabel,value, label, name, placeHolder, setInputValue,onInputChange}) => {

    // const inputChangeHandler = (e) =>{
    //     setInputValue(e.target.value)
    // }

  return (
    <div >
      <Input
        label={label}
        name={name}
        placeHolder={placeHolder}
        value={value}
        onInputChange={onInputChange}
      />
      <button style={{display:'inline-block'}} onClick={onClick}>{buttonLabel}</button>
    </div>
  );
};

export default InputWithButton
