import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import { Ticket } from "../types";

export interface GetTicketListRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
  /**
   * current page of tickets list
   * @example 1
   */
  page?: number;
  /**
   * number of tickets per page
   * @example 100
   */
  perPage?: number;
}

export type GetTicketListResponse = {
  /**
   * list of tickets
   */
  Items: Ticket[];
  /**
   * current page in ticket list
   * @example 1
   */
  CurrentPage: number;
  /**
   * total number of tickets in all pages
   * @example 3
   */
  TotalItems: number;
  /**
   * ticket list has more pages
   * @example false
   */
  HasMoreItems: boolean;
};

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
  { ApiKey, page, perPage }: GetTicketListRequest = {}
): Promise<GetTicketListResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(ApiKey && { ApiKey }),
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
