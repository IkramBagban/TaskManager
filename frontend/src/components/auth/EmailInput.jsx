import React, { useState } from 'react'
import Input from '../Input'
import { postData } from '../../utils/api'

const EmailInput = ({onSubmit}) => {
    const [email, setEmail] = useState('')

    const inputChangeHandler = (e) =>{
        setEmail(e.target.value)
    }

    const submitHandler = async () => {

      if (!email) {
          alert("field is mandory");
          return;
      }
      
      const response = await postData('/users/request-otp', {email});
      console.log('otp response', response)
  
      onSubmit();
    };
    

  return (
    <div >
    <Input
      label="Email"
      name='email'
      placeHolder="Enter Your Email"
      value={email}
      onInputChange={inputChangeHandler}
    />
    <button style={{display:'inline-block'}} onClick={submitHandler}>Send OTP</button>
  </div>
  )
}

export default EmailInput