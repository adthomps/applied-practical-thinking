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
    id: "snoqualmie-falls",
    category: "photography",
    title: "Snoqualmie Falls",
    location: "Snoqualmie, WA",
    description: "Morning hike around the falls enjoying the sights and sounds.",
    coverImage: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
  },
  {
    id: "wild-desert",
    category: "photography",
    title: "Wild Desert",
    location: "Palm Desert, CA",
    description: "Wildlife encounters and desert landscapes at The Living Desert Zoo & Gardens.",
    coverImage: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
  },
  {
    id: "canyon-hike",
    category: "photography",
    title: "Canyon Hike",
    location: "Sabino Canyon, AZ",
    description: "Trail views, rugged cliffs, and flowing streams at Sabino Canyon.",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
  },
  {
    id: "botanical-gardens",
    category: "photography",
    title: "Botanical Gardens",
    location: "Bellevue, WA",
    description: "Seasonal blooms and garden landscapes at the Bellevue Botanical Garden.",
    coverImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
  },
  
  // Video Projects
  {
    id: "cove-cinematic",
    category: "video",
    title: "Cove Cinematic Aerial Views",
    location: "La Quinta, CA",
    description: "A journey through the La Quinta Cove",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    externalUrl: "https://www.youtube.com/@appliedpracticalthinking",
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
    externalUrl: "https://www.youtube.com/@appliedpracticalthinking",
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
    externalUrl: "https://www.youtube.com/@appliedpracticalthinking",
    platform: "youtube",
    date: "Aug 2024",
  },
  
  // Drone Gallery
  {
    id: "drone-spring-2025",
    category: "drone",
    title: "May 2025 - Drone & Hiking Adventure",
    location: "La Quinta, CA",
    description: "Enjoying a spring flight in the desert cove.",
    coverImage: "https://images.unsplash.com/photo-1473776460488-750c3c47bb68?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
    date: "May 2025",
  },
  {
    id: "drone-winter-2024",
    category: "drone",
    title: "Dec 2024 - Drone & Hiking Adventure",
    location: "La Quinta, CA",
    description: "Enjoying a winter flight in the desert cove.",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
    date: "Dec 2024",
  },
  {
    id: "drone-seattle",
    category: "drone",
    title: "Pacific Northwest Aerials",
    location: "Seattle, WA",
    description: "Aerial perspectives of the Puget Sound region.",
    coverImage: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=800&h=600&fit=crop",
    externalUrl: "https://www.flickr.com/photos/appliedpracticalthinking/albums",
    platform: "flickr",
    date: "Summer 2024",
  },
];

export const mapItems: MapItem[] = [
  {
    id: "drone-flight-spots",
    title: "Drone Flight Locations",
    description: "Interactive map of aerial photography locations",
    embedUrl: "https://www.google.com/maps/d/embed?mid=1example",
    externalUrl: "https://www.google.com/maps/d/viewer?mid=1example",
  },
  {
    id: "hiking-trails",
    title: "Hiking Trails",
    description: "Photography trails and locations",
    embedUrl: "https://www.google.com/maps/d/embed?mid=2example",
    externalUrl: "https://www.google.com/maps/d/viewer?mid=2example",
  },
];
