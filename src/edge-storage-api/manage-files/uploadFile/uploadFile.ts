import { deepmerge } from "deepmerge-ts";
import normalize from "normalize-path";
import type { StorageHostname as StorageZoneEndpoint } from "../../../api/storage-zone/types";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

// TODO: use
// - file type https://www.npmjs.com/package/file-type
// - json https://www.npmjs.com/package/is-json
// - svg https://www.npmjs.com/package/is-svg
// - html https://www.npmjs.com/package/is-html
// - missing css, js, etc. may also be good to read from file path or file name
//   - get mimetype https://www.npmjs.com/package/mime-types
// and add the file-type header
// - docs, see request box https://docs.bunny.net/reference/put_-storagezonename-path-filename
// - https://gist.github.com/cp6/cff63f23ec3727a7b306067780b5f2e0#file-bunnycdn_storage-php-L2
// needed for
// - wasm https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
// - web manifest https://vite-pwa-org.netlify.app/deployment/#getting-started
// - and more

export interface UploadFileRequest {
  // TODO: the unofficial api mentioned the checksum needs to be all uppercase?
  // - https://toshy.github.io/BunnyNet-PHP/edge-storage-api/#upload-file
  /**
   * The hex-encoded SHA256 checksum of the uploaded content. The server will compare the final SHA256 to the checksum and reject the request in case the checksums do not match.
   * @example "49bc20df15e412a64472421e13fe86ff1c5165e18b2afccf160d4dc19fe68a14"
   */
  checksum?: string;
  /**
   * Raw request body should contain the contents of the file. This should be raw file data without any sort of encoding.
   *
   * Converting a Buffer to an ArrayBuffer safely:
   * @example
   * ```ts
   * const buffer = Buffer.from("Hello World");
   * const arrayBuffer = buffer.buffer.slice(
   *   buffer.byteOffset,
   *   buffer.byteOffset + buffer.byteLength
   * );
   * const string = Buffer.from(arrayBuffer).toString();
   * ```
   *
   * Converting a String to an ArrayBuffer safely:
   * @example
   * ```ts
   * const textEncoder = new TextEncoder(); // Always utf-8
   * const textDecoder = new TextDecoder("utf-8");
   *
   * const uint8Array = textEncoder.encode("Hello World");
   * const arrayBuffer = uint8Array.buffer.slice(
   *   uint8Array.byteOffset,
   *   uint8Array.byteLength + uint8Array.byteOffset,
   * );
   * const string = textDecoder.decode(arrayBuffer);
   * ```
   */
  file: ArrayBuffer;
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
  // TODO: add cache tag https://bunny.net/blog/introducing-tag-based-cdn-cache-purging/
}

export type UploadFileResponse = void;

export const uploadFile = u
  .input<UploadFileRequest>()
  .output<UploadFileResponse>();

const options: RequestInit = {
  headers: {
    "content-type": "application/octet-stream",
  },
  method: "PUT",
};

export const uploadFileEndpoints = {
  "PUT /:storageZoneName/:path/:fileName":
    "PUT /:storageZoneName/:path/:fileName",
  uploadFile: "uploadFile",
} as const;

export async function uploadFileClient(
  defaultRequestInit: RequestInit,
  {
    file,
    fileName,
    path = "",
    storageZoneEndpoint = "storage.bunnycdn.com",
    storageZoneName = "",
    storageZonePassword,
  }: UploadFileRequest,
): Promise<UploadFileResponse> {
  const overrideOptions: RequestInit = {
    body: file,
    headers: {
      ...(storageZonePassword && { AccessKey: storageZonePassword }),
    },
  };

  const fullPath = normalize(`${storageZoneName}/${path}/${fileName}`, false);
  const overrideUrl = `https://${storageZoneEndpoint}/${fullPath}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions),
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
