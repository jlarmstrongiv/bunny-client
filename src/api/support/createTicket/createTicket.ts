import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type { Ticket, CreateAttachment } from "../types";

// TODO: fill in all the id examples
export interface CreateTicketRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
  /**
   * ticket subject line
   * @example "Stream"
   */
  Subject?: string;
  /**
   * pull zone id related to this ticket
   */
  LinkedPullZone?: number;
  /**
   * video library id related to this ticket
   */
  LinkedVideoLibrary?: number;
  /**
   * dns zone id related to this ticket
   */
  LinkedDnsZone?: number;
  /**
   * ticket message
   * @example "My videos are buffering"
   */
  Message: string;
  /**
   * storage zone id related to this ticket
   */
  LinkedStorageZone?: number;
  /**
   * file attachments related to this ticket
   */
  Attachments?: CreateAttachment[];
}

export type CreateTicketResponse = Ticket;

export const createTicket = u
  .input<CreateTicketRequest>()
  .output<CreateTicketResponse>();

const url = "https://api.bunny.net/support/ticket/create";
const options: RequestInit = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

export const createTicketEndpoints = {
  createTicket: "createTicket",
  "POST /support/ticket/create": "POST /support/ticket/create",
} as const;

export async function createTicketClient(
  defaultRequestInit: RequestInit,
  { ApiKey, ...input }: CreateTicketRequest
): Promise<CreateTicketResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(ApiKey && { ApiKey }),
    },
    body: JSON.stringify(input),
  };

  const response = await fetch(
    url,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
