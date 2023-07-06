import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface GetStorageZoneStatisticsRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * The ISO 8601 start date of the statistics. If no value is passed, the last 30 days will be returned.
   * @example "2023-04-15T00:00:00Z"
   */
  dateFrom?: string;
  /**
   * The ISO 8601 end date of the statistics. If no value is passed, the last 30 days will be returned.
   * @example "2023-04-17T00:00:00Z"
   */
  dateTo?: string;
  /**
   * The ID of the storage zone
   * @example 270299
   */
  id: number;
}

export interface GetStorageZoneStatisticsResponse {
  /**
   * BUG: may be inaccurate with new or empty buckets
   *
   * key: ISO 8601 date and time
   *
   * value: total file count
   *
   * @example { "2023-03-29T00:00:00Z": 191475, }
   */
  FileCountChart: Record<string, number>;
  /**
   * BUG: may be inaccurate with new or empty buckets
   *
   * key: ISO 8601 date and time
   *
   * value: storage used
   *
   * @example { "2023-03-29T00:00:00Z": 9274615899, }
   */
  StorageUsedChart: Record<string, number>;
}

export const getStorageZoneStatistics = u
  .input<GetStorageZoneStatisticsRequest>()
  .output<GetStorageZoneStatisticsResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const getStorageZoneStatisticsEndpoints = {
  "GET /storagezone/:id/statistics": "GET /storagezone/:id/statistics",
  getStorageZoneStatistics: "getStorageZoneStatistics",
} as const;

export async function getStorageZoneStatisticsClient(
  defaultRequestInit: RequestInit,
  { apiKey, dateFrom, dateTo, id }: GetStorageZoneStatisticsRequest,
): Promise<GetStorageZoneStatisticsResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  }).toString();

  const overrideUrl = `${url}/${id}/statistics?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions),
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: GetStorageZoneStatisticsResponse = await response.json();

  return json;
}
