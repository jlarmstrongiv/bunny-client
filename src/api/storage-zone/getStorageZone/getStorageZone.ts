import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import type { StorageZone } from "../types";
import { u } from "../untypeable";

export interface GetStorageZoneRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * The ID of the Storage Zone that should be returned
   * @example 270299
   */
  id: number;
}

export type GetStorageZoneResponse = StorageZone;

export const getStorageZone = u
  .input<GetStorageZoneRequest>()
  .output<GetStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const getStorageZoneEndpoints = {
  "GET /storagezone/:id": "GET /storagezone/:id",
  getStorageZone: "getStorageZone",
} as const;

export async function getStorageZoneClient(
  defaultRequestInit: RequestInit,
  { apiKey, id }: GetStorageZoneRequest,
): Promise<GetStorageZoneResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const overrideUrl = `${url}/${id}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions),
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: GetStorageZoneResponse = await response.json();

  return json;
}
