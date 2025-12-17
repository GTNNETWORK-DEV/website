import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { Link } from "wouter";
import { resolveMediaUrl } from "@/lib/media";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  image_url?: string | null;
  created_at?: string | null;
}

export default function GTNBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blogs:", err);
        setLoading(false);
      });
  }, [API_BASE]);

  return (
    <section className="py-20 bg-linear-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <h1 className="section-title text-white mb-3">Blog</h1>
            <p className="text-gray-400 max-w-2xl">
              Insights, stories, and advice from the GTN community.
            </p>
          </div>
          <Link href="/" className="text-primary text-sm font-semibold">
            Back to Home
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16 text-gray-400">
            Loading blogs...
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No blog posts yet. Please check back soon.
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="feature-card bg-card p-6 rounded-xl"
              >
                {blog.image_url && (
                  <div className="relative overflow-hidden h-48 mb-4 rounded-lg">
                    <motion.img
                      src={resolveMediaUrl(blog.image_url)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                )}

                <h2 className="text-xl font-display font-bold text-white mb-2 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : ""}
                  </div>
                  <span className="text-primary font-semibold">
                    {blog.author}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
