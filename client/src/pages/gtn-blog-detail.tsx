import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { GTNNavbar } from "@/components/layout/gtn-navbar";
import { GTNPageHeader } from "@/components/layout/gtn-page-header";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  image_url?: string | null;
  created_at?: string | null;
}

export default function GTNBlogDetail() {
  const [, params] = useRoute("/blogs/:id");
  const blogId = params?.id;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!blogId) return;

    async function loadBlog() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/blogs/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
          setError(null);
          return;
        }
      } catch (err) {
        console.error("Blog detail fetch failed, falling back to list:", err);
      }

      // Fallback: fetch list and find by id
      try {
        const listRes = await fetch(`${API_BASE}/blogs`);
        const listData = await listRes.json();
        const found = Array.isArray(listData)
          ? listData.find((item: any) => String(item.id) === String(blogId))
          : null;
        if (found) {
          setBlog(found);
          setError(null);
        } else {
          setError("Blog not found.");
        }
      } catch (err) {
        console.error("Blog list fallback failed:", err);
        setError("Unable to load this blog post right now.");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [blogId]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GTNNavbar />
      <section className="pt-28 pb-20 bg-linear-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <GTNPageHeader
              title={blog?.title || "Blog Details"}
              subtitle={blog?.excerpt || "Deep dive into this story from GTN."}
              kicker="Blog Detail"
              backHref="/blogs"
              backLabel="Back to Blogs"
            />
          </div>

          {loading && (
            <div className="text-center py-16 text-gray-400">Loading blog...</div>
          )}

          {!loading && error && (
            <div className="text-center py-16 text-gray-400">{error}</div>
          )}

          {!loading && blog && (
            <article className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-6">
              {blog.image_url && (
                <div className="relative overflow-hidden rounded-xl max-h-[460px]">
                  <motion.img
                    src={resolveMediaUrl(blog.image_url)}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500">
                {blog.created_at && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                )}
                <span className="text-primary font-semibold">{blog.author}</span>
              </div>

              <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                {blog.content || blog.excerpt}
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3 text-sm text-primary">
                <Link href="/blogs" className="underline">
                  Back to Blogs
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}
