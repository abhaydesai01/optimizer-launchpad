type StepCardProps = {
  step: string;
  status: "completed" | "active" | "pending";
};

export function StepCard({ step, status }: StepCardProps) {
  const classes =
    status === "completed"
      ? "border-[#10B981] bg-[#10B98110] text-[#10B981]"
      : status === "active"
        ? "border-[#8B5CF6] bg-[#8B5CF610] text-[#8B5CF6]"
        : "border-[#E2E7F0] bg-white text-[#9AA4B7]";

  return (
    <div className={`rounded-xl border px-3 py-2 text-center text-xs font-semibold ${classes}`}>
      {status === "completed" ? "✓ " : ""}
      {step}
    </div>
  );
}
