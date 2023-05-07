import { createTypeLevelClient } from "untypeable";
import {
  getCountryList,
  getCountryListClient,
  getCountryListEndpoints,
} from "./getCountryList";
import { u } from "./untypeable";

const countriesRouter = u.router({
  [getCountryListEndpoints.getCountryList]: getCountryList,
  [getCountryListEndpoints["GET /country"]]: getCountryList,
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
        case getCountryListEndpoints.getCountryList:
        case getCountryListEndpoints["GET /country"]:
          return getCountryListClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${pullZoneClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return pullZoneClient;
}
