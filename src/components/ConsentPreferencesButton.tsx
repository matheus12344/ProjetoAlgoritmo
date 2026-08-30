"use client";

import { OPEN_CONSENT_SETTINGS_EVENT } from "@/lib/consent";

type ConsentPreferencesButtonProps = {
  className?: string;
};

export function ConsentPreferencesButton({
  className,
}: ConsentPreferencesButtonProps) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT))}
      type="button"
    >
      Gerenciar preferências
    </button>
  );
}
