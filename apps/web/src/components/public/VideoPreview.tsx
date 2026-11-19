"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export function VideoPreview() {
  const [playing, setPlaying] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <div className="public-video-preview">
    {playing ? <><button type="button" className="public-video-close" onClick={()=>{setPlaying(false);requestAnimationFrame(()=>trigger.current?.focus());}}><X size={16} aria-hidden="true" /> Close video</button><iframe src="https://www.youtube.com/embed/C-fBLt9XEY8" title="A Decade of Excellence - The Rise of DIDM" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></> : <button ref={trigger} type="button" onClick={()=>setPlaying(true)} ><Image src="/images/didm/about/Didm_Annual_Meet_2026.webp" alt="" fill sizes="(max-width: 1000px) 100vw, 1000px" /><span className="public-video-play"><Play size={22} aria-hidden="true" /> Play DIDM introduction video</span><span className="public-video-note">Opens the existing DIDM video on YouTube</span></button>}
  </div>;
}
