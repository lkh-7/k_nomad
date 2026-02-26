interface ScoreBarProps {
  label: string;
  icon: string;
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 4.0) return "#22c55e";
  if (score >= 3.0) return "#eab308";
  return "#ef4444";
}

export default function ScoreBar({ label, icon, score }: ScoreBarProps) {
  const color = getScoreColor(score);
  const widthPct = (score / 5) * 100;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs w-16 shrink-0" style={{ color: "#8b9bb4" }}>
        {icon} {label}
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${widthPct}%`, backgroundColor: color }}
        />
      </div>
      <span
        className="text-xs w-6 text-right shrink-0"
        style={{
          color,
          fontFamily: "var(--font-space-mono)",
        }}
      >
        {score.toFixed(1)}
      </span>
    </div>
  );
}
