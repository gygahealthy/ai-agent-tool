import { NextApiRequest, NextApiResponse } from "next";

export type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

const validateApiKey = (req: NextApiRequest): boolean => {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    console.error("API_KEY is not set in environment variables");
    return false;
  }

  return apiKey === validApiKey;
};

export function validateMethod(methods: string[], requireApiKey: boolean = false) {
  return (handler: ApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      if (!methods.includes(req.method || "")) {
        return res.status(405).json({
          error: "Method not allowed",
          allowedMethods: methods,
        });
      }

      // API Key validation for protected endpoints
      if (requireApiKey && !validateApiKey(req)) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Invalid or missing API key",
        });
      }

      // Basic request validation
      const contentType = req.headers["content-type"];
      if (req.method !== "GET" && (!contentType || !contentType.includes("application/json"))) {
        return res.status(400).json({
          error: "Invalid content type",
          message: "Content-Type must be application/json",
        });
      }

      // Validate request size (10MB limit)
      const contentLength = parseInt(req.headers["content-length"] || "0", 10);
      if (contentLength > 10 * 1024 * 1024) {
        return res.status(413).json({
          error: "Payload too large",
          message: "Request body must not exceed 10MB",
        });
      }

      try {
        return await handler(req, res);
      } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({
          error: "Internal server error",
          message: "Something went wrong",
        });
      }
    };
  };
}
