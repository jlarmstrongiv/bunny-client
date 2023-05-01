import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import type { CreateAttachment, Ticket } from "../types";
import { u } from "../untypeable";

export interface ReplyTicketRequest {
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
   * Ticket id
   * @example 196584
   */
  id: number;
  /**
   * Ticket message
   * @example "My videos are still buffering"
   */
  Message?: string;
}

export type ReplyTicketResponse = Ticket;

export const replyTicket = u
  .input<ReplyTicketRequest>()
  .output<ReplyTicketResponse>();

const url = "https://api.bunny.net/support/ticket";
const options: RequestInit = {
  headers: {
    "content-type": "application/json",
  },
  method: "POST",
};

export const replyTicketEndpoints = {
  "POST /support/ticket/:id/reply": "POST /support/ticket/:id/reply",
  replyTicket: "replyTicket",
} as const;

export async function replyTicketClient(
  defaultRequestInit: RequestInit,
  { apiKey, id, ...input }: ReplyTicketRequest
): Promise<ReplyTicketResponse> {
  const overrideOptions: RequestInit = {
    body: JSON.stringify(input),
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
    },
  };

  const overrideUrl = `${url}/${id}/reply`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  const json: ReplyTicketResponse = await response.json();

  return json;
}
