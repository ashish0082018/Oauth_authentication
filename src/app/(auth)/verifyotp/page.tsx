"use client";
import React, { useActionState} from "react";
import { verifyOtp } from "@/app/actions/verifycode";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";
// import * as React from "react"
 

const Page = () => {
const {pending}=useFormStatus()
  const [formData,action]=useActionState(verifyOtp,{message:""})
if(formData.success){
  redirect("/signin")
}
  return (
<div className="h-screen w-full flex justify-center items-center flex-col gap-8 p-4 sm:p-8">

      <div className="w-full sm:w-1/3 min-h-1/2 bg-zinc-800 shadow-2xl flex flex-col px-6 py-5 sm:px-8 sm:py-6">
      <div>
      <form action ={action} className="flex flex-col">
      <label className="p-2 text-3xl font-semibold text-center flex flex-col"> OTP Verification 
        <span className="text-sm font-normal tracking-tighter mb-5 ">Enter OTP Code sent to you email</span>
      </label>
      
      <div className="space-y-2 flex flex-col justify-center items-center">
      {/* <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div> */}
      <input name="otp"  type="text" className="text-black" />
    </div>
      <button disabled={pending} className="bg-blue-700 px-3 py-1 mt-6 hover:bg-blue-800"> {pending? "verifying":" Verify"}   </button>
      {formData.message &&  <span className="text-red-500">{formData.message} </span> }
      </form>
     

     
    </div>
       
     
      </div>


    </div>
    
  );
};

export default Page;
