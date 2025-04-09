// Raw package data from Firestore
export interface FirestorePackage {
  id?: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  description: string;
  commission: number;
  affiliateLink: string;
  qrCodeLink: string;
  ketnoiId: string;
  ketnoiUrl: string;
  affiliateUrl: string;
  clickId: string;
  affNetwork: string;
  status: number;
  tags: string[];
  dataVolume: string;
  displayOrder?: number;
}

// Processed package data for the application
export interface Package extends FirestorePackage {
  id: string; // Override optional id to be required
  hot: boolean; // Derived from status
  lastUpdated?: number;
  displayOrder: number; // Make displayOrder required
}

// Package detail data from ketnoi API
export interface PackageDetail {
  packageName: string;
  imageUrl: string;
  detailPricePerCycle: string;
  detailInfo: Array<{
    icon: string;
    text: string;
  }>;
  registrationConditions: string;
  affiliateUrl: string;
  clickId: string;
  affNetwork: string;
  ketnoiId: string;
}
