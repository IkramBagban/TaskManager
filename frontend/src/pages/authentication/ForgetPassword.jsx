import React, { useState } from "react";
import Input from "../../components/Input";
import InputWithButton from "../../components/InputWithButton";
import EmailInput from "../../components/auth/EmailInput";
import ResetPassword from "../../components/auth/ResetPassword";
import VerifyOTP from "../../components/auth/VerifyOTP";

const ForgetPassword = ({ buttonLabel, label, name, placeHolder }) => {
  // const [state,setState] = useState({
  //   email : "",
  //   otp: "",
  //   password:""

  // });

  // const {email, otp, password} = state;

  // const [dynamic, setDynamic] = useState({
  //   sendOTP: true,
  //   varifyOTP: false,
  //   forgetPassword: false,
  // });

  const [step, setStep] = useState("emailInput");

  // const inputChangeHandler = (e) => {
  //   // setEmail(e.target.value);
  //   setState(prev => ({...prev, [e.target.name] : e.target.value}))
  //   console.log([e.target.name] + '==>' + e.target.value)
  // };

  // const sendOTPHandler = () => {
  //   setDynamic({
  //     sendOTP: false,
  //     varifyOTP: true,
  //     forgetPassword: false,
  //   })
  // };
  // const varifyOTPHandler = () => {
  //   setDynamic({
  //     sendOTP: false,
  //     varifyOTP: false,
  //     forgetPassword: true,
  //   })
  // };

  // if(dynamic.sendOTP){
  //   return (
  //     <InputWithButton
  //     label={"Email"}
  //     name={"email"}
  //     placeHolder={"Enter Email"}
  //     value={email}
  //     onInputChange={inputChangeHandler}
  //     buttonLabel={"Send OTP"}
  //     onClick={sendOTPHandler}
  //   />
  //   )
  // }

  // else if(dynamic.varifyOTP){
  //   return (
  //     <InputWithButton
  //     label={"Varify OTP"}
  //     name={"otp"}
  //     placeHolder={"Enter Your OTP Here"}
  //     value={otp}
  //     onInputChange={inputChangeHandler}
  //     buttonLabel={"Send OTP"}
  //     onClick={sendOTPHandler}
  //   />
  //   )
  // }

  const emailSubmit = () =>{
    setStep('verifyOTP');
  }
  const verifyOTPSubmit = () =>{
    setStep('resetPassword');
  }
  const resetPasswordSubmit = () =>{
    setStep('resetPassword');
  }

  return (
    <div>
      {step === "emailInput" && <EmailInput onSubmit={emailSubmit}/>}
      {step === "verifyOTP" && <VerifyOTP onSubmit={verifyOTPSubmit}/>}
      {step === "resetPassword" && <ResetPassword onSubmit={resetPasswordSubmit}/>}
    </div>
  );
};

export default ForgetPassword;
