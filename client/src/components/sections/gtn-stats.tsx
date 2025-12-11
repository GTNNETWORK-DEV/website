import { motion } from "framer-motion";

export function GTNStats() {
  const stats = [
    { label: "Registered Members", value: "381,146" },
    { label: "Requests Sent", value: "3,441,964" },
    { label: "Members Online", value: "52+" }
  ];

  return (
    <section className="py-12 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div className="text-4xl font-display font-bold mb-2">
                {stat.value}
              </motion.div>
              <p className="text-lg font-medium opacity-90">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
