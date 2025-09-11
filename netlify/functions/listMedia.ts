import type { Handler } from "@netlify/functions";
import cloudinary from "cloudinary";

// Configure Cloudinary with env variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handler: Handler = async () => {
  try {
    // Fetch images and videos in parallel
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

    // Merge and format
    const mediaList = [...images.resources, ...videos.resources].map((r: any) => ({
      id: r.public_id,
      url: r.secure_url,
      type: r.resource_type, // "image" or "video"
      width: r.width,
      height: r.height,
    }));

    return { statusCode: 200, body: JSON.stringify(mediaList) };
  } catch (err: any) {
    return { statusCode: 500, body: err.message };
  }
};
