import { deepmerge } from "deepmerge-ts";
import normalize from "normalize-path";
import type { StorageHostname as StorageZoneEndpoint } from "../../../api/storage-zone/types";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface DeleteFileRequest {
  /**
   * The name that the file will be uploaded as.
   * @example "demo.sqlite"
   */
  fileName: string;
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

export type DeleteFileResponse = void;

export const deleteFile = u
  .input<DeleteFileRequest>()
  .output<DeleteFileResponse>();

const options: RequestInit = {
  method: "DELETE",
};

export const deleteFileEndpoints = {
  "DELETE /:storageZoneName/:path/:fileName":
    "DELETE /:storageZoneName/:path/:fileName",
  deleteFile: "deleteFile",
} as const;

export async function deleteFileClient(
  defaultRequestInit: RequestInit,
  {
    fileName,
    path = "",
    storageZoneEndpoint = "storage.bunnycdn.com",
    storageZoneName = "",
    storageZonePassword,
  }: DeleteFileRequest
): Promise<DeleteFileResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(storageZonePassword && { AccessKey: storageZonePassword }),
    },
  };

  const fullPath = normalize(`${storageZoneName}/${path}/${fileName}`);
  const overrideUrl = `https://${storageZoneEndpoint}/${fullPath}/`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
