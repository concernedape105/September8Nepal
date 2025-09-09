import { useState, useEffect } from "react";
import { X, Play, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaItem } from "./types/media";
import { loadLocalMedia } from "./utils/mediaLoader";
import JSZip from "jszip";

export function MasonryGallery() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load media files on component mount
  useEffect(() => {
    const loadMedia = async () => {
      try {
        const localMedia = await loadLocalMedia();

        if (localMedia.length > 0) {
          setMediaItems(localMedia);
        } else {
          // Fallback to sample media if no local files
        }
      } catch (error) {
        console.log("Error loading media, using sample data:", error);
      }
    };

    loadMedia();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;

      switch (e.key) {
        case "Escape":
          setSelectedItem(null);
          break;
        case "ArrowLeft":
          navigateToItem(currentIndex - 1);
          break;
        case "ArrowRight":
          navigateToItem(currentIndex + 1);
          break;
        case " ":
          e.preventDefault();
          // Space key functionality removed - video controls handle play/pause
          break;
      }
    };

    if (selectedItem) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedItem, currentIndex]);

  const openLightbox = (item: MediaItem) => {
    const index = mediaItems.findIndex((media) => media.id === item.id);
    setCurrentIndex(index);
    setSelectedItem(item);
  };

  const navigateToItem = (index: number) => {
    if (index < 0 || index >= mediaItems.length) return;
    setCurrentIndex(index);
    setSelectedItem(mediaItems[index]);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };
  // Inside your MasonryGallery component

  const handleDownloadAll = async () => {
    const zip = new JSZip();

    await Promise.all(
      mediaItems.map(async (item) => {
        try {
          const response = await fetch(item.src);
          const blob = await response.blob();
          const ext = item.type === "image" ? ".jpg" : ".mp4";
          zip.file(item.title.replace(/\s+/g, "_").toLowerCase() + ext, blob);
        } catch (e) {
          // Optionally handle errors for individual files
        }
      })
    );

    const content = await zip.generateAsync({ type: "blob" });

    // Trigger download without file-saver
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "media_collection.zip";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  return (
    <>
      <aside
        className="top-0 left-0 z-50 fixed bg-red-500 py-2 w-full text-white text-center"
        role="status"
        aria-live="polite"
      >
        ⚠️ Urgent: Major hospitals, including Civil Hospital, have run out of blood collection equipment. Please donate
        blood at your nearest blood bank to help save lives.
      </aside>
      <div className="flex justify-center my-6">
        <Button onClick={handleDownloadAll}>Download All Files as ZIP</Button>
      </div>
      {/* Masonry Grid */}
      <div className="gap-4 space-y-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {mediaItems.map((item) => (
          <div key={item.id} className="rounded-xl cursor-pointer" onClick={() => openLightbox(item)}>
            {item.type === "video" ? (
              <div className="relative">
                <span className="top-1/2 left-1/2 z-50 absolute flex justify-center items-center bg-black/70 rounded-full w-14 h-14 -translate-x-1/2 -translate-y-1/2">
                  <Play className="w-7 h-7 text-white" fill="currentColor" />
                </span>

                <video src={item.src} className="rounded-xl w-full h-auto object-cover" muted preload="metadata" />
              </div>
            ) : (
              <img src={item.src} alt={item.title} className="rounded-xl w-full h-auto object-cover" loading="lazy" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="z-50 fixed inset-0 flex bg-black/90 backdrop-blur-sm h-screen">
          <div className="absolute inset-0 flex flex-col h-full min-h-0">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="top-4 right-4 z-10 absolute rounded-full text-black"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="top-1/2 left-4 z-10 absolute bg-black/30 disabled:opacity-30 rounded-full w-12 h-12 text-white -translate-y-1/2"
              onClick={() => navigateToItem(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="top-1/2 right-4 z-10 absolute bg-black/30 disabled:opacity-30 rounded-full w-12 h-12 text-white -translate-y-1/2"
              onClick={() => navigateToItem(currentIndex + 1)}
              disabled={currentIndex === mediaItems.length - 1}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 justify-center items-center p-4 pb-0 min-h-0 overflow-hidden">
              <div className="flex justify-center w-full h-full min-h-0 overflow-hidden">
                {/* Media Display */}
                <div className="relative flex flex-1 justify-center items-center bg-black rounded-lg h-full min-h-0 overflow-hidden">
                  {selectedItem.type === "image" ? (
                    <img
                      src={selectedItem.src || "/placeholder.svg"}
                      alt={selectedItem.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <video
                      src={selectedItem.src}
                      className="w-full h-full object-contain"
                      controls
                      controlsList="download"
                      autoPlay
                      muted
                      loop
                      preload="metadata"
                      style={{ outline: "none" }}
                    />
                  )}
                </div>
                {/* Metadata Panel */}
                <div className="flex flex-col bg-popover p-6 rounded-lg w-full lg:w-80 h-full overflow-auto text-popover-foreground">
                  <div className="flex flex-col flex-1 space-y-4 break-words">
                    <div>
                      <h2 className="mb-2 font-bold text-xl text-wrap">{selectedItem.title}</h2>

                      <div className="mb-2 text-muted-foreground text-xs">
                        <span>
                          Type: <span className="font-medium">{selectedItem.type === "image" ? "Photo" : "Video"}</span>
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          Resolution: {selectedItem.width}×{selectedItem.height}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a
                          href={selectedItem.src}
                          download={
                            selectedItem.title.replace(/\s+/g, "_").toLowerCase() +
                            (selectedItem.type === "image" ? ".jpg" : ".mp4")
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-1 w-4 h-4" />
                          Download {selectedItem.type === "image" ? "Image" : "Video"}
                        </a>
                      </Button>
                    </div>
                    <div className="mt-4 pt-2 border-t border-border text-muted-foreground text-xs">
                      <p>
                        Item {currentIndex + 1} of {mediaItems.length}
                      </p>
                      <p className="mt-1">Press ESC to close • Use arrow keys to navigate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview Strip */}
            <div className="flex-0 bg-black/50 backdrop-blur-sm p-4 h-full">
              <div className="flex justify-center items-center">
                <div className="flex gap-2 pb-2 max-w-full overflow-x-auto">
                  {mediaItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => navigateToItem(index)}
                      className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentIndex
                          ? "ring-2 ring-white opacity-100 scale-110"
                          : "opacity-60 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={item.type === "video" ? item.thumbnail || item.src : item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                          <Play className="w-4 h-4 text-white" fill="currentColor" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
