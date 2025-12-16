import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  created_at?: string;
}

export function GTNNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 API CALL (THIS WAS MISSING)
  useEffect(() => {
    fetch(`${API_BASE}/news`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading news:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  const latestNews = news.slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="section-title text-white mb-4">GTN News & Updates</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            Breaking news and important updates from the Global Team Network.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading news…
          </div>
        )}

        {/* Empty */}
        {!loading && latestNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <p className="text-gray-400 text-lg">
              No news yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* News Cards */}
        {!loading && latestNews.length > 0 && (
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
                className="feature-card bg-card p-6 rounded-xl"
              >
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  {/* Image */}
                  {item.image_url && (
                    <div className="md:col-span-1 relative overflow-hidden h-48 rounded-lg">
                      <motion.img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-display font-bold text-white mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-4 h-4" />
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : ""}
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
