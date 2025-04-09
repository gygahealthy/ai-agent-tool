//=============================================================================
// Debug Sync API Handler
//=============================================================================

import { NextApiRequest, NextApiResponse } from "next";
import { validateMethod } from "@/utils/api-validation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set no-cache headers since this is a debug endpoint
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.status(200).json({
    message: "Debug sync endpoint disabled - ServerPackageSyncService removed",
  });
}

export default validateMethod(["GET"], false)(handler);
