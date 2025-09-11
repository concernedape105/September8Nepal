import type { VercelRequest, VercelResponse } from "@vercel/node";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const [images, videos] = await Promise.all([
      cloudinary.v2.api.resources({
        type: "upload",
        resource_type: "image",
        max_results: 100,
      }),
      cloudinary.v2.api.resources({
        type: "upload",
        resource_type: "video",
        max_results: 100,
      }),
    ]);

    const mediaList = [...images.resources, ...videos.resources].map((r: any) => ({
      id: r.public_id,
      url: r.secure_url,
      type: r.resource_type,
      width: r.width,
      height: r.height,
    }));

    res.status(200).json(mediaList);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
