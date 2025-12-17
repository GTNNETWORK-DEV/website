import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  images?: string[];
  created_at?: string | null;
}

export function GTNNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

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

  const latestNews = news.slice(0, 6);

  useEffect(() => {
    if (!carouselApi || latestNews.length < 2) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [carouselApi, latestNews.length]);

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
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{ align: "start", loop: latestNews.length > 1 }}
              setApi={setCarouselApi}
            >
              <CarouselContent className="-ml-6">
                {latestNews.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-6 md:basis-1/2"
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="feature-card bg-card p-6 rounded-xl"
                    >
                      <div className="grid md:grid-cols-3 gap-6 items-start">
                        {/* Image */}
                        {getNewsImages(item).length > 0 && (
                          <div className="md:col-span-1 relative overflow-hidden h-48 rounded-lg">
                            <NewsImageRotator
                              images={getNewsImages(item)}
                              alt={item.title}
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
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
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

  useEffect(() => {
    if (images.length < 2) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5200);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={`${images[activeIndex]}-${activeIndex}`}
          src={images[activeIndex]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
          whileHover={{ scale: 1.1 }}
        />
      </AnimatePresence>
    </div>
  );
}
