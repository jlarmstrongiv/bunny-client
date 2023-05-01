import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  downloadFile,
  downloadFileClient,
  downloadFileEndpoints,
} from "./downloadFile";
import {
  uploadFile,
  uploadFileClient,
  uploadFileEndpoints,
} from "./uploadFile";
import {
  deleteFile,
  deleteFileClient,
  deleteFileEndpoints,
} from "./deleteFile";

const statisticsRouter = u.router({
  [downloadFileEndpoints.downloadFile]: downloadFile,
  [downloadFileEndpoints["GET /:storageZoneName/:path/:fileName"]]:
    downloadFile,
  [uploadFileEndpoints.uploadFile]: uploadFile,
  [uploadFileEndpoints["PUT /:storageZoneName/:path/:fileName"]]: uploadFile,
  [deleteFileEndpoints.deleteFile]: deleteFile,
  [deleteFileEndpoints["DELETE /:storageZoneName/:path/:fileName"]]: deleteFile,
});

/**
 * @param defaultInput default input parameters for every request
 * @param defaultRequestInit default fetch parameters for every request
 * @returns manageFilesClient
 *
 * @example
 * ```ts
 * const manageFilesClient = createManageFilesClient({
 *   storageZonePassword: "22a5e2c4-0b5f-4fb0-bdb94eebb264-8944-4154",
 *   storageZoneEndpoint: "ny.storage.bunnycdn.com",
 *   storageZoneName: "example-storage-zone",
 * });
 *
 * const response = await manageFilesClient("deleteFile", {
 *   fileName: "demo.sqlite",
 * });
 * ```
 */
export function createManageFilesClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {}
) {
  const manageFilesClient = createTypeLevelClient<typeof statisticsRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case downloadFileEndpoints.downloadFile:
        case downloadFileEndpoints["GET /:storageZoneName/:path/:fileName"]:
          return downloadFileClient(defaultRequestInit, overrideInput);
        case uploadFileEndpoints.uploadFile:
        case uploadFileEndpoints["PUT /:storageZoneName/:path/:fileName"]:
          return uploadFileClient(defaultRequestInit, overrideInput);
        case deleteFileEndpoints.deleteFile:
        case deleteFileEndpoints["DELETE /:storageZoneName/:path/:fileName"]:
          return deleteFileClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${manageFilesClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return manageFilesClient;
}
