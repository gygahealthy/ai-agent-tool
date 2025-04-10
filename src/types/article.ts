// Base Strapi Response for a LIST of items
export interface StrapiListResponse<T> {
  data: T[]; // Data is always an array for list responses
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Base Strapi Response for a SINGLE item
export interface StrapiSingleResponse<T> {
  data: T | null; // Data can be the item or null if not found/no access
  meta?: {}; // Single responses might not have pagination meta
}

// Strapi Data Object Structure
export interface StrapiDataObject<T> {
  id: number;
  attributes: T;
}

// Media Format Details
export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Media Attributes
export interface MediaAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null; // Adjust if known structure
  createdAt: string;
  updatedAt: string;
}

// RELATIONAL TYPES (using StrapiDataObject Structure)

// Relation to a single Media item
export interface SingleMediaRelation {
  data: StrapiDataObject<MediaAttributes> | null;
}

// Relation to multiple Media items
export interface MultipleMediaRelation {
  data: StrapiDataObject<MediaAttributes>[] | null;
}

// Author Attributes
export interface AuthorAttributes {
  name: string;
  // Add other author fields if needed (e.g., bio, avatar)
  // avatar?: SingleMediaRelation;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Relation to a single Author
export interface AuthorRelation {
  data: StrapiDataObject<AuthorAttributes> | null;
}

// Category Attributes
export interface CategoryAttributes {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Relation to a single Category
export interface CategoryRelation {
  data: StrapiDataObject<CategoryAttributes> | null;
}

// Dynamic Zone Block Types (Define based on your Strapi components)
// Use relational types where appropriate
export interface MediaBlock {
  __component: "blocks.media";
  id: number;
  file: SingleMediaRelation; // Use Relation type
}

export interface QuoteBlock {
  __component: "blocks.quote";
  id: number;
  text: string;
  author: string | null;
}

export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

export interface SliderBlock {
  __component: "blocks.slider";
  id: number;
  images: MultipleMediaRelation; // Use Relation type
}

// Union type for all possible blocks in the 'blocks' dynamic zone
export type ArticleBlock = MediaBlock | QuoteBlock | RichTextBlock | SliderBlock;

// Flat Article Type - reflecting the actual API response structure for single article fetches
// Includes populated relations and blocks based on fetchArticleBySlug query
export interface Article {
  id: number;
  documentId?: string; // Optional field seen in logs
  title: string;
  description: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Update cover to be the direct media object or null
  cover: MediaAttributes | null;
  author: AuthorRelation | null;
  category: CategoryRelation | null;
  blocks: ArticleBlock[]; // Dynamic Zone
  coverUrl?: string | null; // Add the optional coverUrl field
}

// DEPRECATED - Remove the old Article type definition that used StrapiDataObject
// export interface ArticleAttributes { ... };
// export type Article = StrapiDataObject<ArticleAttributes>;

// TYPE FOR THE ACTUAL STRUCTURE RETURNED BY fetchBlogIndexArticles
// This matches the structure observed in the console logs.
export interface ArticleSummaryFromAPI {
  id: number;
  documentId?: string;
  title: string;
  description: string | null;
  slug: string;
  publishedAt: string;
  // Update cover to include formats (optional thumbnail)
  coverUrl: string | null;
  cover: {
    id: number; // Assuming cover object has an ID if populated
    url: string;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
    formats?: {
      // Add formats as optional
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
      // Add other formats (small, medium, large) if needed
    };
  } | null;
  category: {
    id: number;
    documentId?: string;
    name: string;
    slug: string;
  } | null;
  author: {
    id: number;
    documentId?: string;
    name: string;
  } | null;
}

// DEPRECATED - Remove the old summary type based on StrapiDataObject
// export interface ArticleSummaryAttributes { ... };
// export type ArticleSummaryData = StrapiDataObject<ArticleSummaryAttributes>;
