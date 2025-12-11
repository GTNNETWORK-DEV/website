import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

export default function NewsAdmin() {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem("gtn_news");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("gtn_news", JSON.stringify(news));
  }, [news]);

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

  const handleAddNews = () => {
    if (formData.title && formData.description && formData.image) {
      const newNews: NewsItem = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        image: formData.image,
        date: new Date().toISOString(),
      };
      setNews([newNews, ...news]);
      setFormData({ title: "", description: "", image: "" });
      setPreviewImage("");
    }
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h1 className="section-title text-white">Manage News</h1>
          <Link href="/">
            <a className="text-primary hover:text-primary/80 font-semibold">Back to Home</a>
          </Link>
        </div>

        {/* Add News Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="lg:col-span-2">
            <Card className="feature-card bg-card p-8">
              <h2 className="text-2xl font-display font-bold text-white mb-6">Add News Update</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="News headline"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Full news description"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Featured Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <Button
                  onClick={handleAddNews}
                  className="cta-button w-full h-12 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Publish News
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

        {/* News List */}
        <div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">All News ({news.length})</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {news.length === 0 ? (
              <Card className="feature-card bg-card p-8 text-center">
                <p className="text-gray-400">No news yet. Publish your first update!</p>
              </Card>
            ) : (
              news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="feature-card bg-card p-6">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-2 truncate">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg border border-white/10"
                        />
                        <button
                          onClick={() => handleDeleteNews(item.id)}
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
