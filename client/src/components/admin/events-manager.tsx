import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  name: string;
  image: string;
  date: string;
  location: string;
  link?: string;
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("gtn_events");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    date: "",
    location: "",
    link: "",
  });

  const [previewImage, setPreviewImage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("gtn_events", JSON.stringify(events));
  }, [events]);

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

  const handleAddEvent = () => {
    if (formData.name && formData.image) {
      if (editingId) {
        setEvents(events.map(e => 
          e.id === editingId 
            ? { ...e, ...formData, link: formData.link || undefined }
            : e
        ));
        setEditingId(null);
      } else {
        const newEvent: Event = {
          id: Date.now().toString(),
          name: formData.name,
          image: formData.image,
          date: formData.date,
          location: formData.location,
          link: formData.link || undefined,
        };
        setEvents([...events, newEvent]);
      }
      setFormData({ name: "", image: "", date: "", location: "", link: "" });
      setPreviewImage("");
    }
  };

  const handleEditEvent = (event: Event) => {
    setFormData({
      name: event.name,
      image: event.image,
      date: event.date,
      location: event.location,
      link: event.link || "",
    });
    setPreviewImage(event.image);
    setEditingId(event.id);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleCancel = () => {
    setFormData({ name: "", image: "", date: "", location: "", link: "" });
    setPreviewImage("");
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Manage Events</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="feature-card bg-card p-8">
            <h3 className="text-xl font-bold text-white mb-6">
              {editingId ? "Edit Event" : "Add New Event"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Event Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Event name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. London / Online"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Event Link (Optional)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddEvent}
                  className="cta-button flex-1 h-12 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> {editingId ? "Update Event" : "Add Event"}
                </Button>
                {editingId && (
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                )}
              </div>
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
              <h3 className="text-lg font-bold text-white mb-4">Image Preview</h3>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border border-white/10 bg-white/5"
              />
            </Card>
          </motion.div>
        )}
      </div>

      {/* Events Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">All Events ({events.length})</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="feature-card bg-card p-6 flex flex-col gap-4">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-32 object-cover rounded-lg border border-white/10 bg-white/5"
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">{event.name}</h4>
                <div className="text-sm text-gray-400 mb-2">
                  {event.date && <span>{new Date(event.date).toLocaleDateString()}</span>}
                  {event.location && <span> • {event.location}</span>}
                </div>
                {event.link && (
                  <p className="text-sm text-primary truncate mb-4">{event.link}</p>
                )}
              </div>
              <div className="flex gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleEditEvent(event)}
                  className="flex-1 p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="flex-1 p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
