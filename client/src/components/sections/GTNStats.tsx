import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Users, Send, Activity } from "lucide-react";

/* =========================
   NUMBER FORMATTER (K / M)
   ========================= */
function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/\.00$/, "") + "M";
  }
  if (value >= 1_000) {
    return Math.floor(value / 1_000) + "K";
  }
  return value.toString();
}

/* =========================
   COUNTER HOOK
   ========================= */
function useCounter(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

/* =========================
   STATS SECTION
   ========================= */
export function GTNStats() {
  const countries = useCounter(52);
  const members = useCounter(381185);
  const requests = useCounter(3448390);
  const online = useCounter(149);

  return (
    <section className="py-24 bg-[#29374f
    ] border-t border-white/10">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-primary text-sm font-bold uppercase tracking-widest mb-3">
            Global Reach
          </h4>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            GTN by the Numbers
          </h2>
          <p className="text-[#a1a4ae] text-lg">
            A fast-growing global network powered by real people and real activity.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {/* COUNTRIES */}
          <motion.div
            ref={countries.ref}
            className="bg-[#0b0f1a] rounded-2xl border border-white/5 p-8 text-center"
          >
            <Globe className="w-8 h-8 text-[#13f10f] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-white">
              {countries.value}+
            </div>
            <p className="text-[#a1a4ae] mt-2 text-sm uppercase tracking-wider">
              Countries
            </p>
          </motion.div>

          {/* REGISTERED MEMBERS */}
          <motion.div
            ref={members.ref}
            className="bg-[#0b0f1a] rounded-2xl border border-white/5 p-8 text-center"
          >
            <Users className="w-8 h-8 text-[#13f10f] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-white">
              {formatNumber(members.value)}
            </div>
            <p className="text-[#a1a4ae] mt-2 text-sm uppercase tracking-wider">
              Registered Members
            </p>
          </motion.div>

          {/* REQUESTS SENT */}
          <motion.div
            ref={requests.ref}
            className="bg-[#0b0f1a] rounded-2xl border border-white/5 p-8 text-center"
          >
            <Send className="w-8 h-8 text-[#13f10f] mx-auto mb-4" />
            <div className="text-4xl font-extrabold text-white">
              {formatNumber(requests.value)}
            </div>
            <p className="text-[#a1a4ae] mt-2 text-sm uppercase tracking-wider">
              Requests Sent
            </p>
          </motion.div>

          {/* MEMBERS ONLINE */}
          <motion.div
            ref={online.ref}
            className="bg-[#0b0f1a] rounded-2xl border border-white/5 p-8 text-center"
          >
            <Activity className="w-8 h-8 text-[#13f10f] mx-auto mb-4 animate-pulse" />
            <div className="text-4xl font-extrabold text-white">
              {online.value}
            </div>
            <p className="text-[#a1a4ae] mt-2 text-sm uppercase tracking-wider">
              Members Online
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
