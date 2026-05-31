import type { MetadataRoute } from "next";
import { geoRobotsTemplate } from "@/lib/robots-template";

export default function robots(): MetadataRoute.Robots {
  return geoRobotsTemplate;
}
