import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import type { StorageZone } from "../types";
import { u } from "../untypeable";

export interface ListStorageZonesRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * Should include deleted storage zones
   * @example false
   */
  includeDeleted?: boolean;
  /**
   * Page number between 1 and 2147483647
   * @example 1
   */
  page?: number;
  /**
   * Number of results per page between 5 and 1000
   * @example 1000
   */
  perPage?: number;
  /**
   * The search term that will be used to filter the results
   * @example "storage-zone-name-substring"
   */
  search?: string;
}

export interface ListStorageZonesResponse {
  /**
   * The current query page number
   * @example 1
   */
  CurrentPage: number;
  /**
   * Whether the query has additional pages of results
   * @example false
   */
  HasMoreItems: boolean;
  /**
   * List of storage zones that match the query
   */
  Items: StorageZone[];
  /**
   * The total number of queried items in all pages
   * @example 5
   */
  TotalItems: number;
}

export const listStorageZones = u
  .input<ListStorageZonesRequest>()
  .output<ListStorageZonesResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const listStorageZonesEndpoints = {
  "GET /storagezone": "GET /storagezone",
  listStorageZones: "listStorageZones",
} as const;

export async function listStorageZonesClient(
  defaultRequestInit: RequestInit,
  {
    apiKey,
    includeDeleted,
    page = 1,
    perPage = 1000,
    search,
  }: ListStorageZonesRequest,
): Promise<ListStorageZonesResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(typeof includeDeleted === "boolean" && {
      includeDeleted: includeDeleted.toString(),
    }),
    ...(search && { search }),
    page: page.toString(),
    perPage: perPage.toString(),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions),
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: ListStorageZonesResponse = await response.json();

  return json;
}
