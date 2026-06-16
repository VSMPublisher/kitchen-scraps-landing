export default function TrustBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-brand-soft-bg/60 border border-emerald-600/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-900 tracking-wide ${className}`}
    >
      <span className="text-emerald-600" aria-hidden="true">✓</span>
      <span>VirusTotal 0/70</span>
      <span className="text-emerald-600/40" aria-hidden="true">•</span>
      <span>Zero Permissions</span>
      <span className="text-emerald-600/40" aria-hidden="true">•</span>
      <span>60MB</span>
    </div>
  );
}
