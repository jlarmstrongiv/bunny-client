import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface DeleteStorageZoneRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The Storage Zone ID that should be deleted
   * @example 270299
   */
  id: number;
}

export type DeleteStorageZoneResponse = void;

export const deleteStorageZone = u
  .input<DeleteStorageZoneRequest>()
  .output<DeleteStorageZoneResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  method: "DELETE",
};

export const deleteStorageZoneEndpoints = {
  deleteStorageZone: "deleteStorageZone",
  "DELETE /storagezone/:id": "DELETE /storagezone/:id",
} as const;

export async function deleteStorageZoneClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id }: DeleteStorageZoneRequest
): Promise<DeleteStorageZoneResponse> {
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
