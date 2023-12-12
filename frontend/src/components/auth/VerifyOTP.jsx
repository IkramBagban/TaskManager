import React, { useEffect, useState } from 'react'
import Input from '../Input'

const VerifyOTP = ({onSubmit}) => {
    const [otpInput, setOTPInput] = useState('')
    const [otp, setOTP] = useState('')

    useEffect(()=>{
        const o = Math.floor(Math.random() * 9999);
        setOTP(o)
    },[])
    
    const inputChangeHandler = (e) =>{
        setOTPInput(e.target.value)
    }

    
    const submitHandler = () => {

        if (!otpInput) {
            alert("field is mandory");
            return;
        }
    
        if(otp.toString() !== otpInput.toString()){
            alert("OTP Doesn't Match")
            return;
        }
    
        onSubmit();
      };


  return (
    <div >
        <div>
            <p>{otp}</p>
            <h1>Verify OTP</h1>
        </div>
    <Input
      label="Enter OTP"
      name='otp'
      placeHolder="Enter OTP"
      value={otpInput}
      onInputChange={inputChangeHandler}
    />
    <button style={{display:'inline-block'}} onClick={submitHandler}>Verify OTP</button>
  </div>
  )
}

export default VerifyOTP