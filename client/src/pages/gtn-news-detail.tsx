import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNPageHeader } from "@/components/layout/gtn-page-header";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  images?: string[];
  created_at?: string | null;
}

export default function GTNNewsDetail() {
  const [, params] = useRoute("/news/:id");
  const newsId = params?.id;
  const [news, setNews] = useState<NewsItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedImages =
    news?.images && news.images.length > 0
      ? news.images.map((img) => resolveMediaUrl(img)).filter(Boolean)
      : news?.image_url
      ? [resolveMediaUrl(news.image_url)].filter(Boolean)
      : [];

  useEffect(() => {
    if (!newsId) return;
    async function loadNews() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/news/${newsId}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data);
          setError(null);
          setActiveIndex(0);
          return;
        }
      } catch (err) {
        console.error("News detail fetch failed, falling back to list:", err);
      }

      // Fallback: fetch list and find by id
      try {
        const listRes = await fetch(`${API_BASE}/news`);
        const listData = await listRes.json();
        const found = Array.isArray(listData)
          ? listData.find((item: any) => String(item.id) === String(newsId))
          : null;
        if (found) {
          setNews(found);
          setError(null);
          setActiveIndex(0);
        } else {
          setError("News item not found.");
        }
      } catch (err) {
        console.error("News list fallback failed:", err);
        setError("Unable to load this news item right now.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [newsId]);

  useEffect(() => {
    if (!resolvedImages || resolvedImages.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % resolvedImages.length);
    }, 4800);
    return () => clearInterval(interval);
  }, [resolvedImages.length]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNNavbar />
      <section className="pt-28 pb-20 bg-linear-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <GTNPageHeader
              title={news?.title || "News Details"}
              subtitle={
                news?.description ||
                "Detailed announcement and highlights from the GTN newsroom."
              }
              kicker="News Detail"
              backHref="/news"
              backLabel="Back to News"
            />
          </div>

          {loading && (
            <div className="text-center py-16 text-gray-400">Loading news...</div>
          )}

          {!loading && error && (
            <div className="text-center py-16 text-gray-400">{error}</div>
          )}

          {!loading && news && (
            <article className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-6">
              {resolvedImages.length > 0 && (
                <div className="relative w-full rounded-xl overflow-hidden max-h-[460px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${resolvedImages[activeIndex]}-${activeIndex}`}
                      src={resolvedImages[activeIndex]}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9 }}
                    />
                  </AnimatePresence>
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500">
                {news.created_at && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {new Date(news.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {news.description}
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3 text-sm text-primary">
                <Link href="/news" className="underline">
                  Back to News
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
