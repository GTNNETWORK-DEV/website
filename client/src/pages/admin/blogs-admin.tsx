import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Edit2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem("gtn_blogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    author: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("gtn_blogs", JSON.stringify(blogs));
  }, [blogs]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData(prev => ({ ...prev, image: base64 }));
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBlog = () => {
    if (formData.title && formData.excerpt && formData.author && formData.image) {
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        image: formData.image,
        date: new Date().toISOString(),
        author: formData.author,
      };
      setBlogs([newBlog, ...blogs]);
      setFormData({ title: "", excerpt: "", author: "", image: "" });
      setPreviewImage("");
    }
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="section-title text-white">Manage Blogs</h1>
          <Link href="/">
            <a className="text-primary hover:text-primary/80 font-semibold">Back to Home</a>
          </Link>
        </div>

        {/* Add Blog Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2">
            <Card className="feature-card bg-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Add New Blog Post</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Blog post title"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="Author name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Brief summary of the blog post"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <Button
                  onClick={handleAddBlog}
                  className="cta-button w-full h-12 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Blog Post
                </Button>
              </div>
            </Card>
          </div>

          {/* Image Preview */}
          {previewImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="feature-card bg-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-auto rounded-lg border border-white/10"
                />
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Blogs List */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">All Blog Posts ({blogs.length})</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {blogs.length === 0 ? (
              <Card className="feature-card bg-card p-8 text-center">
                <p className="text-gray-400">No blog posts yet. Create your first one!</p>
              </Card>
            ) : (
              blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="feature-card bg-card p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-2 truncate">{blog.title}</h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>By {blog.author}</span>
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-24 h-24 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
