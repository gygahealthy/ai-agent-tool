# MobiFone Data Package Affiliate Site

## Architecture Overview

### Data Flow Architecture

The application uses a multi-layer caching strategy to optimize performance and reduce Firestore reads:

```
[Firestore] → [Redis/KV] → [IndexedDB] → [UI Components]
    ↑             ↑            ↑              ↑
Database     Server Cache   Browser Cache    React
```

### Components

1. **Server-side (`src/services/packageService.ts`)**:

   - Handles direct Firestore database access
   - Manages Redis/Vercel KV caching
   - Processes and validates data
   - Exposes API endpoints for client consumption
   - Runs periodic sync (every 5 minutes) to check for updates

2. **Client-side Web Worker (`src/workers/packageWorker.ts`)**:
   - Runs in a separate browser thread
   - Manages IndexedDB for offline storage
   - Periodically checks for updates (every minute)
   - Handles client-side caching
   - Prevents UI blocking during data operations

### Data Flow Process

1. **Firestore to Redis**:

   - ServerPackageSyncService checks Firestore for package updates
   - Data is transformed and validated
   - Cached in Redis with a 24-hour TTL
   - Changes are tracked for incremental updates

2. **Redis to IndexedDB**:

   - Web Worker polls API endpoints for changes
   - New data is stored in IndexedDB
   - Maintains offline capability
   - Handles data versioning

3. **IndexedDB to UI**:
   - React components use usePackages hook
   - Fast access to cached data
   - Real-time updates when changes occur
   - Offline-first approach

### Benefits

- Minimal Firestore reads (server-side only)
- Fast local access through IndexedDB
- Offline capability
- Real-time updates
- Non-blocking UI operations
- Efficient change tracking

### API Endpoints

- `/api/packages/cache`: Returns current package data
- `/api/packages/changes`: Returns recent changes since last sync

### Package Data Structure

```typescript
interface Package {
  id: string;
  name: string;
  price: number;
  duration: number;
  data: string;
  calls?: string;
  features: string[];
  hot: boolean;
  lastUpdated?: number;
  affiliateLink?: string;
  qrCodeLink?: string;
  ketnoiId?: string;
  ketnoiUrl?: string;
  type?: string;
  description?: string;
}
```

## Development

### Environment Variables

Required environment variables:

```env
# Vercel KV (Redis)
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Firebase
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_API_KEY=
```

### Local Development

```bash
npm install
npm run dev
```

### Debug Panel

In development mode, a debug panel is available showing:

- Package count
- Last sync time
- Worker status
- Cache operations
