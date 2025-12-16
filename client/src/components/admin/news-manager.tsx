import { useEffect, useState } from "react";
import { Trash2, Upload, Plus, Newspaper } from "lucide-react";
import { API_BASE as API } from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ------------------
  // FETCH NEWS
  // ------------------
  const fetchNews = async () => {
    const res = await fetch(`${API}/news.php`);
    const data = await res.json();
    setNews(data || []);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ------------------
  // IMAGE UPLOAD
  // ------------------
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API}/upload.php`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Upload failed");
      return;
    }

    setImageUrl(data.url);
  };

  // ------------------
  // CREATE NEWS
  // ------------------
  const createNews = async () => {
    if (!title || !description) {
      alert("Title & description required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    if (imageUrl) form.append("image_url", imageUrl);

    const res = await fetch(`${API}/news.php`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to create news");
      return;
    }

    setTitle("");
    setDescription("");
    setImageUrl(null);
    fetchNews();
  };

  // ------------------
  // DELETE NEWS
  // ------------------
  const deleteNews = async (id: number) => {
    if (!confirm("Delete this news item?")) return;

    const res = await fetch(`${API}/news.php`, {
      method: "DELETE",
      credentials: "include",
      body: new URLSearchParams({ id: String(id) }),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.error || "Delete failed");
      return;
    }

    fetchNews();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Newspaper className="w-6 h-6" /> News Manager
      </h1>

      {/* CREATE */}
      <div className="bg-white/5 p-6 rounded border border-white/10 space-y-4">
        <input
          className="w-full p-2 bg-black border border-white/20 rounded"
          placeholder="News title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-black border border-white/20 rounded min-h-[120px]"
          placeholder="News description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label className="cursor-pointer text-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files && uploadImage(e.target.files[0])
              }
            />
          </label>

          {imageUrl && (
            <img src={imageUrl} className="h-14 rounded bg-white" />
          )}
        </div>

        <button
          onClick={createNews}
          disabled={loading}
          className="bg-primary text-black px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {loading ? "Saving..." : "Add News"}
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n) => (
          <div
            key={n.id}
            className="bg-white/5 border border-white/10 p-4 rounded space-y-2"
          >
            {n.image_url && (
              <img
                src={n.image_url}
                className="h-32 w-full object-cover rounded"
              />
            )}

            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-4">
              {n.description}
            </p>

            <button
              onClick={() => deleteNews(n.id)}
              className="text-red-400 flex items-center gap-2 mt-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
  
