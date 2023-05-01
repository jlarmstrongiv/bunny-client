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
  checkTheStorageZoneAvailability,
  checkTheStorageZoneAvailabilityClient,
  checkTheStorageZoneAvailabilityEndpoints,
} from "./checkTheStorageZoneAvailability";
import {
  getStorageZone,
  getStorageZoneClient,
  getStorageZoneEndpoints,
} from "./getStorageZone";
import {
  updateStorageZone,
  updateStorageZoneClient,
  updateStorageZoneEndpoints,
} from "./updateStorageZone";
import {
  deleteStorageZone,
  deleteStorageZoneClient,
  deleteStorageZoneEndpoints,
} from "./deleteStorageZone";
import {
  getStorageZoneStatistics,
  getStorageZoneStatisticsClient,
  getStorageZoneStatisticsEndpoints,
} from "./getStorageZoneStatistics";
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
  [listStorageZonesEndpoints.listStorageZones]: listStorageZones,
  [listStorageZonesEndpoints["GET /storagezone"]]: listStorageZones,
  [addStorageZoneEndpoints.addStorageZone]: addStorageZone,
  [addStorageZoneEndpoints["POST /storagezone"]]: addStorageZone,
  [checkTheStorageZoneAvailabilityEndpoints.checkTheStorageZoneAvailability]:
    checkTheStorageZoneAvailability,
  [checkTheStorageZoneAvailabilityEndpoints[
    "POST /storagezone/checkavailability"
  ]]: checkTheStorageZoneAvailability,
  [getStorageZoneEndpoints.getStorageZone]: getStorageZone,
  [getStorageZoneEndpoints["GET /storagezone/:id"]]: getStorageZone,
  [updateStorageZoneEndpoints.updateStorageZone]: updateStorageZone,
  [updateStorageZoneEndpoints["POST /storagezone/:id"]]: updateStorageZone,
  [deleteStorageZoneEndpoints.deleteStorageZone]: deleteStorageZone,
  [deleteStorageZoneEndpoints["DELETE /storagezone/:id"]]: deleteStorageZone,
  [getStorageZoneStatisticsEndpoints.getStorageZoneStatistics]:
    getStorageZoneStatistics,
  [getStorageZoneStatisticsEndpoints["GET /storagezone/:id/statistics"]]:
    getStorageZoneStatistics,
  [resetPasswordEndpoints.resetPassword]: resetPassword,
  [resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]]:
    resetPassword,
  [resetReadOnlyPasswordEndpoints.resetReadOnlyPassword]: resetReadOnlyPassword,
  [resetReadOnlyPasswordEndpoints[
    "POST /storagezone/resetReadOnlyPassword?id=:id"
  ]]: resetReadOnlyPassword,
});

/**
 * @param defaultInput default input parameters for every request
 * @param defaultRequestInit default fetch parameters for every request
 * @returns storageZoneClient
 *
 * @example
 * ```ts
 * const storageZoneClient = createStorageZoneClient({
 *   apiKey: API_ACCESS_KEY,
 * });
 *
 * const response = await storageZoneClient("addStorageZone", {
 *   Name: "api-example",
 *   Region: "NY",
 *   ZoneTier: 1,
 * });
 * ```
 */
export function createStorageZoneClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {}
) {
  const storageZoneClient = createTypeLevelClient<typeof storageZoneRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case listStorageZonesEndpoints.listStorageZones:
        case listStorageZonesEndpoints["GET /storagezone"]:
          return listStorageZonesClient(defaultRequestInit, overrideInput);
        case addStorageZoneEndpoints.addStorageZone:
        case addStorageZoneEndpoints["POST /storagezone"]:
          return addStorageZoneClient(defaultRequestInit, overrideInput);
        case checkTheStorageZoneAvailabilityEndpoints.checkTheStorageZoneAvailability:
        case checkTheStorageZoneAvailabilityEndpoints[
          "POST /storagezone/checkavailability"
        ]:
          return checkTheStorageZoneAvailabilityClient(
            defaultRequestInit,
            overrideInput
          );
        case getStorageZoneEndpoints.getStorageZone:
        case getStorageZoneEndpoints["GET /storagezone/:id"]:
          return getStorageZoneClient(defaultRequestInit, overrideInput);
        case updateStorageZoneEndpoints.updateStorageZone:
        case updateStorageZoneEndpoints["POST /storagezone/:id"]:
          return updateStorageZoneClient(defaultRequestInit, overrideInput);
        case deleteStorageZoneEndpoints.deleteStorageZone:
        case deleteStorageZoneEndpoints["DELETE /storagezone/:id"]:
          return deleteStorageZoneClient(defaultRequestInit, overrideInput);
        case getStorageZoneStatisticsEndpoints.getStorageZoneStatistics:
        case getStorageZoneStatisticsEndpoints[
          "GET /storagezone/:id/statistics"
        ]:
          return getStorageZoneStatisticsClient(
            defaultRequestInit,
            overrideInput
          );
        case resetPasswordEndpoints.resetPassword:
        case resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]:
          return resetPasswordClient(defaultRequestInit, overrideInput);
        case resetReadOnlyPasswordEndpoints.resetReadOnlyPassword:
        case resetReadOnlyPasswordEndpoints[
          "POST /storagezone/resetReadOnlyPassword?id=:id"
        ]:
          return resetReadOnlyPasswordClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${storageZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return storageZoneClient;
}
