import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Configuration
const CONFIG = {
  cors: {
    allowedOrigins: ["http://localhost:3000", "https://aff-mobifone5g.vercel.app"] as string[],
    methods: "GET, POST, OPTIONS",
    headers: "Content-Type, Authorization, X-API-Key",
    maxAge: "86400", // 24 hours
  },
  security: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-XSS-Protection": "1; mode=block",
      "X-DNS-Prefetch-Control": "off",
      "X-Download-Options": "noopen",
      "X-Permitted-Cross-Domain-Policies": "none",
    },
  },
} as const;

// Helper function to apply CORS headers
function applyCorsHeaders(request: NextRequest, response: NextResponse): void {
  const origin = request.headers.get("origin");
  if (origin && CONFIG.cors.allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  response.headers.set("Access-Control-Allow-Methods", CONFIG.cors.methods);
  response.headers.set("Access-Control-Allow-Headers", CONFIG.cors.headers);
  response.headers.set("Access-Control-Max-Age", CONFIG.cors.maxAge);
}

// Helper function to apply security headers
function applySecurityHeaders(response: NextResponse): void {
  Object.entries(CONFIG.security.headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply CORS headers
  applyCorsHeaders(request, response);

  // Apply security headers
  applySecurityHeaders(response);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
