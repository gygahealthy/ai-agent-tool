import {
  // Article, // Removed as fetchArticleBySlug was moved
  ArticleSummaryFromAPI,
  StrapiListResponse,
} from "@/types/article";
import { fetchStrapiAPI } from "./client"; // Import the shared fetch function

/**
 * Fetches the latest 6 articles for the homepage.
 * Expects a list response with the flat ArticleSummaryFromAPI structure.
 */
export async function fetchHomepageArticles(): Promise<StrapiListResponse<ArticleSummaryFromAPI>> {
  const queryParams = {
    fields: ["title", "description", "slug", "publishedAt"],
    populate: {
      cover: {
        fields: ["url", "alternativeText"],
      },
      category: {
        fields: ["name", "slug"],
      },
    },
    sort: ["publishedAt:desc"],
    pagination: {
      pageSize: 6,
      page: 1,
    },
  };
  // Use correct relative path: /articles
  return fetchStrapiAPI("/articles", queryParams) as Promise<
    StrapiListResponse<ArticleSummaryFromAPI>
  >;
}

/**
 * Fetches articles for the blog index page with pagination.
 * Expects a list response with the flat ArticleSummaryFromAPI structure.
 */
export async function fetchBlogIndexArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<StrapiListResponse<ArticleSummaryFromAPI>> {
  const queryParams = {
    fields: ["title", "description", "slug", "publishedAt", "coverUrl"],
    populate: {
      cover: {
        fields: ["url", "alternativeText", "width", "height", "formats"],
      },
      category: {
        fields: ["name", "slug"],
      },
      author: {
        fields: ["name"],
      },
    },
    sort: ["publishedAt:desc"],
    pagination: {
      pageSize: pageSize,
      page: page,
    },
  };
  // Use correct relative path: /articles
  return fetchStrapiAPI(
    "/articles", // Changed from /ai-articles
    queryParams
  ) as Promise<StrapiListResponse<ArticleSummaryFromAPI>>;
}

/**
 * Fetches only the slugs of all published articles.
 * Handles pagination to retrieve all slugs if there are many articles.
 */
export async function fetchAllArticleSlugs(): Promise<string[]> {
  let allSlugs: string[] = [];
  let page = 1;
  let totalPages = 1; // Assume at least one page initially
  const pageSize = 100; // Fetch slugs in batches of 100

  console.log("Fetching all article slugs...");

  try {
    do {
      const queryParams = {
        fields: ["slug"], // Only fetch the slug field
        pagination: {
          pageSize: pageSize,
          page: page,
        },
        // Optionally filter by publication status if needed (e.g., only published)
        // filters: {
        //   publishedAt: { $notNull: true },
        // },
      };

      // Use relative path: /ai-articles
      const response = (await fetchStrapiAPI("/articles", queryParams)) as StrapiListResponse<{
        slug: string;
      }>;

      if (response.data && response.data.length > 0) {
        // Map slugs based on the assumed flat structure
        // If it returns { id, attributes: { slug } }, use: item.attributes.slug
        const slugsFromPage = response.data.map((item: { slug: string }) => item.slug);
        allSlugs = allSlugs.concat(slugsFromPage);
      }

      // Update total pages based on the first response
      if (page === 1 && response.meta?.pagination) {
        totalPages = response.meta.pagination.pageCount;
      }

      page++;
    } while (page <= totalPages);

    console.log(`Fetched a total of ${allSlugs.length} slugs.`);
    return allSlugs;
  } catch (error) {
    console.error("Error fetching all article slugs:", error);
    // Depending on desired behavior, could return empty array or re-throw
    return [];
  }
}
