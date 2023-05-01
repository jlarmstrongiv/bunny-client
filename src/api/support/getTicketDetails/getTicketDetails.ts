import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import { type Ticket } from "../types";

export interface GetTicketDetailsRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * Ticket id
   * @example 196584
   */
  id: number;
}

export type GetTicketDetailsResponse = Ticket;

export const getTicketDetails = u
  .input<GetTicketDetailsRequest>()
  .output<GetTicketDetailsResponse>();

const url = "https://api.bunny.net/support/ticket/details";
const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const getTicketDetailsEndpoints = {
  getTicketDetails: "getTicketDetails",
  "GET /support/ticket/details/:id": "GET /support/ticket/details/:id",
} as const;

export async function getTicketDetailsClient(
  defaultRequestInit: RequestInit,
  { apiKey, id }: GetTicketDetailsRequest
): Promise<GetTicketDetailsResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const overrideUrl = `${url}/${id}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: GetTicketDetailsResponse = await response.json();

  return json;
}
