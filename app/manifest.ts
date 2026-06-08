import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NuPtechs",
    short_name: "NuPtechs",
    description:
      "Engenharia de software para infraestrutura empresarial e setor público brasileiro.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0f13",
    theme_color: "#6c5ce7",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
