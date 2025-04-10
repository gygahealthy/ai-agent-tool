// src/lib/strapi/fetchHomepageInfo.ts
import { ArticleSummaryFromAPI, StrapiListResponse } from "@/types/article";
import { fetchStrapiAPI } from "./client"; // Import the shared fetch function

/**
 * Fetches the latest 3 articles specifically for the homepage blog section.
 * Populates fields needed for the BlogSection component.
 */
export async function fetchHomepageBlogPosts(): Promise<StrapiListResponse<ArticleSummaryFromAPI>> {
  const queryParams = {
    fields: ["title", "slug", "publishedAt", "coverUrl"], // Select necessary top-level fields
    populate: {
      cover: {
        // Populate cover with formats for thumbnail
        fields: ["url", "alternativeText", "width", "height", "formats"],
      },
      category: {
        // Populate category name
        fields: ["name"],
      },
      // Do not populate author or blocks if not needed for this section
    },
    sort: ["publishedAt:desc"], // Get the latest posts
    pagination: {
      pageSize: 3, // Limit to 3 posts
      page: 1,
    },
  };

  // Use correct relative path: /articles
  return fetchStrapiAPI("/articles", queryParams) as Promise<
    StrapiListResponse<ArticleSummaryFromAPI>
  >;
}

// Add other homepage-specific fetch functions here later if needed...
