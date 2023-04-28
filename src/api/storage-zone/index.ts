import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  addStorageZone,
  addStorageZoneClient,
  addStorageZoneEndpoints,
} from "./addStorageZone";
import {
  listStorageZones,
  listStorageZonesClient,
  listStorageZonesEndpoints,
} from "./listStorageZones";

const storageZoneRouter = u.router({
  [addStorageZoneEndpoints["addStorageZone"]]: addStorageZone,
  [addStorageZoneEndpoints["POST /storagezone"]]: addStorageZone,
  [listStorageZonesEndpoints["listStorageZones"]]: listStorageZones,
  [listStorageZonesEndpoints["GET /storagezone"]]: listStorageZones,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns storageZoneClient
 *
 * @example
 * ```ts
 * const storageZoneClient = createStorageZoneClient({
 *   headers: {
 *     AccessKey: API_ACCESS_KEY,
 *   },
 * });
 *
 * const response = await storageZoneClient("addStorageZone", {
 *   Name: "api-example",
 *   Region: "NY",
 *   ZoneTier: 1,
 * });
 * ```
 */
export function createStorageZoneClient(defaultRequestInit: RequestInit = {}) {
  const storageZoneClient = createTypeLevelClient<typeof storageZoneRouter>(
    async (path, input) => {
      switch (path) {
        case addStorageZoneEndpoints["addStorageZone"]:
        case addStorageZoneEndpoints["POST /storagezone"]:
          return addStorageZoneClient(defaultRequestInit, input);
        case listStorageZonesEndpoints["listStorageZones"]:
        case listStorageZonesEndpoints["GET /storagezone"]:
          return listStorageZonesClient(defaultRequestInit, input);
        default:
          throw new Error(
            `[${storageZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return storageZoneClient;
}
