import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import { storageEndpoints } from "../types";

export interface UploadFileRequest {
  /**
   * The storage zone password
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   *
   */
  storageEndpoint?: string;
  /**
   * The name of your storage zone where you are connecting to.
   */
  storageZoneName: string;
  /**
   * The directory path to where your file will be stored. If this is the root of your storage zone, you can ignore this parameter.
   */
  path?: string;
  /**
   * The name that the file will be uploaded as.
   */
  fileName: string;
}

export type UploadFileResponse = void;

export const createTicket = u
  .input<UploadFileRequest>()
  .output<UploadFileResponse>();

const url =
  "https://storage.bunnycdn.com/file-example-storage-zone/subpath/test.db";
const options = {
  method: "PUT",
  headers: {
    "content-type": "application/octet-stream",
  },
};

export const createTicketEndpoints = {
  uploadFile: "uploadFile",
  "PUT /:storageZoneName/:path/:fileName":
    "PUT /:storageZoneName/:path/:fileName",
} as const;

export async function createTicketClient(
  defaultRequestInit: RequestInit,
  { apiKey, ...input }: UploadFileRequest
): Promise<UploadFileResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
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

  console.log("text", await response.text());
}
