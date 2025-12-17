import { useEffect, useState } from "react";
import { Trash2, Upload, Plus, Newspaper, X, Pencil } from "lucide-react";
import { API_BASE as API } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  images?: string[];
}

const MAX_NEWS_IMAGES = 30;

export function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagesDirty, setImagesDirty] = useState(false);

  // ------------------
  // FETCH NEWS
  // ------------------
  const fetchNews = async () => {
    const res = await fetch(`${API}/news`);
    const data = await res.json();
    setNews(data || []);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // ------------------
  // IMAGE UPLOAD
  // ------------------
  const uploadImages = async (files: FileList) => {
    const remaining = MAX_NEWS_IMAGES - imageUrls.length;
    if (remaining <= 0) {
      alert(`You can upload up to ${MAX_NEWS_IMAGES} images.`);
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    if (selected.length === 0) return;

    setUploading(true);
    const uploaded: string[] = [];

    for (const file of selected) {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.error || "Upload failed");
        continue;
      }

      uploaded.push(data.url);
    }

    setUploading(false);
    if (uploaded.length > 0) {
      setImageUrls((prev) => [...prev, ...uploaded]);
      setImagesDirty(true);
    }
  };

  const removeImage = (url: string) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
    setImagesDirty(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrls([]);
    setEditingId(null);
    setImagesDirty(false);
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setDescription(item.description || "");
    if (item.images && item.images.length > 0) {
      setImageUrls(item.images);
    } else if (item.image_url) {
      setImageUrls([item.image_url]);
    } else {
      setImageUrls([]);
    }
    setImagesDirty(false);
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
    if (imageUrls.length > 0) {
      form.append("image_urls", JSON.stringify(imageUrls));
    }

    const res = await fetch(`${API}/news`, {
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

    resetForm();
    fetchNews();
  };

  // ------------------
  // UPDATE NEWS
  // ------------------
  const updateNews = async () => {
    if (!editingId) return;
    if (!title || !description) {
      alert("Title & description required");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("id", String(editingId));
    form.append("title", title);
    form.append("description", description);
    if (imagesDirty) {
      form.append("image_urls", JSON.stringify(imageUrls));
    }

    const res = await fetch(`${API}/news`, {
      method: "PUT",
      body: form,
      credentials: "include",
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.error || "Failed to update news");
      return;
    }

    resetForm();
    fetchNews();
  };

  // ------------------
  // DELETE NEWS
  // ------------------
  const deleteNews = async (id: number) => {
    if (!confirm("Delete this news item?")) return;

    const res = await fetch(`${API}/news`, {
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

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <label className="cursor-pointer text-primary flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Images"}
              <input
                hidden
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && uploadImages(e.target.files)}
              />
            </label>
            <span className="text-xs text-gray-400">
              {imageUrls.length}/{MAX_NEWS_IMAGES}
            </span>
          </div>

          {imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {imageUrls.map((url) => (
                <div
                  key={url}
                  className="relative border border-white/10 rounded overflow-hidden"
                >
                  <img
                    src={resolveMediaUrl(url)}
                    className="h-20 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={editingId ? updateNews : createNews}
            disabled={loading || uploading}
            className="bg-primary text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {loading
              ? "Saving..."
              : editingId
              ? "Update News"
              : "Add News"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-white/20 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {news.map((n) => (
          <div
            key={n.id}
            className="bg-white/5 border border-white/10 p-4 rounded space-y-2"
          >
            {(n.images?.[0] || n.image_url) && (
              <img
                src={resolveMediaUrl(n.images?.[0] || n.image_url)}
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

            <button
              type="button"
              onClick={() => startEdit(n)}
              className="text-primary flex items-center gap-2 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
  
