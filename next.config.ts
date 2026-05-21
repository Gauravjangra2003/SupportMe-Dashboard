import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // React Compiler adds compile time in dev; keep it for production builds.
  reactCompiler: process.env.NODE_ENV === "production",
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
