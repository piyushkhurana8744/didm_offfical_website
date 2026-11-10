import React from "react";

export function GoogleAdsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 28.5L20.5 7.7C21.7 5.6 24.4 4.9 26.5 6.1C28.6 7.3 29.3 10 28.1 12.1L16.1 32.9C14.9 35 12.2 35.7 10.1 34.5C8 33.3 7.3 30.6 8.5 28.5Z"
        fill="#FBBC04"
      />
      <path
        d="M27.5 34.5C31.6 34.5 35 31.1 35 27C35 22.9 31.6 19.5 27.5 19.5C23.4 19.5 20 22.9 20 27C20 31.1 23.4 34.5 27.5 34.5Z"
        fill="#4285F4"
      />
      <path
        d="M12.5 42C15.5 42 18 39.5 18 36.5C18 33.5 15.5 31 12.5 31C9.5 31 7 33.5 7 36.5C7 39.5 9.5 42 12.5 42Z"
        fill="#34A853"
      />
    </svg>
  );
}

export function MetaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 18.5C20.5 13.5 14.8 11.5 9.5 14.5C4.2 17.5 1.5 23.5 3 29.5C4.5 35.5 10 39.5 16 38.5C20.5 37.8 24 33.5 24 33.5C24 33.5 27.5 37.8 32 38.5C38 39.5 43.5 35.5 45 29.5C46.5 23.5 43.8 17.5 38.5 14.5C33.2 11.5 27.5 13.5 24 18.5ZM16.2 32.5C12.5 32.8 8.8 30.2 7.8 26.5C6.8 22.8 8.8 19 12.5 17.8C16.2 16.6 20.2 18.5 22.5 22.2L16.2 32.5ZM31.8 32.5L25.5 22.2C27.8 18.5 31.8 16.6 35.5 17.8C39.2 19 41.2 22.8 40.2 26.5C39.2 30.2 35.5 32.8 31.8 32.5Z"
        fill="#0081FB"
      />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#0A66C2" />
      <path
        d="M14.5 19H9.5V35H14.5V19ZM12 12C10.3 12 9 13.3 9 15C9 16.7 10.3 18 12 18C13.7 18 15 16.7 15 15C15 13.3 13.7 12 12 12ZM38.5 25.5C38.5 20.5 35.8 18.5 32 18.5C28.8 18.5 27.3 20.3 26.5 21.5V19H21.5V35H26.5V26.8C26.5 24.6 26.9 22.5 29.6 22.5C32.3 22.5 32.4 25 32.4 27V35H37.5L38.5 25.5Z"
        fill="white"
      />
    </svg>
  );
}

export function GoogleAnalyticsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFF3E0" className="dark:fill-neutral-800" />
      <path d="M12 36V26H18V36H12Z" fill="#F9AB00" />
      <path d="M21 36V18H27V36H21Z" fill="#E37400" />
      <path d="M30 36V10H36V36H30Z" fill="#E37400" />
      <circle cx="33" cy="7" r="3" fill="#E37400" />
    </svg>
  );
}

export function GoogleSearchConsoleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#E8F0FE" className="dark:fill-neutral-800" />
      <path
        d="M32.5 29.5L28.2 25.2C29.3 23.7 30 21.9 30 20C30 14.5 25.5 10 20 10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30C21.9 30 23.7 29.3 25.2 28.2L29.5 32.5C30.3 33.3 31.7 33.3 32.5 32.5C33.3 31.7 33.3 30.3 32.5 29.5ZM20 26C16.7 26 14 23.3 14 20C14 16.7 16.7 14 20 14C23.3 14 26 16.7 26 20C26 23.3 23.3 26 20 26Z"
        fill="#1A73E8"
      />
      <path d="M20 18V22H24" stroke="#FBBC04" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GoogleTagManagerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#E8F4FD" className="dark:fill-neutral-800" />
      <path d="M24 8L10 22L24 36L38 22L24 8Z" fill="#246FDB" opacity="0.4" />
      <path d="M24 14L14 24L24 34L34 24L24 14Z" fill="#246FDB" />
      <circle cx="24" cy="24" r="4" fill="white" />
    </svg>
  );
}

export function SemrushIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFF0EB" className="dark:fill-neutral-800" />
      <path
        d="M24 10C16.3 10 10 16.3 10 24C10 31.7 16.3 38 24 38C31.7 38 38 31.7 38 24C38 16.3 31.7 10 24 10ZM30.5 27.8C29.2 29.8 26.8 31.2 24 31.2C19.8 31.2 16.5 27.8 16.5 23.6C16.5 20.4 18.5 17.7 21.3 16.5L24.8 23L30.5 27.8Z"
        fill="#FF642D"
      />
    </svg>
  );
}

export function AhrefsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#EBF2FE" className="dark:fill-neutral-800" />
      <path d="M12 34L24 12L36 34H28L24 24L20 34H12Z" fill="#1760E8" />
      <path d="M21 28H27L24 22L21 28Z" fill="#FF4F38" />
    </svg>
  );
}

export function ScreamingFrogIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#EEF9EE" className="dark:fill-neutral-800" />
      <circle cx="17" cy="18" r="5" fill="#50B848" />
      <circle cx="31" cy="18" r="5" fill="#50B848" />
      <circle cx="17" cy="18" r="2" fill="white" />
      <circle cx="31" cy="18" r="2" fill="white" />
      <path d="M14 26C18 31 30 31 34 26" stroke="#2B6628" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ChatGPTIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#10A37F" />
      <path
        d="M34.5 21.8C34 18.2 31.2 15.5 27.5 15.5C26.5 15.5 25.5 15.8 24.6 16.3C23.7 14.5 21.8 13.5 19.8 13.5C16.2 13.5 13.2 16.2 12.8 19.8C11.2 20.8 10 22.8 10 25C10 28.5 12.5 31.5 16 32.2C16.5 33.8 17.8 35.2 19.5 35.8C22.8 37 26.5 35.5 28 32.5C29.2 32.8 30.5 32.5 31.5 31.8C34.5 29.8 35.5 25.5 34.5 21.8ZM24 27.5C22.1 27.5 20.5 25.9 20.5 24C20.5 22.1 22.1 20.5 24 20.5C25.9 20.5 27.5 22.1 27.5 24C27.5 25.9 25.9 27.5 24 27.5Z"
        fill="white"
      />
    </svg>
  );
}

export function ClaudeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FAF4ED" className="dark:fill-neutral-800" />
      <path
        d="M24 10L27 20L37 17L30 24L37 31L27 28L24 38L21 28L11 31L18 24L11 17L21 20L24 10Z"
        fill="#CC785C"
      />
    </svg>
  );
}

export function MidjourneyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#1C1B29" />
      <path
        d="M24 11L14 31L24 26L34 31L24 11ZM24 28L18 36H30L24 28Z"
        fill="#9B87F5"
      />
    </svg>
  );
}

export function ZapierIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFF3ED" className="dark:fill-neutral-800" />
      <path
        d="M22 10H26V38H22V10ZM10 22H38V26H10V22ZM13.5 16.5L34.5 31.5L32 34.5L11 19.5L13.5 16.5ZM34.5 16.5L13.5 31.5L11 28.5L32 13.5L34.5 16.5Z"
        fill="#FF4A00"
      />
    </svg>
  );
}

export function HubSpotIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFF1ED" className="dark:fill-neutral-800" />
      <path
        d="M32 20.5V17.5C33.5 16.8 34.5 15.2 34.5 13.5C34.5 11 32.5 9 30 9C27.5 9 25.5 11 25.5 13.5C25.5 15.2 26.5 16.8 28 17.5V20.5C26 21 24.5 22.2 23.5 24H16.5C15.8 22.5 14.2 21.5 12.5 21.5C10 21.5 8 23.5 8 26C8 28.5 10 30.5 12.5 30.5C14.2 30.5 15.8 29.5 16.5 28H23.5C24.5 29.8 26.5 31 28.5 31.5V35.5C27 36.2 26 37.8 26 39.5C26 42 28 44 30.5 44C33 44 35 42 35 39.5C35 37.8 34 36.2 32.5 35.5V31.5C36 30.5 38.5 27.5 38.5 24C38.5 21.8 37 20.8 32 20.5ZM30 11.5C31.1 11.5 32 12.4 32 13.5C32 14.6 31.1 15.5 30 15.5C28.9 15.5 28 14.6 28 13.5C28 12.4 28.9 11.5 30 11.5ZM12.5 28.5C11.1 28.5 10 27.4 10 26C10 24.6 11.1 23.5 12.5 23.5C13.9 23.5 15 24.6 15 26C15 27.4 13.9 28.5 12.5 28.5ZM30.5 28.5C28 28.5 26 26.5 26 24C26 21.5 28 19.5 30.5 19.5C33 19.5 35 21.5 35 24C35 26.5 33 28.5 30.5 28.5Z"
        fill="#FF7A59"
      />
    </svg>
  );
}

export function HotjarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFEDF0" className="dark:fill-neutral-800" />
      <path
        d="M24 10C24 10 28 16 28 20C28 22.2 26.2 24 24 24C21.8 24 20 22.2 20 20C20 16 24 10 24 10ZM18 24C18 21.8 19.8 20 22 20C22 17 16 15 14 20C12 25 14 34 20 37C15 35 18 27 18 24ZM30 24C30 27 33 35 28 37C34 34 36 25 34 20C32 15 26 17 26 20C28.2 20 30 21.8 30 24Z"
        fill="#FD3A5C"
      />
    </svg>
  );
}

export function CanvaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#00C4CC" />
      <path
        d="M27 22C24.5 17 19.5 18 17 21C14 25 15 31 20 32C24 33 27 29 27 29L28.5 31C28.5 31 24.5 35 19 34C12.5 33 11 25 15 19C18.5 14 26 13 30 19L27 22Z"
        fill="white"
      />
    </svg>
  );
}

export function ShopifyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#F1F8E9" className="dark:fill-neutral-800" />
      <path
        d="M33.5 15L31.5 12L28.5 13L25.5 10H22.5L20 13.5L16 14.5L13.5 36.5L34.5 40L38 16L33.5 15ZM26 18.5C24.5 18.5 24 19.5 24 20.5C24 22.8 28.5 23.5 28.5 27C28.5 29.8 26.2 31.5 23.5 31.5C20.5 31.5 19.2 29.8 19.2 29.8L20 27.5C20 27.5 21.2 29 23 29C24.2 29 25 28.2 25 27.2C25 25.2 21 24.5 21 21C21 18.2 23.2 16.5 26 16.5C28.5 16.5 29.8 17.8 29.8 17.8L28.8 20C28.8 20 27.5 18.5 26 18.5Z"
        fill="#95BF47"
      />
    </svg>
  );
}

export function WordPressIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#21759B" />
      <path
        d="M24 10C16.3 10 10 16.3 10 24C10 31.7 16.3 38 24 38C31.7 38 38 31.7 38 24C38 16.3 31.7 10 24 10ZM12.2 24C12.2 20.8 13.5 18 15.5 15.8L22.2 34.2C16.5 32.8 12.2 28.8 12.2 24ZM24 35.8C22.5 35.8 21.2 35.5 20 35L23.8 24L27.5 34.5C26.5 35.2 25.2 35.8 24 35.8ZM33.5 22.8L29.5 34C33.5 31.5 35.8 27.8 35.8 24C35.8 21.5 34.8 19.2 33.2 17.5C33.5 18.5 33.8 19.5 33.8 20.5C33.8 21.5 33.5 22.2 33.5 22.8ZM31.8 14.5C30.2 13 27.2 12.2 24 12.2C21.8 12.2 19.8 12.8 18 13.8L22.8 26.8L26.5 16.5C26.5 16.5 27.2 14.5 28.5 14.5C29.8 14.5 31.8 14.5 31.8 14.5Z"
        fill="white"
      />
    </svg>
  );
}

export function MailchimpIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#FFE01B" />
      <circle cx="24" cy="24" r="11" fill="#241C15" />
      <path d="M21 21C21 20 22 19 23 19C24 19 25 20 25 21" stroke="#FFE01B" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 27C23 29 25 29 26 27" stroke="#FFE01B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GenericToolIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#F3F4F6" className="dark:fill-neutral-800" />
      <circle cx="24" cy="24" r="8" fill="#E11D48" opacity="0.8" />
    </svg>
  );
}

/* ========================================================================= */
/* RECRUITER / HIRING PARTNER LOGOS                                          */
/* ========================================================================= */

export function AmazonLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="23" letterSpacing="-1">
        amazon
      </text>
      <path d="M12 28C32 37 68 37 88 27" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M84 25L90 27.5L86 32" fill="#FF9900" />
    </svg>
  );
}

export function ZomatoLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="36" rx="8" fill="#CB202D" />
      <text x="60" y="25" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontStyle="italic" fontSize="20" textAnchor="middle" letterSpacing="-0.5">
        zomato
      </text>
    </svg>
  );
}

export function SwiggyLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" x="2" y="2" rx="8" fill="#FC8019" />
      <path d="M18 10C14 10 11 13 11 16C11 20 18 21 18 24C18 25 17 26 15 26C13 26 12 25 12 25L10 27C11 28 13 29 15 29C19 29 22 27 22 24C22 19 15 18 15 15C15 14 16 13 18 13C20 13 21 14 21 14L23 12C21 11 20 10 18 10Z" fill="white" />
      <text x="40" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="19" letterSpacing="0.5">
        SWIGGY
      </text>
    </svg>
  );
}

export function PaytmLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="25" fill="#002E6E" className="dark:fill-white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22">
        Pay
      </text>
      <text x="48" y="25" fill="#00BAF2" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22">
        tm
      </text>
    </svg>
  );
}

export function MakeMyTripLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="14" fill="#EB2026" />
      <text x="18" y="23" fill="white" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" textAnchor="middle">
        my
      </text>
      <text x="38" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="-0.5">
        makemytrip
      </text>
    </svg>
  );
}

export function NykaaLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="26" fill="#FC2779" fontFamily="system-ui, sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" letterSpacing="1">
        NYKAA
      </text>
    </svg>
  );
}

export function PolicyBazaarLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 24C12 17 18 12 25 12C32 12 38 17 38 24H12Z" fill="#002E6E" />
      <rect x="23" y="24" width="4" height="8" rx="2" fill="#FFC107" />
      <text x="44" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="14" letterSpacing="-0.5">
        policybazaar
      </text>
    </svg>
  );
}

export function LenskartLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="18" r="8" stroke="#00BAC6" strokeWidth="3" />
      <circle cx="30" cy="18" r="8" stroke="#00BAC6" strokeWidth="3" />
      <path d="M22 18H23" stroke="#00BAC6" strokeWidth="3" />
      <text x="44" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16">
        lenskart
      </text>
    </svg>
  );
}

export function CarDekhoLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" x="4" y="4" rx="7" fill="#FF6E00" />
      <path d="M10 20L13 14H23L26 20H10Z" fill="white" />
      <circle cx="13" cy="22" r="2" fill="white" />
      <circle cx="23" cy="22" r="2" fill="white" />
      <text x="38" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16">
        CarDekho
      </text>
    </svg>
  );
}

export function OgilvyLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="25" fill="#E00000" fontFamily="Georgia, serif" fontWeight="bold" fontStyle="italic" fontSize="24" letterSpacing="0.5">
        Ogilvy
      </text>
    </svg>
  );
}

export function DentsuLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="18" r="6" fill="#ED1C24" />
      <text x="24" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">
        dentsu
      </text>
    </svg>
  );
}

export function GroupMLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="5" y="25" fill="#0057B8" className="dark:fill-[#4BA3FF]" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="22" letterSpacing="0.5">
        group<span className="text-brand-red">m</span>
      </text>
    </svg>
  );
}

export function getToolIconComponent(toolName: string): React.ComponentType<{ className?: string }> {
  const t = toolName.toLowerCase();
  if (t.includes("google ads")) return GoogleAdsIcon;
  if (t.includes("meta ads")) return MetaIcon;
  if (t.includes("linkedin")) return LinkedInIcon;
  if (t.includes("analytics") || t.includes("ga4")) return GoogleAnalyticsIcon;
  if (t.includes("search console")) return GoogleSearchConsoleIcon;
  if (t.includes("tag manager")) return GoogleTagManagerIcon;
  if (t.includes("semrush")) return SemrushIcon;
  if (t.includes("ahrefs")) return AhrefsIcon;
  if (t.includes("screaming frog")) return ScreamingFrogIcon;
  if (t.includes("chatgpt")) return ChatGPTIcon;
  if (t.includes("claude")) return ClaudeIcon;
  if (t.includes("midjourney")) return MidjourneyIcon;
  if (t.includes("zapier") || t.includes("make")) return ZapierIcon;
  if (t.includes("hubspot")) return HubSpotIcon;
  if (t.includes("hotjar")) return HotjarIcon;
  if (t.includes("canva")) return CanvaIcon;
  if (t.includes("shopify")) return ShopifyIcon;
  if (t.includes("wordpress")) return WordPressIcon;
  if (t.includes("mailchimp") || t.includes("klaviyo")) return MailchimpIcon;
  return GenericToolIcon;
}

export function getRecruiterLogoComponent(recruiterName: string): React.ComponentType<{ className?: string }> {
  const r = recruiterName.toLowerCase();
  if (r.includes("amazon")) return AmazonLogo;
  if (r.includes("zomato")) return ZomatoLogo;
  if (r.includes("swiggy")) return SwiggyLogo;
  if (r.includes("paytm")) return PaytmLogo;
  if (r.includes("makemytrip")) return MakeMyTripLogo;
  if (r.includes("nykaa")) return NykaaLogo;
  if (r.includes("policybazaar")) return PolicyBazaarLogo;
  if (r.includes("lenskart")) return LenskartLogo;
  if (r.includes("cardekho")) return CarDekhoLogo;
  if (r.includes("ogilvy")) return OgilvyLogo;
  if (r.includes("dentsu")) return DentsuLogo;
  if (r.includes("groupm")) return GroupMLogo;
  return AmazonLogo;
}

