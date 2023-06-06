import { deepmerge } from "deepmerge-ts";
import normalize from "normalize-path";
import type { StorageHostname as StorageZoneEndpoint } from "../../../api/storage-zone/types";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface File {
  /**
   * @example 0
   */
  ArrayNumber: number;
  /**
   * The hex-encoded SHA256 checksum of the uploaded content.
   *
   * File
   * @example "49BC20DF15E412A64472421E13FE86FF1C5165E18B2AFCCF160D4DC19FE68A14"
   *
   * Folder
   * @example null
   */
  Checksum: string | null;
  /**
   * [Content-Type](https://web.archive.org/web/20230429020308/https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) of the attachment, see also [MIME Types](https://web.archive.org/web/20230429020146/https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
   * @example ""
   * @example "text/plain"
   */
  ContentType: string;
  /**
   * ISO 8601 date and time of file created
   * @example "2023-05-01T04:06:38.882"
   */
  DateCreated: string;
  /**
   * File id
   * @example "02f8ef36-e3e8-4701-a86f-08cab3efe8b9"
   */
  Guid: string;
  /**
   * File is directory
   *
   * File
   * @example false
   *
   * Folder
   * @example true
   */
  IsDirectory: boolean;
  /**
   * ISO 8601 date and time of file last changed
   */
  LastChanged: string;
  /**
   * Length of file in bytes
   *
   * File
   * @example 1073741824
   *
   * Folder
   * @example 0
   */
  Length: number;
  /**
   * File
   * @example demo.db
   *
   * Folder
   * @example subpath
   */
  ObjectName: string;
  /**
   * File path
   * @example "/example-storage-zone/subpath/"
   */
  Path: string;
  /**
   * Storage zone replication regions the file exists in (BUG: may be empty string)
   * @example ""
   */
  ReplicatedZones: "";
  /**
   * Server id
   *
   * File
   * @example 562
   *
   * Folder
   * @example 0
   */
  ServerId: number;
  /**
   * Storage zone id where the file is located
   * @example 271332
   */
  StorageZoneId: number;
  /**
   * Storage zone name
   * @example "example-storage-zone"
   */
  StorageZoneName: string;
  /**
   * User id associated with file
   * @example "c2fbdbcf-0961-4a89-b818-edf3ad7456e3"
   */
  UserId: string;
}

export interface ListFilesRequest {
  /**
   * The directory path to where your file will be stored. If this is the root of your storage zone, you can ignore this parameter.
   * @example "subpath"
   */
  path?: string;
  /**
   * The storage API endpoint depends on the primary storage region of your storage zone. You can also find this in the FTP & HTTP API Information of your storage zone.
   * @example "ny.storage.bunnycdn.com"
   */
  storageZoneEndpoint?: StorageZoneEndpoint;
  /**
   * The name of your storage zone where you are connecting to.
   * @example "example-storage-zone"
   */
  storageZoneName?: string;
  /**
   * The storage zone password
   * @example "22a5e2c4-0b5f-4fb0-bdb94eebb264-8944-4154"
   */
  storageZonePassword?: string;
}

export type ListFilesResponse = File[];

export const listFiles = u
  .input<ListFilesRequest>()
  .output<ListFilesResponse>();

const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const listFilesEndpoints = {
  "GET /:storageZoneName/:path": "GET /:storageZoneName/:path",
  listFiles: "listFiles",
} as const;

export async function listFilesClient(
  defaultRequestInit: RequestInit,
  {
    path = "",
    storageZoneEndpoint = "storage.bunnycdn.com",
    storageZoneName = "",
    storageZonePassword,
  }: ListFilesRequest
): Promise<ListFilesResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(storageZonePassword && { AccessKey: storageZonePassword }),
    },
  };

  const fullPath = normalize(`${storageZoneName}/${path}`);
  const overrideUrl = `https://${storageZoneEndpoint}/${fullPath}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: File[] = await response.json();

  return json;
}
