import { Article, StrapiListResponse } from "@/types/article";
import { fetchStrapiAPI } from "./client";

/**
 * Fetches a single article by its slug for the detail page.
 * Expects a list response (Strapi filtering returns an array) containing the flat Article type.
 */
export async function fetchArticleBySlug(slug: string): Promise<StrapiListResponse<Article>> {
  const queryParams = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      cover: {
        fields: ["url", "alternativeText", "width", "height", "caption"],
      },
      author: {
        fields: ["name"],
      },
      category: {
        fields: ["name", "slug"],
      },
      // Re-enable blocks population using the correct nested syntax
      blocks: {
        populate: "*", // Populate all fields/relations 1 level deep inside each block component
      },
    },
    pagination: {
      pageSize: 1,
      page: 1,
    },
  };

  // The response data array will contain objects matching the flat Article type
  return fetchStrapiAPI("/articles", queryParams) as Promise<StrapiListResponse<Article>>;
}
