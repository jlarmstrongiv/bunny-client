import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

// TODO: test after traffic
export interface Statistics {
  TotalBandwidthUsed: number;
  TotalOriginTraffic: number;
  AverageOriginResponseTime: number;
  OriginResponseTimeChart: Record<string, number>;
  TotalRequestsServed: number;
  CacheHitRate: number;
  BandwidthUsedChart: Record<string, number>;
  BandwidthCachedChart: Record<string, number>;
  CacheHitRateChart: Record<string, number>;
  RequestsServedChart: Record<string, number>;
  PullRequestsPulledChart: Record<string, number>;
  OriginShieldBandwidthUsedChart: Record<string, number>;
  OriginShieldInternalBandwidthUsedChart: Record<string, number>;
  OriginTrafficChart: Record<string, number>;
  UserBalanceHistoryChart: Record<string, number>;
  // TODO
  GeoTrafficDistribution: any; // {}
  Error3xxChart: Record<string, number>;
  Error4xxChart: Record<string, number>;
  Error5xxChart: Record<string, number>;
}

export interface GetStatisticsRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
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
   * If set, the statistics will be only returned for the given Pull Zone
   */
  pullZone?: number;
  /**
   * If set, the statistics will be only returned for the given region ID
   */
  serverZoneId?: number;
  /**
   * If set, the respose will contain the non-2xx response
   * @example false
   */
  loadErrors?: boolean;
  /**
   * If true, the statistics data will be returned in hourly groupping.
   * @example false
   */
  hourly?: boolean;
}

export type GetStatisticsResponse = Statistics;

export const getStatistics = u
  .input<GetStatisticsRequest>()
  .output<GetStatisticsResponse>();

const url = "https://api.bunny.net/statistics";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getStatisticsEndpoints = {
  getStatistics: "getStatistics",
  "GET /statistics": "GET /statistics",
} as const;

export async function getStatisticsClient(
  defaultRequestInit: RequestInit,
  {
    ApiKey,
    dateFrom,
    dateTo,
    pullZone = -1,
    serverZoneId = -1,
    loadErrors = false,
    hourly = false,
  }: GetStatisticsRequest = {}
): Promise<GetStatisticsResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(ApiKey && { ApiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    pullZone: pullZone.toString(),
    serverZoneId: serverZoneId.toString(),
    loadErrors: loadErrors.toString(),
    hourly: hourly.toString(),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
