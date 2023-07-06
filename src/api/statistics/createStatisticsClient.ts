import { createTypeLevelClient } from "untypeable";
import {
  getStatistics,
  getStatisticsClient,
  getStatisticsEndpoints,
} from "./getStatistics";
import { u } from "./untypeable";

const statisticsRouter = u.router({
  [getStatisticsEndpoints.getStatistics]: getStatistics,
  [getStatisticsEndpoints["GET /statistics"]]: getStatistics,
});

/**
 * @param defaultInput default input parameters for every request
 * @param defaultRequestInit default fetch parameters for every request
 * @returns statisticsClient
 *
 * @example
 * ```ts
 * const statisticsClient = createStatisticsClient({
 *   apiKey: API_ACCESS_KEY,
 * });
 *
 * const response = await statisticsClient("getStatistics");
 * ```
 */
export function createStatisticsClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {},
) {
  const statisticsClient = createTypeLevelClient<typeof statisticsRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case getStatisticsEndpoints.getStatistics:
        case getStatisticsEndpoints["GET /statistics"]:
          return getStatisticsClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${statisticsClient.name}]: no endpoint found named "${path}"`,
          );
      }
    },
  );
  return statisticsClient;
}
