import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface CloseTicketRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
  /**
   * ticket id
   * @example 196584
   */
  id: number;
}

export type CloseTicketResponse = void;

export const closeTicket = u
  .input<CloseTicketRequest>()
  .output<CloseTicketResponse>();

const url = "https://api.bunny.net/support/ticket";
const options = {
  method: "POST",
};

export const closeTicketEndpoints = {
  closeTicket: "closeTicket",
  "POST /support/ticket/:id/close": "POST /support/ticket/:id/close",
} as const;

export async function closeTicketClient(
  defaultRequestInit: RequestInit,
  { ApiKey, id }: CloseTicketRequest
): Promise<CloseTicketResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(ApiKey && { ApiKey }),
    },
  };

  const overrideUrl = `${url}/${id}/close`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
