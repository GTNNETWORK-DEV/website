import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export function GTNNews() {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem("gtn_news");
    return saved ? JSON.parse(saved) : [];
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const latestNews = news.slice(0, 2);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-20"
        >
          <div>
            <h2 className="section-title text-white mb-4">GTN News & Updates</h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Breaking news and important updates from the Global Team Network.
            </p>
          </div>
        </motion.div>

        {latestNews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">No news yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {latestNews.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group feature-card bg-card cursor-pointer"
              >
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1 relative overflow-hidden h-48 md:h-full rounded-lg">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                      <span className="text-primary font-semibold text-sm">Read More</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
