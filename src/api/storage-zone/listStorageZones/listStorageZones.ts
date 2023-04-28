import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type { StorageZone } from "../types";

export interface listStorageZonesRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * page number between 1 and 2147483647
   * @example 1
   */
  page: number;
  /**
   * number of results per page between 5 and 1000
   * @example 1000
   */
  perPage: number;
  /**
   * should include deleted storage zones
   * @example false
   */
  includeDeleted?: boolean;
  /**
   * The search term that will be used to filter the results
   * @example "storage-zone-name-substring"
   */
  search?: string;
}

export type listStorageZonesResponse = {
  /**
   * list of storage zones that match the query
   */
  Items: StorageZone[];
  /**
   * the current query page number
   * @example 1
   */
  CurrentPage: number;
  /**
   * the total number of queried items in all pages
   * @example 5
   */
  TotalItems: number;
  /**
   * whether the query has additional pages of results
   * @example false
   */
  HasMoreItems: boolean;
};

export const listStorageZones = u
  .input<listStorageZonesRequest>()
  .output<listStorageZonesResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const listStorageZonesEndpoints = {
  listStorageZones: "listStorageZones",
  "GET /storagezone": "GET /storagezone",
} as const;

export async function listStorageZonesClient(
  defaultRequestInit: RequestInit,
  { AccessKey, page, perPage, includeDeleted, search }: listStorageZonesRequest
): Promise<listStorageZonesResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(typeof includeDeleted === "boolean" && {
      includeDelete: includeDeleted.toString(),
    }),
    ...(search && { search }),
    page: page.toString(),
    perPage: perPage.toString(),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
