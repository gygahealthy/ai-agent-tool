import {
  Article,
  ArticleSummaryFromAPI,
  StrapiListResponse,
  StrapiSingleResponse,
} from "@/types/article";
import qs from "qs"; // You'll need to install this: npm install qs @types/qs

const STRAPI_URL = process.env.NEXT_STRAPI_CMS_API_URL;
const STRAPI_TOKEN = process.env.NEXT_STRAPI_CMS_API_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error(
    "Missing Strapi URL or Token in environment variables. Please check your .env file."
  );
}

// Define a type for the generic response before parsing
type StrapiApiResponse<T> = StrapiListResponse<T> | StrapiSingleResponse<T>;

// Generic fetch function for Strapi API - return type adjusted later
async function fetchStrapiAPI(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
): Promise<any> {
  // Return any for now, specific functions will cast
  try {
    // Merge default and user options
    const mergedOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      cache: "no-store", // Adjust cache strategy as needed (e.g., 'force-cache' or revalidate time)
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    });
    const requestUrl = `${STRAPI_URL}${path}${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching Strapi:", requestUrl); // Optional: log the URL

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
      console.error("Strapi API Error Status:", response.status);
      const errorBody = await response.text(); // Read response body for more details
      console.error("Strapi API Error Body:", errorBody);
      throw new Error(`Failed to fetch Strapi API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchStrapiAPI:", error);
    // Re-throw or handle error appropriately for your application
    throw new Error(
      `An error occurred while fetching from Strapi: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

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
    fields: ["title", "description", "slug", "publishedAt"],
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
