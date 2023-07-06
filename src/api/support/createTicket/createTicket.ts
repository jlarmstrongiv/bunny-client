import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import type { CreateAttachment, Ticket } from "../types";
import { u } from "../untypeable";

// TODO: fill in all the id examples
export interface CreateTicketRequest {
  /**
   * User-specific [API Key](https://dash.bunny.net/account/settings)
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * File attachments related to this ticket
   */
  Attachments?: CreateAttachment[];
  /**
   * Dns zone id related to this ticket
   */
  LinkedDnsZone?: number;
  /**
   * Pull zone id related to this ticket
   */
  LinkedPullZone?: number;
  /**
   * Storage zone id related to this ticket
   */
  LinkedStorageZone?: number;
  /**
   * Video library id related to this ticket
   */
  LinkedVideoLibrary?: number;
  /**
   * Ticket message
   * @example "My videos are buffering"
   */
  Message: string;
  /**
   * Ticket subject line
   * @example "Stream"
   */
  Subject?: string;
}

export type CreateTicketResponse = Ticket;

export const createTicket = u
  .input<CreateTicketRequest>()
  .output<CreateTicketResponse>();

const url = "https://api.bunny.net/support/ticket/create";
const options: RequestInit = {
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  method: "POST",
};

export const createTicketEndpoints = {
  createTicket: "createTicket",
  "POST /support/ticket/create": "POST /support/ticket/create",
} as const;

export async function createTicketClient(
  defaultRequestInit: RequestInit,
  { apiKey, ...input }: CreateTicketRequest,
): Promise<CreateTicketResponse> {
  const overrideOptions: RequestInit = {
    body: JSON.stringify(input),
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const response = await fetch(
    url,
    deepmerge(defaultRequestInit, options, overrideOptions),
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: CreateTicketResponse = await response.json();

  return json;
}
