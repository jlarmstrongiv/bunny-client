import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import { type Ticket } from "../types";

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
   * List of tickets
   */
  Items: Ticket[];
  /**
   * Current page in ticket list
   * @example 1
   */
  CurrentPage: number;
  /**
   * Total number of tickets in all pages
   * @example 3
   */
  TotalItems: number;
  /**
   * Ticket list has more pages
   * @example false
   */
  HasMoreItems: boolean;
}

export const getTicketList = u
  .input<GetTicketListRequest>()
  .output<GetTicketListResponse>();

const url = "https://api.bunny.net/support/ticket/list";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getTicketListEndpoints = {
  getTicketList: "getTicketList",
  "GET /support/ticket/list": "GET /support/ticket/list",
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

  return response.json();
}
