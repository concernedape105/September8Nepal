export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string[];
  likes: number;
  width: number;
  height: number;
}
