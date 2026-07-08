// Hand-drawn SVG doodles. Each exposes its strokes with the class
// `doodle-stroke` so sections can animate stroke-dashoffset on scroll.

type DoodleProps = {
  className?: string;
};

export function Squiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 40" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M4 22 C 24 4, 40 40, 60 22 S 96 4, 116 22 S 152 40, 172 22 S 204 8, 216 18"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CircleScribble({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 300 110" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M150 12 C 60 8, 12 30, 14 56 C 16 86, 82 102, 156 100 C 234 98, 288 80, 286 52 C 284 24, 214 6, 128 12 C 90 15, 52 24, 38 36"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M30 4 L36 22 L55 23 L40 35 L46 54 L30 42 L14 54 L20 35 L5 23 L24 22 Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 90" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M8 10 C 30 50, 60 74, 104 76 M104 76 L82 60 M104 76 L84 86"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Underline({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 260 24" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M6 14 C 70 6, 150 6, 254 12 M30 19 C 100 13, 180 13, 236 17"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sun({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 90" fill="none" className={className} aria-hidden="true">
      <circle className="doodle-stroke" cx="45" cy="45" r="18" stroke="currentColor" strokeWidth="4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          className="doodle-stroke"
          x1={45 + 26 * Math.cos((deg * Math.PI) / 180)}
          y1={45 + 26 * Math.sin((deg * Math.PI) / 180)}
          x2={45 + 38 * Math.cos((deg * Math.PI) / 180)}
          y2={45 + 38 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function MusicNote({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 70 80" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M24 60 V 14 L 58 8 V 52"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse className="doodle-stroke" cx="16" cy="62" rx="9" ry="7" stroke="currentColor" strokeWidth="5" />
      <ellipse className="doodle-stroke" cx="50" cy="54" rx="9" ry="7" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}

export function SpeechBubble({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 80" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M45 8 C 20 8, 6 20, 6 36 C 6 50, 16 60, 32 63 L 26 76 L 46 64 C 68 64, 84 52, 84 36 C 84 20, 70 8, 45 8 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Paintbrush({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 90 90" fill="none" className={className} aria-hidden="true">
      <path
        className="doodle-stroke"
        d="M70 8 L 34 48 C 28 54, 30 62, 24 66 C 18 70, 10 68, 8 76 C 16 82, 28 80, 34 74 C 40 68, 38 60, 44 56 L 82 18 C 84 12, 78 6, 70 8 Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
