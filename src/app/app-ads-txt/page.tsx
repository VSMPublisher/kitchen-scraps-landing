import { appAdsTxt } from "@/lib/appAdsTxt";

export default function AppAdsTxtPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-primary">
      <div className="max-w-3xl mx-auto py-14 px-4 sm:px-6">
        <h1 className="text-3xl font-display font-extrabold text-emerald-900">
          app-ads.txt
        </h1>
        <p className="mt-3 text-sm text-zinc-700 leading-relaxed">
          This page shows the AdMob verification file content in a human-readable format.
        </p>

        <div className="mt-8 rounded-3xl bg-white border border-brand-border p-6 shadow-premium-sm">
          <pre className="whitespace-pre-wrap break-words text-xs sm:text-sm font-mono text-zinc-900">
            {appAdsTxt}
          </pre>
        </div>

        <p className="mt-6 text-sm text-zinc-700">
          The actual verification endpoint is available at <a href="/app-ads.txt" className="font-bold text-emerald-900 hover:underline">/app-ads.txt</a>.
        </p>
      </div>
    </div>
  );
}
