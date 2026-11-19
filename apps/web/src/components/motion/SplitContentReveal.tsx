"use client";
import { MotionSection } from "./MotionSection";
import type { ReactNode } from "react";
interface Props{left:ReactNode;right:ReactNode;className?:string;layout?:"balanced"|"editorial"|"feature"|string;reverseOnMobile?:boolean;delayMs?:number}
export function SplitContentReveal({left,right,layout,className,reverseOnMobile=false,delayMs=0}:Props){
 const classes=className||(layout==="balanced"?"grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center":"grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center");
 const span=layout==="balanced"?"w-full":"lg:col-span-6 w-full";
 return <div className={classes}><MotionSection as="div" preset="slideLeft" className={`${span} ${reverseOnMobile?"order-2 lg:order-1":""}`} delayMs={delayMs}>{left}</MotionSection><MotionSection as="div" preset="slideRight" className={`${span} ${reverseOnMobile?"order-1 lg:order-2":""}`} delayMs={delayMs+120}>{right}</MotionSection></div>;
}
