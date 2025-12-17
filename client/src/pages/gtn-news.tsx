import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  images?: string[];
  created_at?: string | null;
}

export default function GTNNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="py-20 bg-linear-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <h1 className="section-title text-white mb-3">News</h1>
            <p className="text-gray-400 max-w-2xl">
              Official updates, announcements, and highlights from the Global
              Team Network.
            </p>
          </div>
          <Link href="/" className="text-primary text-sm font-semibold">
            Back to Home
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading news...
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No news available yet. Please check back soon.
          </div>
        )}

        {!loading && news.length > 0 && (
          <div className="space-y-8">
            {news.map((item, index) => {
              const images = getNewsImages(item);

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="grid md:grid-cols-[260px,1fr] gap-6 items-start">
                    {images.length > 0 && (
                      <div className="relative h-52 md:h-56 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                        <NewsImageRotator images={images} alt={item.title} />
                      </div>
                    )}

                    <div>
                      <h2 className="text-2xl font-display font-bold text-white mb-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                        <Clock className="w-4 h-4" />
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : ""}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function getNewsImages(item: NewsItem) {
  if (item.images && item.images.length > 0) {
    return item.images;
  }
  if (item.image_url) {
    return [item.image_url];
  }
  return [];
}

function NewsImageRotator({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedImages = images
    .map((image) => resolveMediaUrl(image))
    .filter(Boolean);

  useEffect(() => {
    if (resolvedImages.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 5200);

    return () => clearInterval(interval);
  }, [resolvedImages.length]);

  if (resolvedImages.length === 0) {
    return null;
  }

  return (
    <motion.img
      key={`${resolvedImages[activeIndex]}-${activeIndex}`}
      src={resolvedImages[activeIndex]}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
