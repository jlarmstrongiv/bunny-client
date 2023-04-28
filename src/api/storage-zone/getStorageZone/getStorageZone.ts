import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type { StorageZone } from "../types";

export interface getStorageZoneRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * storage zone id
   * @example 270299
   */
  id: number;
}

export type getStorageZoneResponse = StorageZone;

export const getStorageZone = u
  .input<getStorageZoneRequest>()
  .output<getStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getStorageZoneEndpoints = {
  getStorageZone: "getStorageZone",
  "GET /storagezone/:id": "GET /storagezone/:id",
} as const;

export async function getStorageZoneClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id }: getStorageZoneRequest
): Promise<getStorageZoneResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
  };

  const overrideUrl = `${url}/${id}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
