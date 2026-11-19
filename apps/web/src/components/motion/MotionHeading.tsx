"use client";
import type { ElementType, ReactNode } from "react";
interface Props{eyebrow?:string;title?:ReactNode;children?:ReactNode;subtitle?:ReactNode;description?:ReactNode;as?:ElementType;size?:"sm"|"md"|"lg"|"xl"|string;align?:"left"|"center"|"right";className?:string;eyebrowClassName?:string;titleClassName?:string;descriptionClassName?:string;delayMs?:number}
export function MotionHeading({eyebrow,title,children,subtitle,description,as:Tag="h2",size,align="center",className="",eyebrowClassName="",titleClassName="",descriptionClassName=""}:Props){
 const heading=title!==undefined?title:children;const desc=description!==undefined?description:subtitle;
 if(!eyebrow&&!desc)return <Tag className={className}>{heading}</Tag>;
 return <div className={`motion-heading max-w-3xl space-y-4 ${align==="center"?"text-center mx-auto":align==="right"?"text-right ml-auto":"text-left mr-auto"} ${className}`}>
 {eyebrow&&<p className={`motion-eyebrow text-xs font-semibold uppercase tracking-widest text-brand-red ${eyebrowClassName}`}>{eyebrow}</p>}
 <Tag className={`${size==="xl"?"text-3xl sm:text-5xl lg:text-6xl":"text-2xl sm:text-3xl lg:text-4xl"} font-medium tracking-tight text-neutral-900 dark:text-white leading-tight ${titleClassName}`}>{heading}</Tag>
 {desc&&<div className={`text-sm lg:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed ${descriptionClassName}`}>{desc}</div>}
 </div>;
}
