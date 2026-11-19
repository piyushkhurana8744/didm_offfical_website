"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { enquiryAttribution } from "@/lib/admissions/attribution";

type Details={name:string;phone:string;email?:string;centreId?:string;courseId?:string;preferredBatch?:string;message?:string;organization?:string};

/** A form is successful only after the real lead API confirms persistence. */
export function useEnquirySubmission(){
  const [error,setError]=useState("");
  const [pending,setPending]=useState(false);
  const busy=useRef(false);
  const submit=async(event:FormEvent<HTMLFormElement>,details:Details,onSuccess:()=>void)=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(busy.current)return;
    const consent=form.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if(!consent?.checked){setError("Please agree to being contacted about your enquiry.");return;}
    if(!form.reportValidity())return;
    busy.current=true;setPending(true);setError("");
    const buttons=Array.from(form.querySelectorAll<HTMLButtonElement>('button[type="submit"]'));
    buttons.forEach(b=>b.disabled=true);
    try{
      const response=await fetch("/api/enquire",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...enquiryAttribution(window.location.href, "inline-enquiry"),...details,consent:true,sourceUrl:window.location.href})});
      const result=await response.json();
      if(!response.ok||result.success!==true){setError(result.message||"We could not save your enquiry. Please call +91 88005 05151.");return;}
      onSuccess();
    }catch{setError("We could not save your enquiry. Please try again or call +91 88005 05151.");}
    finally{busy.current=false;setPending(false);buttons.forEach(b=>b.disabled=false);}
  };
  return {error,pending,submit};
}

export function EnquiryFeedback({error,pending,consent=false}:{error:string;pending:boolean;consent?:boolean}){
  return <div className="enquiry-feedback">{consent&&<label className="enquiry-consent"><input type="checkbox" required/><span>I agree to be contacted by DIDM about my enquiry and accept the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</span></label>}{pending&&<p role="status">Sending your request…</p>}{error&&<p role="alert">{error} <a href="tel:+918800505151">Call admissions ↗</a></p>}</div>;
}
