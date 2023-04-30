import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface Region {
  /**
   * Region id
   * @example 15
   */
  Id: number;
  /**
   * Region name, composed of `${ContinentCode}: ${RegionName}, ${RegionCode}`
   * @example "OC: Sydney, SYD"
   * @example "NA:  Honolulu, HI"
   */
  Name: string;
  /**
   * Region price per gigabyte in dollars (USD$)
   * @example 0.03
   */
  PricePerGigabyte: number;
  /**
   * Region code
   * @example "SYD"
   */
  RegionCode: string;
  /**
   * Region [continent code](https://web.archive.org/web/20230428180958/https://gist.github.com/alyssaq/3415363a18610d22f0d307bcaac857cd)
   * @example "OC"
   */
  ContinentCode: string;
  /**
   * Region [country code](https://web.archive.org/web/20230428180958/https://gist.github.com/alyssaq/3415363a18610d22f0d307bcaac857cd)
   * @example "AU"
   */
  CountryCode: string;
  /**
   * Region latitude
   * @example -33.8674869
   */
  Latitude: number;
  /**
   * Region longitude
   * @example 151.20699020000006
   */
  Longitude: number;
  /**
   * Allow latency routing
   * @example true
   */
  AllowLatencyRouting: boolean;
}

export interface RegionListRequest {
  /**
   * User-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
}

export type RegionListResponse = Region[];

export const regionList = u
  .input<RegionListRequest>()
  .output<RegionListResponse>();

const url = "https://api.bunny.net/region";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const regionListEndpoints = {
  regionList: "regionList",
  "GET /region": "GET /region",
} as const;

export async function regionListClient(
  defaultRequestInit: RequestInit,
  { apiKey }: RegionListRequest = {}
): Promise<RegionListResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const response = await fetch(
    url,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: RegionListResponse = await response.json();

  return json;
}
