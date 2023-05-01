import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

// TODO: test after traffic
export interface Statistics {
  AverageOriginResponseTime: number;
  BandwidthCachedChart: Record<string, number>;
  BandwidthUsedChart: Record<string, number>;
  CacheHitRate: number;
  CacheHitRateChart: Record<string, number>;
  Error3xxChart: Record<string, number>;
  Error4xxChart: Record<string, number>;
  Error5xxChart: Record<string, number>;
  // TODO
  GeoTrafficDistribution: any; // {}
  OriginResponseTimeChart: Record<string, number>;
  OriginShieldBandwidthUsedChart: Record<string, number>;
  OriginShieldInternalBandwidthUsedChart: Record<string, number>;
  OriginTrafficChart: Record<string, number>;
  PullRequestsPulledChart: Record<string, number>;
  RequestsServedChart: Record<string, number>;
  TotalBandwidthUsed: number;
  TotalOriginTraffic: number;
  TotalRequestsServed: number;
  UserBalanceHistoryChart: Record<string, number>;
}

export interface GetStatisticsRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * The ISO 8601 start date of the statistics. If no value is passed, the last 30 days will be returned.
   * @example "2023-04-27T00:00:00Z"
   */
  dateFrom?: string;
  /**
   * The ISO 8601 end date of the statistics. If no value is passed, the last 30 days will be returned.
   * @example "2023-04-28T00:00:00Z"
   */
  dateTo?: string;
  /**
   * If true, the statistics data will be returned in hourly grouping.
   * @example false
   */
  hourly?: boolean;
  /**
   * If set, the respose will contain the non-2xx response
   * @example false
   */
  loadErrors?: boolean;
  /**
   * If set, the statistics will be only returned for the given Pull Zone
   */
  pullZone?: number;
  /**
   * If set, the statistics will be only returned for the given region ID
   */
  serverZoneId?: number;
}

export type GetStatisticsResponse = Statistics;

export const getStatistics = u
  .input<GetStatisticsRequest>()
  .output<GetStatisticsResponse>();

const url = "https://api.bunny.net/statistics";
const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const getStatisticsEndpoints = {
  "GET /statistics": "GET /statistics",
  getStatistics: "getStatistics",
} as const;

export async function getStatisticsClient(
  defaultRequestInit: RequestInit,
  {
    apiKey,
    dateFrom,
    dateTo,
    hourly = false,
    loadErrors = false,
    pullZone = -1,
    serverZoneId = -1,
  }: GetStatisticsRequest = {}
): Promise<GetStatisticsResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    hourly: hourly.toString(),
    loadErrors: loadErrors.toString(),
    pullZone: pullZone.toString(),
    serverZoneId: serverZoneId.toString(),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: GetStatisticsResponse = await response.json();

  return json;
}
