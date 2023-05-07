/**
 * DE - EU: Frankfurt, DE
 *
 * LA - NA: Los Angeles, CA
 *
 * NY - NA: New York City, NY
 *
 * SG - Asia: Singapore 2, SG
 */
export type Region = "DE" | "LA" | "NY" | "SG";

/**
 * DE - EU: Frankfurt, DE
 *
 * LA - NA: Los Angeles, CA
 *
 * NY - NA: New York City, NY
 *
 * SG - Asia: Singapore 2, SG
 *
 * SYG - OC: Sydney, SYD
 */
export type ReplicationRegion = "DE" | "LA" | "NY" | "SG" | "SYD";

/**
 * São Paulo, BR: br.storage.bunnycdn.com
 *
 * Johannesburg, SA: jh.storage.bunnycdn.com
 *
 * Los Angeles, US: la.storage.bunnycdn.com
 *
 * New York, US: ny.storage.bunnycdn.com
 *
 * Stockholm, SE: se.storage.bunnycdn.com
 *
 * Singapore, SG: sg.storage.bunnycdn.com
 *
 * Falkenstein, DE: storage.bunnycdn.com
 *
 * London, UK: uk.storage.bunnycdn.com
 */
export type StorageHostname =
  | "br.storage.bunnycdn.com"
  | "jh.storage.bunnycdn.com"
  | "la.storage.bunnycdn.com"
  | "ny.storage.bunnycdn.com"
  | "se.storage.bunnycdn.com"
  | "sg.storage.bunnycdn.com"
  | "storage.bunnycdn.com"
  | "uk.storage.bunnycdn.com";

/* eslint-enable @typescript-eslint/naming-convention */

/**
 * 0 - Standard
 *
 * 1 - Edge (SSD)
 */
export type ZoneTier = 0 | 1;
// TODO
export interface StorageZone {
  // TODO: confirm path
  /**
   * custom file path in storage zone to return when encountering 404 Not Found http errors
   * @example "/my-partial/url/404.html"
   */
  Custom404FilePath: string | null;
  /**
   * Last modified ISO 8601 date of the storage zone
   * @example "2023-04-28T02:23:47.7909075Z"
   */
  DateModified: string;
  /**
   * Is storage zone deleted
   * @example false
   */
  Deleted: boolean;
  /**
   * @example 0
   */
  Discount: number;
  // TODO
  /**
   * number of files stored in the storage zone
   */
  FilesStored: number;
  /**
   * Storage zone id
   * @example 270284
   */
  Id: number;
  /**
   * Storage zone name
   * @example "example-storage-0"
   */
  Name: string;
  /**
   * Storage zone password
   * @example "5f46c1a0-7be8-4659-897529acb638-e696-4158"
   */
  Password: string;
  PriceOverride: number;
  // TODO
  PullZones: any;
  /**
   * Storage zone read-only password
   * @example "bfcbda9b-4749-4a5e-b25e7650a6a8-63db-4848"
   */
  ReadOnlyPassword: string;
  /**
   * Storage zone region
   * @example "NY"
   */
  Region: Region;
  /**
   * Storage zone is changing replication settings
   * @example false
   */
  ReplicationChangeInProgress: boolean;
  /**
   * Storage zone replication regions
   * @example "DE"
   */
  ReplicationRegions: ReplicationRegion[];
  /**
   * Storage zone rewrites 404 status code to 200 for URLs without extension
   * @example true
   */
  Rewrite404To200: boolean;
  /**
   * Storage zone hostname domain
   * @example "ny.storage.bunnycdn.com"
   */
  StorageHostname: StorageHostname;
  // TODO example
  /**
   * storage zone total storage used
   */
  StorageUsed: number;
  /**
   * User id
   * @example "c2fbdbcf-0961-4a89-b828-edf3ad7456e3"
   */
  UserId: string;
  /**
   * Storage zone zone tier
   */
  ZoneTier: ZoneTier;
}

/* eslint-disable @typescript-eslint/naming-convention */
export const storageZoneEndpoints = {
  /**
   * São Paulo, BR
   */
  BR: "br.storage.bunnycdn.com",
  /**
   * Falkenstein, DE
   */
  DE: "storage.bunnycdn.com",
  /**
   * Johannesburg, SA
   */
  JH: "jh.storage.bunnycdn.com",
  /**
   * Los Angeles, US
   */
  LA: "la.storage.bunnycdn.com",
  /**
   * New York, US
   */
  NY: "ny.storage.bunnycdn.com",
  /**
   * Stockholm, SE
   */
  SE: "se.storage.bunnycdn.com",
  /**
   * Singapore, SG
   */
  SG: "sg.storage.bunnycdn.com",
  /**
   * London, UK
   */
  UK: "uk.storage.bunnycdn.com",
} as const;
