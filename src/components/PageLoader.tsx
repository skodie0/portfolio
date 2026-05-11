export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background gap-6">
      {/* Animated coffee cup SVG */}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          className="w-20 h-20 drop-shadow-lg"
        >
          {/* Steam lines */}
          <path
            d="M20 24 Q22 18 20 12"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam-1"
          />
          <path
            d="M28 22 Q30 16 28 10"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam-2"
          />
          <path
            d="M36 24 Q38 18 36 12"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            className="animate-steam-3"
          />
          {/* Cup body */}
          <rect x="10" y="28" width="36" height="26" rx="4" fill="hsl(var(--primary))" />
          {/* Cup handle */}
          <path
            d="M46 34 Q58 34 58 43 Q58 52 46 52"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Saucer */}
          <ellipse cx="28" cy="55" rx="22" ry="4" fill="hsl(var(--primary) / 0.7)" />
          {/* Code brackets */}
          <text
            x="14"
            y="46"
            fontFamily="monospace"
            fontSize="14"
            fontWeight="bold"
            fill="hsl(var(--primary-foreground))"
          >
            {"</>"}
          </text>
        </svg>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-primary text-sm tracking-widest animate-pulse">
          loading...
        </span>
        {/* Progress dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

