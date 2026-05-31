"use client";

import { useState } from "react";

export function ArticleEditor({
  initialValue,
  onSave,
  buttonLabel = "Save",
}: {
  initialValue: string;
  onSave: (nextValue: string) => Promise<void>;
  buttonLabel?: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-64 w-full rounded-xl border border-[#E2E7F0] p-3 text-sm"
      />
      <button
        onClick={async () => {
          setSaving(true);
          setSaved(false);
          await onSave(value);
          setSaving(false);
          setSaved(true);
        }}
        disabled={saving}
        className="rounded-lg bg-[#222735] px-4 py-2 text-sm font-semibold text-white"
      >
        {saving ? "Saving..." : buttonLabel}
      </button>
      {saved ? <p className="text-xs text-[#10B981]">Saved.</p> : null}
    </div>
  );
}
