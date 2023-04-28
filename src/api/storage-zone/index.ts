import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  listStorageZones,
  listStorageZonesClient,
  listStorageZonesEndpoints,
} from "./listStorageZones";
import {
  addStorageZone,
  addStorageZoneClient,
  addStorageZoneEndpoints,
} from "./addStorageZone";
import {
  getStorageZone,
  getStorageZoneClient,
  getStorageZoneEndpoints,
} from "./getStorageZone";
import {
  deleteStorageZone,
  deleteStorageZoneClient,
  deleteStorageZoneEndpoints,
} from "./deleteStorageZone";
import {
  resetPassword,
  resetPasswordClient,
  resetPasswordEndpoints,
} from "./resetPassword";
import {
  resetReadOnlyPassword,
  resetReadOnlyPasswordClient,
  resetReadOnlyPasswordEndpoints,
} from "./resetReadOnlyPassword";

const storageZoneRouter = u.router({
  [listStorageZonesEndpoints["listStorageZones"]]: listStorageZones,
  [listStorageZonesEndpoints["GET /storagezone"]]: listStorageZones,
  [addStorageZoneEndpoints["addStorageZone"]]: addStorageZone,
  [addStorageZoneEndpoints["POST /storagezone"]]: addStorageZone,
  [getStorageZoneEndpoints["getStorageZone"]]: getStorageZone,
  [getStorageZoneEndpoints["GET /storagezone/:id"]]: getStorageZone,
  [deleteStorageZoneEndpoints["deleteStorageZone"]]: deleteStorageZone,
  [deleteStorageZoneEndpoints["DELETE /storagezone/:id"]]: deleteStorageZone,
  [resetPasswordEndpoints["resetPassword"]]: resetPassword,
  [resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]]:
    resetPassword,
  [resetReadOnlyPasswordEndpoints["resetReadOnlyPassword"]]:
    resetReadOnlyPassword,
  [resetReadOnlyPasswordEndpoints[
    "POST /storagezone/resetReadOnlyPassword?id=:id"
  ]]: resetReadOnlyPassword,
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
        case listStorageZonesEndpoints["listStorageZones"]:
        case listStorageZonesEndpoints["GET /storagezone"]:
          return listStorageZonesClient(defaultRequestInit, input);
        case addStorageZoneEndpoints["addStorageZone"]:
        case addStorageZoneEndpoints["POST /storagezone"]:
          return addStorageZoneClient(defaultRequestInit, input);
        case getStorageZoneEndpoints["getStorageZone"]:
        case getStorageZoneEndpoints["GET /storagezone/:id"]:
          return getStorageZoneClient(defaultRequestInit, input);
        case deleteStorageZoneEndpoints["deleteStorageZone"]:
        case deleteStorageZoneEndpoints["DELETE /storagezone/:id"]:
          return deleteStorageZoneClient(defaultRequestInit, input);
        case resetPasswordEndpoints["resetPassword"]:
        case resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]:
          return resetPasswordClient(defaultRequestInit, input);
        case resetReadOnlyPasswordEndpoints["resetReadOnlyPassword"]:
        case resetReadOnlyPasswordEndpoints[
          "POST /storagezone/resetReadOnlyPassword?id=:id"
        ]:
          return resetReadOnlyPasswordClient(defaultRequestInit, input);
        default:
          throw new Error(
            `[${storageZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return storageZoneClient;
}
