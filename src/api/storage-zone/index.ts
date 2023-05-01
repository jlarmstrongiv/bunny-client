import { createTypeLevelClient } from "untypeable";
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
  deleteStorageZone,
  deleteStorageZoneClient,
  deleteStorageZoneEndpoints,
} from "./deleteStorageZone";
import {
  getStorageZone,
  getStorageZoneClient,
  getStorageZoneEndpoints,
} from "./getStorageZone";
import {
  getStorageZoneStatistics,
  getStorageZoneStatisticsClient,
  getStorageZoneStatisticsEndpoints,
} from "./getStorageZoneStatistics";
import {
  listStorageZones,
  listStorageZonesClient,
  listStorageZonesEndpoints,
} from "./listStorageZones";
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
import { u } from "./untypeable";
import {
  updateStorageZone,
  updateStorageZoneClient,
  updateStorageZoneEndpoints,
} from "./updateStorageZone";

const storageZoneRouter = u.router({
  [addStorageZoneEndpoints.addStorageZone]: addStorageZone,
  [addStorageZoneEndpoints["POST /storagezone"]]: addStorageZone,
  [checkTheStorageZoneAvailabilityEndpoints.checkTheStorageZoneAvailability]:
    checkTheStorageZoneAvailability,
  [checkTheStorageZoneAvailabilityEndpoints[
    "POST /storagezone/checkavailability"
  ]]: checkTheStorageZoneAvailability,
  [deleteStorageZoneEndpoints.deleteStorageZone]: deleteStorageZone,
  [deleteStorageZoneEndpoints["DELETE /storagezone/:id"]]: deleteStorageZone,
  [getStorageZoneEndpoints.getStorageZone]: getStorageZone,
  [getStorageZoneEndpoints["GET /storagezone/:id"]]: getStorageZone,
  [getStorageZoneStatisticsEndpoints.getStorageZoneStatistics]:
    getStorageZoneStatistics,
  [getStorageZoneStatisticsEndpoints["GET /storagezone/:id/statistics"]]:
    getStorageZoneStatistics,
  [listStorageZonesEndpoints.listStorageZones]: listStorageZones,
  [listStorageZonesEndpoints["GET /storagezone"]]: listStorageZones,
  [resetPasswordEndpoints.resetPassword]: resetPassword,
  [resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]]:
    resetPassword,
  [resetReadOnlyPasswordEndpoints.resetReadOnlyPassword]: resetReadOnlyPassword,
  [resetReadOnlyPasswordEndpoints[
    "POST /storagezone/resetReadOnlyPassword?id=:id"
  ]]: resetReadOnlyPassword,
  [updateStorageZoneEndpoints.updateStorageZone]: updateStorageZone,
  [updateStorageZoneEndpoints["POST /storagezone/:id"]]: updateStorageZone,
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
        case deleteStorageZoneEndpoints.deleteStorageZone:
        case deleteStorageZoneEndpoints["DELETE /storagezone/:id"]:
          return deleteStorageZoneClient(defaultRequestInit, overrideInput);
        case getStorageZoneEndpoints.getStorageZone:
        case getStorageZoneEndpoints["GET /storagezone/:id"]:
          return getStorageZoneClient(defaultRequestInit, overrideInput);
        case getStorageZoneStatisticsEndpoints.getStorageZoneStatistics:
        case getStorageZoneStatisticsEndpoints[
          "GET /storagezone/:id/statistics"
        ]:
          return getStorageZoneStatisticsClient(
            defaultRequestInit,
            overrideInput
          );
        case listStorageZonesEndpoints.listStorageZones:
        case listStorageZonesEndpoints["GET /storagezone"]:
          return listStorageZonesClient(defaultRequestInit, overrideInput);
        case resetPasswordEndpoints.resetPassword:
        case resetPasswordEndpoints["POST /storagezone/:id/resetPassword"]:
          return resetPasswordClient(defaultRequestInit, overrideInput);
        case resetReadOnlyPasswordEndpoints.resetReadOnlyPassword:
        case resetReadOnlyPasswordEndpoints[
          "POST /storagezone/resetReadOnlyPassword?id=:id"
        ]:
          return resetReadOnlyPasswordClient(defaultRequestInit, overrideInput);
        case updateStorageZoneEndpoints.updateStorageZone:
        case updateStorageZoneEndpoints["POST /storagezone/:id"]:
          return updateStorageZoneClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${storageZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return storageZoneClient;
}
