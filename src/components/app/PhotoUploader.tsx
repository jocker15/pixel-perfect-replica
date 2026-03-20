import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploaderProps {
  maxPhotos?: number;
  instruction?: string;
  analyzeLabel?: string;
  onPhotosReady?: (files: File[]) => void;
  loading?: boolean;
}

export function PhotoUploader({
  maxPhotos = 3,
  instruction,
  analyzeLabel = "Анализировать",
  onPhotosReady,
  loading = false,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles).filter((f) => f.type.startsWith("image/"));
      const remaining = maxPhotos - files.length;
      const toAdd = arr.slice(0, remaining);
      if (toAdd.length === 0) return;

      const nextFiles = [...files, ...toAdd];
      setFiles(nextFiles);

      toAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    },
    [files, maxPhotos]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Instruction */}
      {instruction && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border rounded-xl p-3">
          <Camera className="w-4 h-4 text-primary shrink-0" />
          <span>{instruction}</span>
        </div>
      )}

      {/* Drop zone */}
      {files.length < maxPhotos && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-card"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={maxPhotos > 1}
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Перетащи фото сюда или нажми для загрузки
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {files.length}/{maxPhotos} фото
          </p>
        </div>
      )}

      {/* Previews */}
      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-3 flex-wrap"
          >
            {previews.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-background/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analyze button */}
      {files.length > 0 && (
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={() => onPhotosReady?.(files)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Анализируем...
            </>
          ) : (
            analyzeLabel
          )}
        </Button>
      )}
    </div>
  );
}
