import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type {
  ReplicationRegion,
  Region,
  ZoneTier,
  StorageZone,
} from "../types";

export interface addStorageZoneRequestBase {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The origin URL of the storage zone that will be added
   *
   * The origin URL is a very important part of your Pull Zone. It tells our servers where to fetch files that we don't yet have in cache. In the majority of cases, this will simply be the URL of your website or storage service. Please make sure that if your website is using HTTPS, that you make sure your origin URL is set up with HTTPS as well to keep the connection encrypted throughout the network.
   *
   * @example "https://mywebsite.com"
   */
  OriginUrl?: string;
  /**
   * The name of the storage zone
   * @example "mywebsite"
   */
  Name: string;
  /**
   * The code of the main storage zone region (Possible values: DE, NY, LA, SG)
   * @example "NY"
   */
  Region: Region;
}

export interface addStorageZoneRequestEdgeSsd
  extends addStorageZoneRequestBase {
  /**
   * The code of the main storage zone region (Possible values: DE, NY, LA, SG, SYD)
   * @example "DE"
   */
  ReplicationRegions?: never;
  /**
   * Determines the storage zone tier that will be storing the data
   * @example 0
   */
  ZoneTier: ZoneTier;
}

export interface addStorageZoneRequestReplicationRegion
  extends addStorageZoneRequestBase {
  /**
   * The code of the main storage zone region (Possible values: DE, NY, LA, SG, SYD)
   * @example "DE"
   */
  ReplicationRegions?: ReplicationRegion[];
  /**
   * Determines the storage zone tier that will be storing the data
   * @example 0
   */
  ZoneTier?: never;
}

// mutually exclusive options https://effectivetypescript.com/2021/11/11/optional-never/
export type addStorageZoneRequest =
  | addStorageZoneRequestEdgeSsd
  | addStorageZoneRequestReplicationRegion;

export type addStorageZoneResponse = StorageZone;

export const addStorageZone = u
  .input<addStorageZoneRequest>()
  .output<addStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

export const addStorageZoneEndpoints = {
  addStorageZone: "addStorageZone",
  "POST /storagezone": "POST /storagezone",
} as const;

export async function addStorageZoneClient(
  defaultRequestInit: RequestInit,
  { AccessKey, ...input }: addStorageZoneRequest
): Promise<addStorageZoneResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
    body: JSON.stringify(input),
  };

  const response = await fetch(
    url,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}