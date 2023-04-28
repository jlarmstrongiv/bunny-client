/**
 * DE - EU: Frankfurt, DE
 *
 * NY - NA: New York City, NY
 *
 * LA - NA: Los Angeles, CA
 *
 * SG - Asia: Singapore 2, SG
 */
export type Region = "DE" | "NY" | "LA" | "SG" | "SYD";

/**
 * DE - EU: Frankfurt, DE
 *
 * NY - NA: New York City, NY
 *
 * LA - NA: Los Angeles, CA
 *
 * SG - Asia: Singapore 2, SG
 *
 * SYG - OC: Sydney, SYD
 */
export type ReplicationRegion = "DE" | "NY" | "LA" | "SG" | "SYD";

/**
 * Falkenstein, DE: storage.bunnycdn.com
 *
 * London, UK: uk.storage.bunnycdn.com
 *
 * New York, US: ny.storage.bunnycdn.com
 *
 * Los Angeles, US: la.storage.bunnycdn.com
 *
 * Singapore, SG: sg.storage.bunnycdn.com
 *
 * Stockholm, SE: se.storage.bunnycdn.com
 *
 * São Paulo, BR: br.storage.bunnycdn.com
 *
 * Johannesburg, SA: jh.storage.bunnycdn.com
 */
export type StorageHostname =
  | "storage.bunnycdn.com"
  | "uk.storage.bunnycdn.com"
  | "ny.storage.bunnycdn.com"
  | "la.storage.bunnycdn.com"
  | "sg.storage.bunnycdn.com"
  | "se.storage.bunnycdn.com"
  | "br.storage.bunnycdn.com"
  | "jh.storage.bunnycdn.com";

/**
 * 0 - Standard
 *
 * 1 - Edge (SSD)
 */
export type ZoneTier = 0 | 1;

// TODO
export interface StorageZone {
  /**
   * storage zone id
   * @example 270284
   */
  Id: number;
  /**
   * user id
   * @example "c2fbdbcf-0961-4a89-b828-edf3ad7456e3"
   */
  UserId: string;
  /**
   * storage zone name
   * @example "example-storage-0"
   */
  Name: string;
  /**
   * storage zone password
   * @example "5f46c1a0-7be8-4659-897529acb638-e696-4158"
   */
  Password: string;
  /**
   * last modified date of the storage zone
   * @example "2023-04-28T02:23:47.7909075Z"
   */
  DateModified: string;
  /**
   * is storage zone deleted
   * @example false
   */
  Deleted: boolean;
  // TODO
  /**
   * storage zone total storage used
   */
  StorageUsed: number;
  // TODO
  /**
   * number of files stored in the storage zone
   */
  FilesStored: number;
  /**
   * storage zone region
   * @example "NY"
   */
  Region: Region;
  /**
   * storage zone replication regions
   * @example "DE"
   */
  ReplicationRegions: ReplicationRegion[];
  // TODO
  PullZones: any;
  /**
   * storage zone read-only password
   * @example "bfcbda9b-4749-4a5e-b25e7650a6a8-63db-4848"
   */
  ReadOnlyPassword: string;
  /**
   * storage zone should rewrite 404 Not Found http responses to 200 OK http responses
   * @example true
   */
  Rewrite404To200: boolean;
  // TODO: confirm path
  /**
   * custom file path in storage zone to return when encountering 404 Not Found http errors
   * @example "/my-partial/url/404.html"
   */
  Custom404FilePath: string | null;
  /**
   * storage zone hostname domain
   * @example "ny.storage.bunnycdn.com"
   */
  StorageHostname: StorageHostname;
  /**
   * storage zone zone tier
   */
  ZoneTier: ZoneTier;
  /**
   * storage zone is changing replication settings
   * @example false
   */
  ReplicationChangeInProgress: boolean;
  PriceOverride: number;
  Discount: number;
}
