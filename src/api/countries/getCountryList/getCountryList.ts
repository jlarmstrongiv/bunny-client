import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface Country {
  /**
   * Country name
   * @example "United Kingdom"
   */
  Name: string;
  /**
   * Country two-digit [ISO country code](https://web.archive.org/web/20230427223803/https://www.nationsonline.org/oneworld/country_code_list.htm)
   * @example "GB"
   */
  IsoCode: string;
  /**
   * Country is part of the [European Union](https://web.archive.org/web/20230427223937/https://en.wikipedia.org/wiki/European_Union)
   * @example false
   */
  IsEU: boolean;
  /**
   * Country tax rate out of 100 percent
   * in the [European Union](https://web.archive.org/web/20230427223937/https://en.wikipedia.org/wiki/European_Union), this is the VAT tax rate
   * @example 25
   */
  TaxRate: number;
  /**
   * Url of a 512x512 png with a circular country flag with a grey (#e1dfdf) background color
   */
  FlagUrl: string;
  /**
   * Country [Points of Presence](https://web.archive.org/web/20230427225159/https://www.imperva.com/learn/performance/what-is-cdn-how-it-works/) [list](https://web.archive.org/web/20230427225239/https://bunny.net/network/) of abbreviations
   * @example "NY"
   */
  PopList: string[];
}

export interface GetCountryListRequest {
  /**
   * User-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
}

export type GetCountryListResponse = Country[];

export const getCountryList = u
  .input<GetCountryListRequest>()
  .output<GetCountryListResponse>();

const url = "https://api.bunny.net/country";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getCountryListEndpoints = {
  getCountryList: "getCountryList",
  "GET /country": "GET /country",
} as const;

export async function getCountryListClient(
  defaultRequestInit: RequestInit,
  { apiKey }: GetCountryListRequest = {}
): Promise<GetCountryListResponse> {
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

  const json: GetCountryListResponse = await response.json();

  return json;
}
