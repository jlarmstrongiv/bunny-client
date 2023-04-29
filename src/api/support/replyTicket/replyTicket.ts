import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";
import type { Ticket, CreateAttachment } from "../types";

export interface ReplyTicketRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * ticket id
   * @example 196584
   */
  id: number;
  /**
   * ticket message
   * @example "My videos are still buffering"
   */
  Message?: string;
  /**
   * file attachments related to this ticket
   */
  Attachments?: CreateAttachment[];
}

export type ReplyTicketResponse = Ticket;

export const replyTicket = u
  .input<ReplyTicketRequest>()
  .output<ReplyTicketResponse>();

const url = "https://api.bunny.net/support/ticket";
const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

export const replyTicketEndpoints = {
  replyTicket: "replyTicket",
  "POST /support/ticket/:id/reply": "POST /support/ticket/:id/reply",
} as const;

export async function replyTicketClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id, ...input }: ReplyTicketRequest
): Promise<ReplyTicketResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
    body: JSON.stringify(input),
  };

  const overrideUrl = `${url}/${id}/reply`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }

  return response.json();
}
