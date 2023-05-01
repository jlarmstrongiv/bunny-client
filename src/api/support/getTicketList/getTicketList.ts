import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { type Ticket } from "../types";
import { u } from "../untypeable";

export interface GetTicketListRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * Current page of tickets list
   * @example 1
   */
  page?: number;
  /**
   * Number of tickets per page
   * @example 100
   */
  perPage?: number;
}

export interface GetTicketListResponse {
  /**
   * Current page in ticket list
   * @example 1
   */
  CurrentPage: number;
  /**
   * Ticket list has more pages
   * @example false
   */
  HasMoreItems: boolean;
  /**
   * List of tickets
   */
  Items: Ticket[];
  /**
   * Total number of tickets in all pages
   * @example 3
   */
  TotalItems: number;
}

export const getTicketList = u
  .input<GetTicketListRequest>()
  .output<GetTicketListResponse>();

const url = "https://api.bunny.net/support/ticket/list";
const options: RequestInit = {
  headers: {
    accept: "application/json",
  },
  method: "GET",
};

export const getTicketListEndpoints = {
  "GET /support/ticket/list": "GET /support/ticket/list",
  getTicketList: "getTicketList",
} as const;

export async function getTicketListClient(
  defaultRequestInit: RequestInit,
  { apiKey, page, perPage }: GetTicketListRequest = {}
): Promise<GetTicketListResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    ...(typeof page === "number" && { page: page.toString() }),
    ...(typeof perPage === "number" && { perPage: perPage.toString() }),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: GetTicketListResponse = await response.json();

  return json;
}
