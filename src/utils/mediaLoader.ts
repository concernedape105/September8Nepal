import { type MediaItem } from "../types/media";

export const loadLocalMedia = async (): Promise<MediaItem[]> => {
  const imageModules = import.meta.glob("../assets/images/*.{jpg,jpeg,png,gif,webp}", {
    query: "?url",
    import: "default",
  });
  const videoModules = import.meta.glob("../assets/videos/*.{mp4,webm,ogg}", { query: "?url", import: "default" });

  const items: MediaItem[] = [];

  // Images
  for (const path in imageModules) {
    const url = await imageModules[path]();
    const filename = path.split("/").pop()!;
    items.push({
      id: `img-${filename}`,
      type: "image",
      src: url as string,
      title: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      description: `Local image: ${filename}`,
      author: "Local User",
      date: new Date().toLocaleDateString(),
      tags: ["local", "image"],
      likes: Math.floor(Math.random() * 50) + 10,
      width: 400,
      height: 300,
    });
  }

  // Videos
  for (const path in videoModules) {
    const url = await videoModules[path]();
    const filename = path.split("/").pop()!;
    items.push({
      id: `vid-${filename}`,
      type: "video",
      src: url as string,
      title: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      description: `Local video: ${filename}`,
      author: "Local User",
      date: new Date().toLocaleDateString(),
      tags: ["local", "video"],
      likes: Math.floor(Math.random() * 30) + 5,
      width: 400,
      height: 300,
    });
  }

  return items;
};
