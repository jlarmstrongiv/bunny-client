import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface deleteStorageZoneRequest {
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

export type deleteStorageZoneResponse = void;

export const deleteStorageZone = u
  .input<deleteStorageZoneRequest>()
  .output<deleteStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options = {
  method: "DELETE",
};

export const deleteStorageZoneEndpoints = {
  deleteStorageZone: "deleteStorageZone",
  "DELETE /storagezone/:id": "DELETE /storagezone/:id",
} as const;

export async function deleteStorageZoneClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id }: deleteStorageZoneRequest
): Promise<deleteStorageZoneResponse> {
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
}
