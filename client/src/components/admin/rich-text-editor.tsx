import React, { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

// Lightweight contenteditable-based editor with a minimal formatting toolbar.
export function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = "Start writing...",
  className,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const applyFormat = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleInput = () => {
    const html = editorRef.current?.innerHTML || "";
    const cleaned = html === "<br>" ? "" : html;
    onChange(cleaned);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-semibold">{label}</label>}

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <ToolbarButton
          icon={Heading1}
          label="H1"
          onClick={() => applyFormat("formatBlock", "<h2>")}
        />
        <ToolbarButton
          icon={Heading2}
          label="H2"
          onClick={() => applyFormat("formatBlock", "<h3>")}
        />
        <ToolbarButton
          icon={Bold}
          label="Bold"
          onClick={() => applyFormat("bold")}
        />
        <ToolbarButton
          icon={Italic}
          label="Italic"
          onClick={() => applyFormat("italic")}
        />
        <ToolbarButton
          icon={Underline}
          label="Underline"
          onClick={() => applyFormat("underline")}
        />
        <ToolbarButton
          icon={List}
          label="Bullets"
          onClick={() => applyFormat("insertUnorderedList")}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered"
          onClick={() => applyFormat("insertOrderedList")}
        />
        <ToolbarButton
          icon={Quote}
          label="Quote"
          onClick={() => applyFormat("formatBlock", "<blockquote>")}
        />
        <ToolbarButton icon={Undo} label="Undo" onClick={() => applyFormat("undo")} />
        <ToolbarButton icon={Redo} label="Redo" onClick={() => applyFormat("redo")} />
      </div>

      <div className="relative">
        <div
          ref={editorRef}
          className="min-h-[160px] w-full rounded border border-white/10 bg-black/40 p-3 text-sm leading-relaxed focus-within:ring-2 focus-within:ring-primary/60 focus:outline-none"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
        />
        {!value?.trim() && (
          <div className="pointer-events-none absolute left-3 top-3 text-xs text-gray-500">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}

function ToolbarButton({ icon: Icon, label, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-white hover:bg-white/10"
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
