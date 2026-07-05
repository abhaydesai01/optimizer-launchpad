/**
 * Brand mark: "the answer line" — three lines of an AI answer,
 * the middle one highlighted. Replaces the retired orbit/rings motif.
 */
export function AnswerGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="8" width="20" height="2.6" rx="1.3" fill="currentColor" opacity="0.45" />
      <rect x="4" y="14.7" width="24" height="2.6" rx="1.3" fill="var(--mint)" />
      <rect x="4" y="21.4" width="14" height="2.6" rx="1.3" fill="currentColor" opacity="0.45" />
    </svg>
  );
}

/**
 * Decorative background: soft vertical light beams. Purely aesthetic.
 */
export function AnswerBeams({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(60,232,180,0.05) 42%, transparent 50%, rgba(227,178,105,0.04) 62%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(60,232,180,0.4), transparent)",
        }}
      />
    </div>
  );
}
