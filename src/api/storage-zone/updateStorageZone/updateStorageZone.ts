import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type { ReplicationRegion } from "../types";

// TODO
export interface UpdateStorageZoneRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The ID of the storage zone that should be updated
   * @example 270302
   */
  id: number;
  /**
   * The list of replication zones enabled for the storage zone
   * @example "DE"
   */
  ReplicationZones?: ReplicationRegion[];
  /**
   * The origin URL of the storage zone
   *
   * The origin URL is a very important part of your Pull Zone. It tells our servers where to fetch files that we don't yet have in cache. In the majority of cases, this will simply be the URL of your website or storage service. Please make sure that if your website is using HTTPS, that you make sure your origin URL is set up with HTTPS as well to keep the connection encrypted throughout the network.
   *
   * @example "https://mywebsite.com"
   */
  OriginUrl?: string;
  // TODO: confirm path
  /**
   * The path to the custom file that will be returned in a case of 404
   * @example "/my-partial/url/404.html"
   */
  Custom404FilePath?: string;
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
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

export const updateStorageZoneEndpoints = {
  updateStorageZone: "updateStorageZone",
  "POST /storagezone/:id": "POST /storagezone/:id",
} as const;

export async function updateStorageZoneClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id, ...input }: UpdateStorageZoneRequest
): Promise<UpdateStorageZoneResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
    body: JSON.stringify(input),
  };

  const overrideUrl = `${url}/${id}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
