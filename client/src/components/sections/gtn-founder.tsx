import { BadgeCheck, Globe2, Network, ShieldCheck } from "lucide-react";
import { gtnOfficialChannels } from "@/lib/gtn-links";

const profileSignals = [
  { label: "Public Title", value: "Founder & CEO" },
  { label: "Primary Identity", value: "Global Networker" },
  { label: "Countries Connected", value: "Middle East, South Asia, Europe, Southeast Asia" },
  { label: "Focus", value: "Leaders, communities, training, and global opportunity" },
];

const ecosystemAreas = [
  "About",
  "Leadership Journey",
  "Countries Connected",
  "Companies Worked With",
  "Areas of Expertise",
  "Community Impact",
  "Achievements",
  "Reputation",
  "Social Reach",
  "Recent Activity",
  "Followers",
  "Following",
  "Teams",
  "Companies",
  "Timeline",
  "Gallery",
  "Videos",
  "Events",
  "Training",
  "Testimonials",
];

export function GTNFounder() {
  return (
    <section id="founder" className="py-24 bg-background border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <div className="rounded-3xl border border-primary/25 bg-white/[0.03] p-8 shadow-[0_30px_80px_-45px_rgba(76,175,80,0.65)]">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <BadgeCheck className="h-4 w-4" />
                Founder Badge
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Verified Leader
              </span>
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold">Official Founder Profile</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-display font-black text-white">Mr. Bhatti</h2>
            <p className="mt-4 text-2xl text-white/85">Connecting Leaders. Building Communities. Creating Global Opportunities.</p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              GTN is not an MLM website. It is a global Leader Ecosystem where every leader can build a trusted public profile, connect with communities, share training, and grow through reputation-led visibility.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {profileSignals.map((item) => (
                <div key={item.label} className="rounded-2xl bg-black/25 border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{item.label}</p>
                  <p className="mt-2 text-white font-semibold leading-6">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 mb-5">
                <Globe2 className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-display font-bold text-white">Global Presence</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Countries", "Regions", "Cities", "Languages", "Industries", "Specializations", "Mentorship", "Speaking Engagements"].map((item) => (
                  <span key={item} className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-gray-300">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 mb-5">
                <Network className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-display font-bold text-white">Leader Profile Blueprint</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ecosystemAreas.map((item) => (
                  <span key={item} className="rounded-xl bg-black/20 px-3 py-2 text-sm text-gray-300">{item}</span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-display font-bold text-white mb-4">Official Channels</h3>
              <div className="flex flex-wrap gap-3">
                {gtnOfficialChannels.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
