import type { NextApiRequest, NextApiResponse } from "next";
import { validateMethod } from "@/utils/api-validation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Return no changes by default since service is removed
  res.setHeader("Cache-Control", "public, max-age=10");
  res.status(200).json({ changes: false });
}

export default validateMethod(["GET"], false)(handler);
