# Media Gallery Setup

## Adding Your Own Media Files

To add your own images and videos to the gallery:

### Images

1. Put your image files in: `public/media/images/`
2. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
3. Files will be automatically detected and displayed

### Videos

1. Put your video files in: `public/media/videos/`
2. Supported formats: `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`
3. Files will be automatically detected and displayed

### How it Works

- The gallery automatically scans the `public/media/` folders on startup
- File names are used as titles (underscores and dashes become spaces)
- If no local files are found, sample images are shown as placeholders
- Just drop files in the folders and refresh the page!

### Example Structure

```
public/
  media/
    images/
      sunset_beach.jpg
      mountain-landscape.png
      city_skyline.webp
    videos/
      ocean_waves.mp4
      forest_timelapse.mov
      rain_drops.webm
```

### Tips

- Use descriptive filenames - they become the media titles
- Keep file sizes reasonable for web loading
- Supported video formats work best: MP4, WebM
- Images are automatically responsive in the grid layout
