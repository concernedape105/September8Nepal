export type CloudinaryMedia = {
  id: string;
  url: string;
  type: "image" | "video" | "raw";
  width: number;
  height: number;
};

export const loadCloudinaryMedia = async (): Promise<CloudinaryMedia[]> => {
  const res = await fetch("/.netlify/functions/listMedia");
  if (!res.ok) {
    throw new Error("Failed to fetch media");
  }
  return (await res.json()) as CloudinaryMedia[];
};
