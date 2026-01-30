import { Camera, Video, Plane, MapPin } from "lucide-react";

export type GalleryCategory = "photography" | "video" | "drone" | "maps";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  externalUrl: string;
  platform: "flickr" | "youtube" | "google-maps";
  date?: string;
  embedUrl?: string;
}

export interface MapItem {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  externalUrl: string;
}

export const galleryCategories = [
  { id: "photography" as const, label: "Still Photography", icon: Camera },
  { id: "video" as const, label: "Video Projects", icon: Video },
  { id: "drone" as const, label: "Drone Gallery", icon: Plane },
  { id: "maps" as const, label: "Maps", icon: MapPin },
];

export const galleryItems: GalleryItem[] = [
  // Still Photography
    {
    id: "wild-desert",
    category: "photography",
    title: "Wild Desert",
    location: "Palm Desert, CA",
    description: "Wildlife encounters and desert landscapes at The Living Desert Zoo & Gardens.",
    coverImage: "https://live.staticflickr.com/65535/54962401325_6c6f4dee07_6k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720330689610/",
    platform: "flickr",
    date: "Dec 2025",
  },
  {
    id: "snoqualmie-falls",
    category: "photography",
    title: "Snoqualmie Falls",
    location: "Snoqualmie, WA",
    description: "Morning hike around the falls enjoying the sights and sounds.",
    coverImage: "https://live.staticflickr.com/65535/54721679253_c9c4266eb4_3k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720330712343/",
    platform: "flickr",
    date: "August 2025",
  },
  {
    id: "canyon-hike",
    category: "photography",
    title: "Canyon Hike",
    location: "Sabino Canyon, AZ",
    description: "Trail views, rugged cliffs, and flowing streams at Sabino Canyon.",
    coverImage: "https://live.staticflickr.com/65535/54531845623_2cd383b165_4k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720326229155/",
    platform: "flickr",
    date: "Mar 2025",
  },
  {
    id: "wild-lights",
    category: "photography",
    title: "Wild Lights",
    location: "Palm Desert, CA",
    description: "Exploring and lights and sights in the desert.",
    coverImage: "https://live.staticflickr.com/65535/54239058328_feee429a3c_4k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720322884577/",
    platform: "flickr",
    date: "Apr 2025",
  },
  
  // Video Projects
  {
    id: "cove-cinematic",
    category: "video",
    title: "Cove Cinematic Aerial Views",
    location: "La Quinta, CA",
    description: "A journey through the La Quinta Cove",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    externalUrl: "https://www.youtube.com/watch?v=6mN4yCdC_v8",
    embedUrl: "https://www.youtube.com/embed/6mN4yCdC_v8?si=36zXv5Ms8XjG7Maj", // Actual Cove Cinematic video embed
    platform: "youtube",
    date: "Dec 2024",
  },
  {
    id: "pga-west",
    category: "video",
    title: "PGA WEST Pete Dye Mountain Course",
    location: "La Quinta, CA",
    description: "Life in the modern city",
    coverImage: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=600&fit=crop",
    externalUrl: "https://www.youtube.com/watch?v=oW1cTuJPDm0",
    embedUrl: "https://www.youtube.com/embed/oW1cTuJPDm0?si=mM5Ely5TIQxJVtOp", // Actual PGA WEST video embed
    platform: "youtube",
    date: "Dec 2024",
  },
  {
    id: "blue-angels",
    category: "video",
    title: "High Flying",
    location: "Bellevue, WA",
    description: "Flight of the Blue Angels",
    coverImage: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&h=600&fit=crop",
    externalUrl: "https://www.youtube.com/watch?v=Kypc2MlZtZ4",
    embedUrl: "https://www.youtube.com/embed/Kypc2MlZtZ4?si=6IGlim1jkn4xBtwe",
    platform: "youtube",
    date: "Aug 2024",
  },
  
  // Drone Gallery
  {
    id: "drone-spring-2025",
    category: "drone",
    title: "Drone & Hiking Adventure",
    location: "La Quinta, CA",
    description: "Enjoying a spring flight in the desert cove.",
    coverImage: "https://live.staticflickr.com/65535/54509376917_7bb411c76d_6k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720325965560/",
    platform: "flickr",
    date: "May 2025",
  },
  {
    id: "drone-winter-2024",
    category: "drone",
    title: "Drone & Hiking Adventure",
    location: "La Quinta, CA",
    description: "Enjoying a winter flight in the desert cove.",
    coverImage: "https://live.staticflickr.com/65535/54241433707_e136c98b55_5k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720322548419/",
    platform: "flickr",
    date: "Dec 2024",
  },
  {
    id: "drone-seattle",
    category: "drone",
    title: "Drone & Hiking Adventure",
    location: "La Quinta, CA",
    description: "Enjoying a spring flight in the desert cove.",
    coverImage: "https://live.staticflickr.com/65535/53714070596_6e41956f76_5k.jpg?w=400&fit=crop",
    externalUrl: "https://www.flickr.com/photos/adam-p-thompson/albums/72177720316803032/",
    platform: "flickr",
    date: "Summer 2024",
  },
];

export const mapItems: MapItem[] = [
  {
    id: "drone-flight-spots",
    title: "Interactive map of aerial photography locations",
    description: "Interactive map of aerial photography locations",
    embedUrl: "https://www.google.com/maps/d/embed?mid=1GU0TR2IwUfYCdSQaNiIAI82th4aBxpc&hl=en&femb=1&ll=33.64778361293961%2C-116.31455965&z=13",
    externalUrl: "https://www.google.com/maps/d/viewer?mid=1GU0TR2IwUfYCdSQaNiIAI82th4aBxpc&hl=en&femb=1&ll=33.64778361293961%2C-116.31455965&z=13",
  },
  {
    id: "hiking-trails",
    title: "Hiking Trails",
    description: "Photography trails and locations",
    embedUrl: "https://www.google.com/maps/d/embed?mid=1LBDq-vmQ6mKccxuUfRVqyDYSqHevRgk&femb=1&ll=33.65029064420975%2C-116.32070500000002&z=13",
    externalUrl: "https://www.google.com/maps/d/viewer?mid=1LBDq-vmQ6mKccxuUfRVqyDYSqHevRgk&femb=1&ll=33.65029064420975%2C-116.32070500000002&z=13",
  },
];
