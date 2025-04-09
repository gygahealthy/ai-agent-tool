import { NextApiRequest, NextApiResponse } from "next";
import { validateMethod } from "@/utils/api-validation";
import type { Package } from "@/types/package";
import packageData from "@/data/ketnoi_packages.json";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Filter hot packages from local JSON data
    const hotPackages = packageData
      .filter((pkg) => pkg.status === 1 && pkg.tags.includes("Gói Hot"))
      .slice(0, 6);

    // Set cache control headers for browser caching
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=30");

    return res.status(200).json({
      count: hotPackages.length,
      data: hotPackages,
    });
  } catch (error) {
    console.error("[API] Error fetching homepage packages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default validateMethod(["GET"], false)(handler);
