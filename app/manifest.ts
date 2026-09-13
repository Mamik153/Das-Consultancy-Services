import type { MetadataRoute } from "next";
import { site } from "@/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Das",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#064fe8",
    icons: [{ src: "/favicon.ico", sizes: "16x16 32x32 48x48 256x256", type: "image/x-icon" }],
  };
}
