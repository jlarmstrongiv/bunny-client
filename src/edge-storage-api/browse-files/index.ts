import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import { listFiles, listFilesClient, listFilesEndpoints } from "./listFiles";

const statisticsRouter = u.router({
  [listFilesEndpoints.listFiles]: listFiles,
  [listFilesEndpoints["GET /:storageZoneName/:path"]]: listFiles,
});

/**
 * @param defaultInput default input parameters for every request
 * @param defaultRequestInit default fetch parameters for every request
 * @returns browseFilesClient
 *
 * @example
 * ```ts
 * const browseFilesClient = createBrowseFilesClient({
 *   storageZonePassword: "22a5e2c4-0b5f-4fb0-bdb94eebb264-8944-4154",
 *   storageZoneEndpoint: "ny.storage.bunnycdn.com",
 *   storageZoneName: "example-storage-zone",
 * });
 *
 * const response = await browseFilesClient("listFiles");
 * ```
 */
export function createBrowseFilesClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {}
) {
  const browseFilesClient = createTypeLevelClient<typeof statisticsRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case listFilesEndpoints.listFiles:
        case listFilesEndpoints["GET /:storageZoneName/:path"]:
          return listFilesClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${browseFilesClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return browseFilesClient;
}
