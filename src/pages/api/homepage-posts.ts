// src/pages/api/homepage-posts.ts
import { fetchHomepageBlogPosts } from "@/lib/strapi/fetchHomepageInfo";
import { ArticleSummaryFromAPI } from "@/types/article";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  posts?: ArticleSummaryFromAPI[];
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    // fetchHomepageBlogPosts runs on the server here, accessing env vars securely
    const strapiResponse = await fetchHomepageBlogPosts();
    res.status(200).json({ posts: strapiResponse.data || [] });
  } catch (error) {
    console.error("API route error fetching homepage posts:", error);
    // Don't expose detailed errors to the client
    res.status(500).json({ message: "Internal Server Error fetching posts" });
  }
}
