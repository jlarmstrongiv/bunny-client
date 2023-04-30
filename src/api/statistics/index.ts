import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  getStatistics,
  getStatisticsClient,
  getStatisticsEndpoints,
} from "./getStatistics";

const statisticsRouter = u.router({
  [getStatisticsEndpoints["getStatistics"]]: getStatistics,
  [getStatisticsEndpoints["GET /statistics"]]: getStatistics,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns statisticsClient
 *
 * @example
 * ```ts
 * const statisticsClient = createStatisticsClient({
 *   headers: {
 *     ApiKey: API_ACCESS_KEY,
 *   },
 * });
 *
 * const response = await statisticsClient("getStatistics");
 * ```
 */
export function createStatisticsClient(defaultRequestInit: RequestInit = {}) {
  const statisticsClient = createTypeLevelClient<typeof statisticsRouter>(
    async (path, input) => {
      switch (path) {
        case getStatisticsEndpoints["getStatistics"]:
        case getStatisticsEndpoints["GET /statistics"]:
          return getStatisticsClient(defaultRequestInit, input);
        default:
          throw new Error(
            `[${statisticsClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return statisticsClient;
}
