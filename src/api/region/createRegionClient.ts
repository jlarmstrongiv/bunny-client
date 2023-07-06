import { createTypeLevelClient } from "untypeable";
import {
  regionList,
  regionListClient,
  regionListEndpoints,
} from "./regionList";
import { u } from "./untypeable";

const countriesRouter = u.router({
  [regionListEndpoints.regionList]: regionList,
  [regionListEndpoints["GET /region"]]: regionList,
});

/**
 * @param defaultInput default input parameters for every request
 * @param defaultRequestInit default fetch parameters for every request
 * @returns regionClient
 *
 * @example
 * ```ts
 * const regionClient = createRegionClient({
 *   apiKey: API_ACCESS_KEY,
 * });
 *
 * const response = await regionClient("regionList");
 * ```
 */
export function createRegionClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {},
) {
  const regionClient = createTypeLevelClient<typeof countriesRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case regionListEndpoints.regionList:
        case regionListEndpoints["GET /region"]:
          return regionListClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${regionClient.name}]: no endpoint found named "${path}"`,
          );
      }
    },
  );
  return regionClient;
}
