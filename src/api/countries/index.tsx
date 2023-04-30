import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  getCountryList,
  getCountryListClient,
  getCountryListEndpoints,
} from "./getCountryList";

const countriesRouter = u.router({
  [getCountryListEndpoints.getCountryList]: getCountryList,
  [getCountryListEndpoints["GET /country"]]: getCountryList,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns countriesClient
 *
 * @example
 * ```ts
 * const countriesClient = createCountriesClient({
 *   headers: {
 *     AccessKey: API_ACCESS_KEY,
 *   },
 * });
 *
 * const response = await countriesClient("getCountryList");
 * ```
 */
export function createCountriesClient(defaultRequestInit: RequestInit = {}) {
  const countriesClient = createTypeLevelClient<typeof countriesRouter>(
    async (path, input) => {
      switch (path) {
        case getCountryListEndpoints.getCountryList:
        case getCountryListEndpoints["GET /country"]:
          return getCountryListClient(defaultRequestInit, input);
        default:
          throw new Error(
            `[${countriesClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return countriesClient;
}
