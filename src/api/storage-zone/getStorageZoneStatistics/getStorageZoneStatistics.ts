import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface GetStorageZoneStatisticsRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The ID of the storage zone
   * @example 270299
   */
  id: number;
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
}

export type GetStorageZoneStatisticsResponse = {
  /**
   * key: ISO 8601 date and time
   *
   * value: storage used
   *
   * @example { "2023-03-29T00:00:00Z": 9274615899, }
   */
  StorageUsedChart: Record<string, number>;
  /**
   * key: ISO 8601 date and time
   *
   * value: total file count
   *
   * @example { "2023-03-29T00:00:00Z": 191475, }
   */
  FileCountChart: Record<string, number>;
};

export const getStorageZoneStatistics = u
  .input<GetStorageZoneStatisticsRequest>()
  .output<GetStorageZoneStatisticsResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getStorageZoneStatisticsEndpoints = {
  getStorageZoneStatistics: "getStorageZoneStatistics",
  "GET /storagezone/:id/statistics": "GET /storagezone/:id/statistics",
} as const;

export async function getStorageZoneStatisticsClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id, dateFrom, dateTo }: GetStorageZoneStatisticsRequest
): Promise<GetStorageZoneStatisticsResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  }).toString();

  const overrideUrl = `${url}/${id}/statistics?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
