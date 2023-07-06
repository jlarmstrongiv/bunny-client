import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import type { ReplicationRegion as ReplicationZone } from "../types";
import { u } from "../untypeable";

// TODO
export interface UpdateStorageZoneRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  // TODO: confirm path
  /**
   * The path to the custom file that will be returned in a case of 404
   * @example "/my-partial/url/404.html"
   */
  Custom404FilePath?: string;
  /**
   * The ID of the storage zone that should be updated
   * @example 270302
   */
  id: number;
  /**
   * The origin URL of the storage zone
   *
   * The origin URL is a very important part of your Pull Zone. It tells our servers where to fetch files that we don't yet have in cache. In the majority of cases, this will simply be the URL of your website or storage service. Please make sure that if your website is using HTTPS, that you make sure your origin URL is set up with HTTPS as well to keep the connection encrypted throughout the network.
   *
   * @example "https://mywebsite.com"
   */
  OriginUrl?: string;
  /**
   * The list of replication zones enabled for the storage zone
   * @example "DE"
   */
  ReplicationZones?: ReplicationZone[];
  /**
   * Rewrite 404 status code to 200 for URLs without extension
   * @example true
   */
  Rewrite404To200?: boolean;
}

export type UpdateStorageZoneResponse = void;

export const updateStorageZone = u
  .input<UpdateStorageZoneRequest>()
  .output<UpdateStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  method: "POST",
};

export const updateStorageZoneEndpoints = {
  "POST /storagezone/:id": "POST /storagezone/:id",
  updateStorageZone: "updateStorageZone",
} as const;

export async function updateStorageZoneClient(
  defaultRequestInit: RequestInit,
  { apiKey, id, ...input }: UpdateStorageZoneRequest,
): Promise<UpdateStorageZoneResponse> {
  const overrideOptions: RequestInit = {
    body: JSON.stringify(input),
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
}
