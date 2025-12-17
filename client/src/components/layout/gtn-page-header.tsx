import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

type GTNPageHeaderProps = {
  title: string;
  subtitle: string;
  kicker?: string;
  backHref?: string;
  backLabel?: string;
};

export function GTNPageHeader({
  title,
  subtitle,
  kicker,
  backHref = "/",
  backLabel = "Back to Home",
}: GTNPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-white/5 to-transparent p-8 md:p-10">
      <div
        className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 left-6 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          {kicker && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {kicker}
            </span>
          )}
          <div>
            <h1 className="section-title text-white mb-3">{title}</h1>
            <p className="text-gray-400 max-w-2xl">{subtitle}</p>
          </div>
        </div>
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>
      </div>
      <div
        className="mt-8 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
