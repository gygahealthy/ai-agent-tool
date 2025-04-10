import { INDEXEDDB_CONFIG } from "@/constants/indexeddb";
import type { Package } from "@/types/package";
import { IDBPDatabase, deleteDB, openDB } from "idb";

export class IndexedDBSyncService {
  private static instance: IndexedDBSyncService;
  private db: IDBPDatabase | null = null;
  private readonly DB_NAME = INDEXEDDB_CONFIG.DATABASE_NAME;
  private readonly DB_VERSION = 2;

  private constructor() {}

  public static getInstance(): IndexedDBSyncService {
    if (!IndexedDBSyncService.instance) {
      IndexedDBSyncService.instance = new IndexedDBSyncService();
    }
    return IndexedDBSyncService.instance;
  }

  private async initDB() {
    if (!this.db) {
      try {
        this.db = await openDB(this.DB_NAME, this.DB_VERSION, {
          upgrade(db, oldVersion, newVersion) {
            // Create stores for packages
            if (!db.objectStoreNames.contains(INDEXEDDB_CONFIG.STORES.AI_ARTICLES)) {
              db.createObjectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLES, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES)) {
              db.createObjectStore(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES, { keyPath: "id" });
            }
            // Create store for package details
            if (!db.objectStoreNames.contains(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS)) {
              db.createObjectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS, {
                keyPath: "id",
              });
            }
          },
          blocked() {
            console.warn("Database upgrade blocked. Closing other tabs might help.");
          },
          blocking: () => {
            if (this.db) this.db.close();
          },
          terminated() {
            console.error("Database connection terminated unexpectedly.");
          },
        });
      } catch (error) {
        console.error("Failed to initialize database:", error);
        await this.recreateDatabase();
        throw error;
      }
    }
    return this.db;
  }

  private async deleteDatabase(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    await deleteDB(this.DB_NAME);
  }

  private async recreateDatabase(): Promise<void> {
    try {
      await this.deleteDatabase();
      await this.initDB();
    } catch (error) {
      console.error("Failed to recreate database:", error);
      throw error;
    }
  }

  private async handleDatabaseError(error: any): Promise<void> {
    if (
      error.name === "VersionError" ||
      error.name === "NotFoundError" ||
      (error.message &&
        error.message.includes("object store") &&
        error.message.includes("not found"))
    ) {
      console.warn("Database schema mismatch detected, recreating database...");
      await this.recreateDatabase();
    } else {
      throw error;
    }
  }

  public async checkAndSyncMetadata(): Promise<boolean> {
    try {
      await this.initDB();
      return true;
    } catch (error) {
      console.error("Error during database initialization:", error);
      try {
        await this.handleDatabaseError(error);
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  // Package operations with error handling
  public async savePackages(packages: Package[]): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.AI_ARTICLES, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLES);

      await store.clear();
      for (const pkg of packages) {
        await store.add({
          ...pkg,
          lastUpdated: Date.now(),
        });
      }
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.AI_ARTICLES, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLES);

      await store.clear();
      for (const pkg of packages) {
        await store.add({
          ...pkg,
          lastUpdated: Date.now(),
        });
      }
    }
  }

  public async getPackages(): Promise<Package[]> {
    try {
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.AI_ARTICLES);
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.AI_ARTICLES);
    }
  }

  public async saveHomepagePackages(packages: Package[]): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES);

      await store.clear();
      for (const pkg of packages) {
        await store.add({
          ...pkg,
          lastUpdated: Date.now(),
        });
      }
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES);

      await store.clear();
      for (const pkg of packages) {
        await store.add({
          ...pkg,
          lastUpdated: Date.now(),
        });
      }
    }
  }

  public async getHomepagePackages(): Promise<Package[]> {
    try {
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES);
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.HOMEPAGE_AI_ARTICLES);
    }
  }

  // Package details operations with error handling
  public async savePackageDetails(details: any[]): Promise<void> {
    try {
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS);

      await store.clear();
      for (const detail of details) {
        await store.add({
          ...detail,
          lastUpdated: Date.now(),
        });
      }
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      const tx = db.transaction(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS, "readwrite");
      const store = tx.objectStore(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS);

      await store.clear();
      for (const detail of details) {
        await store.add({
          ...detail,
          lastUpdated: Date.now(),
        });
      }
    }
  }

  public async getPackageDetails(): Promise<any[]> {
    try {
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS);
    } catch (error) {
      await this.handleDatabaseError(error);
      // Retry once after database recreation
      const db = await this.initDB();
      return db.getAll(INDEXEDDB_CONFIG.STORES.AI_ARTICLE_DETAILS);
    }
  }
}

// Hook for using IndexedDB sync service
export function useIndexedDBSync() {
  const service = IndexedDBSyncService.getInstance();

  return {
    checkAndSync: () => service.checkAndSyncMetadata(),
    savePackages: (packages: Package[]) => service.savePackages(packages),
    getPackages: () => service.getPackages(),
    saveHomepagePackages: (packages: Package[]) => service.saveHomepagePackages(packages),
    getHomepagePackages: () => service.getHomepagePackages(),
    savePackageDetails: (details: any[]) => service.savePackageDetails(details),
    getPackageDetails: () => service.getPackageDetails(),
  };
}
