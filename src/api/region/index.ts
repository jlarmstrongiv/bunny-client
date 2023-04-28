import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  regionList,
  regionListClient,
  regionListEndpoints,
} from "./regionList";

const countriesRouter = u.router({
  [regionListEndpoints["regionList"]]: regionList,
  [regionListEndpoints["GET /region"]]: regionList,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns regionClient
 *
 * @example
 * ```ts
 * const regionClient = createRegionClient({
 *   headers: {
 *     AccessKey: API_ACCESS_KEY,
 *   },
 * });
 *
 * const response = await regionClient("regionList");
 * ```
 */
export function createRegionClient(defaultRequestInit: RequestInit = {}) {
  const regionClient = createTypeLevelClient<typeof countriesRouter>(
    async (path, input) => {
      switch (path) {
        case regionListEndpoints["regionList"]:
        case regionListEndpoints["GET /region"]:
          return regionListClient(defaultRequestInit, input);
        default:
          throw new Error(
            `[${regionClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return regionClient;
}