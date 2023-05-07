import { createTypeLevelClient } from "untypeable";
import {
  addPullZone,
  addPullZoneClient,
  addPullZoneEndpoints,
} from "./addPullZone";
import { u } from "./untypeable";

const countriesRouter = u.router({
  [addPullZoneEndpoints.addPullZone]: addPullZone,
  [addPullZoneEndpoints["POST /pullzone"]]: addPullZone,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns pullZoneClient
 *
 * @example
 * ```ts
 * const pullZoneClient = createPullZoneClient({
 *   apiKey: API_ACCESS_KEY,
 * });
 *
 * const response = await pullZoneClient("listPullZones");
 * ```
 */
export function createPullZoneClient(
  defaultInput: Record<string, any>,
  defaultRequestInit: RequestInit = {}
) {
  const pullZoneClient = createTypeLevelClient<typeof countriesRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case addPullZoneEndpoints.addPullZone:
        case addPullZoneEndpoints["POST /pullzone"]:
          return addPullZoneClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${pullZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return pullZoneClient;
}
