import { motion } from "framer-motion";
import { Users, Share2, ShieldCheck } from "lucide-react";

export function GTNLeadGeneration() {
  return (
    <section
      id="lead-generation"
      className="py-28 bg-[hsl(218_30%_12%)] border-t border-white/10"
    >
      <div className="container mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Grow Your Network With <br className="hidden sm:block" />
            <span className="text-[#21b754]">Verified Professionals</span>
          </h2>

          <p className="text-[#a1a4ae] text-lg leading-relaxed">
            Get free MLM leads, connect with experienced network marketers,
            and discover ethical opportunities inside the GTN ecosystem.
          </p>

          <div className="mt-10 flex justify-center">
            <span className="h-px w-24 bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {[
            {
              icon: Users,
              title: "Lead Generation & Discovery",
              desc: `GTN enables members to meet experienced network marketers,
              discover verified business opportunities, and expand their
              genealogy with real professionals.`,
              iconColor: "#21b754",
            },
            {
              icon: Share2,
              title: "Who This Is For",
              desc: `Whether you are a seasoned MLM professional or someone looking
              for work-from-home opportunities, GTN connects you with people
              who already understand ethical network marketing.`,
              iconColor: "#21b754",
            },
            {
              icon: ShieldCheck,
              title: "What You Get After Joining",
              desc: `Access GTN’s member database, send partnership requests,
              receive inbound offers, and stay protected from spam with
              controlled, secure interactions.`,
              iconColor: "#21b754",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="
                group
                rounded-2xl
                p-8
                bg-linear-to-b from-[#141c2e] to-[#0e1424]
                border border-white/10
                shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)]
                transition-all duration-300
                hover:-translate-y-2
                hover:border-[#21b754]/40
              "
            >
              {/* ICON */}
              <div
                className="
                  w-14 h-14 rounded-xl
                  flex items-center justify-center
                  mb-6
                  bg-white/5
                  border border-white/10
                  group-hover:bg-white/10
                  transition-colors
                "
              >
                <item.icon
                  className="w-7 h-7"
                  style={{ color: item.iconColor }}
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {item.title}
              </h3>

              <p className="text-[#a1a4ae] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FOOT NOTE */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <p className="text-sm text-[#a1a4ae] leading-relaxed">
            Use of GTN is free. Members can promote their opportunities,
            advertise their websites, run banner campaigns, and connect
            with new MLM prospects daily.
            <br />
            <span className="text-[#21b754] font-semibold">
              GTN helps teams grow faster — ethically and sustainably.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
