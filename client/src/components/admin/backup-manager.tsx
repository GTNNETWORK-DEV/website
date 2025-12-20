import { useRef, useState } from "react";
import { DownloadCloud, UploadCloud, RefreshCw } from "lucide-react";
import { API_BASE } from "@/lib/api";

export function BackupManager() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const downloadBackup = async () => {
    setMessage(null);
    setDownloading(true);
    try {
      const res = await fetch(`${API_BASE}/backup`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Backup download failed");
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") || "";
      const match = disposition.match(/filename="?(.*)"?/i);
      const filename = match?.[1] || "gtn-backup.zip";
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setMessage("Backup downloaded.");
    } catch (err) {
      console.error(err);
      setMessage("Unable to download backup.");
    } finally {
      setDownloading(false);
    }
  };

  const handleRestore = async (file?: File | null) => {
    if (!file) return;
    setMessage(null);
    setRestoring(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_BASE}/backup/restore`, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.detail || data?.error || "Restore failed");
      }
      setMessage("Backup restored successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Unable to restore backup.");
    } finally {
      setRestoring(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <RefreshCw className="w-6 h-6" />
        Content Backup
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
        <p className="text-sm text-gray-300">
          Export or restore all Projects, Events, News, and Blogs data in one zip
          file.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadBackup}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-black disabled:opacity-60"
          >
            <DownloadCloud className="w-4 h-4" />
            {downloading ? "Preparing..." : "Download Backup"}
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={restoring}
            className="inline-flex items-center gap-2 rounded border border-white/20 px-4 py-2 text-white hover:bg-white/10 disabled:opacity-60"
          >
            <UploadCloud className="w-4 h-4" />
            {restoring ? "Restoring..." : "Restore from Zip"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,application/zip"
            className="hidden"
            onChange={(e) => handleRestore(e.target.files?.[0])}
          />
        </div>

        {message && <div className="text-sm text-primary">{message}</div>}
      </div>
    </div>
  );
}
