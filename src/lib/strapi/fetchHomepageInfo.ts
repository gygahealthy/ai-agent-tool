// src/lib/strapi/fetchHomepageInfo.ts
import { ArticleSummaryFromAPI, StrapiListResponse } from "@/types/article";
import qs from "qs";

const STRAPI_URL = process.env.NEXT_STRAPI_CMS_API_URL;
const STRAPI_TOKEN = process.env.NEXT_STRAPI_CMS_API_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error(
    "Missing Strapi URL or Token in environment variables. Please check your .env file."
  );
}

// NOTE: This base fetch function is duplicated from fetchAiArticles.ts
// Consider moving it to a shared utility file if complexity grows.
async function fetchStrapiAPI(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<any> {
  try {
    const mergedOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      cache: "no-store",
      ...options,
    };
    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching Strapi (Homepage Info):", requestUrl);
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error("Strapi API Error Status:", response.status);
      const errorBody = await response.text();
      console.error("Strapi API Error Body:", errorBody);
      throw new Error(`Failed to fetch Strapi API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchStrapiAPI (Homepage Info):", error);
    throw new Error(
      `An error occurred while fetching from Strapi: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Fetches the latest 3 articles specifically for the homepage blog section.
 * Populates fields needed for the BlogSection component.
 */
export async function fetchHomepageBlogPosts(): Promise<StrapiListResponse<ArticleSummaryFromAPI>> {
  const queryParams = {
    fields: ["title", "slug", "publishedAt"], // Select necessary top-level fields
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
