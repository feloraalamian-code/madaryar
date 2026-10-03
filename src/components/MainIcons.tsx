// آیکون قلب (برای وقت خودم)
export function IconHeart({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M32 54 C 32 54 6 38 6 22 C 6 13 13 6 22 6 C 27 6 30 9 32 12 C 34 9 37 6 42 6 C 51 6 58 13 58 22 C 58 38 32 54 32 54 Z"
        fill="#F9A8D4"
        stroke="#BE185D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="20" r="3" fill="#FFFFFF" opacity="0.7" />
      <circle cx="42" cy="20" r="3" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

// آیکون خانه
export function IconHome({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <path
        d="M8 30 L32 10 L56 30 L56 54 L8 54 Z"
        fill="#BAE6FD"
        stroke="#0369A1"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="24" y="36" width="16" height="18" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
      <circle cx="36" cy="46" r="1.5" fill="#0369A1" />
    </svg>
  );
}

// آیکون بچه
export function IconBaby({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* سر */}
      <circle cx="32" cy="26" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* مو */}
      <path
        d="M20 18 Q32 8 44 18"
        stroke="#92400E"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* چشم‌ها */}
      <circle cx="26" cy="26" r="2" fill="#92400E" />
      <circle cx="38" cy="26" r="2" fill="#92400E" />
      {/* لبخند */}
      <path
        d="M26 32 Q32 38 38 32"
        stroke="#92400E"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* لپ */}
      <circle cx="22" cy="32" r="2" fill="#FCA5A5" opacity="0.6" />
      <circle cx="42" cy="32" r="2" fill="#FCA5A5" opacity="0.6" />
      {/* بدن (قنداق) */}
      <path
        d="M20 44 Q32 40 44 44 L44 54 L20 54 Z"
        fill="#FBCFE8"
        stroke="#BE185D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}