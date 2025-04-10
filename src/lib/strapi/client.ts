import qs from "qs";

const STRAPI_URL = process.env.NEXT_STRAPI_CMS_API_URL;
const STRAPI_TOKEN = process.env.NEXT_STRAPI_CMS_API_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error(
    "Missing Strapi URL or Token in environment variables. Please check your .env file."
  );
}

// Generic fetch function for Strapi API
export async function fetchStrapiAPI(
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
      cache: "no-store", // Default cache strategy
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
