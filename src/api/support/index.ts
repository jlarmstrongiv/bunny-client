import { createTypeLevelClient } from "untypeable";
import { u } from "./untypeable";
import {
  getTicketList,
  getTicketListClient,
  getTicketListEndpoints,
} from "./getTicketList";
import {
  getTicketDetails,
  getTicketDetailsClient,
  getTicketDetailsEndpoints,
} from "./getTicketDetails";
import {
  closeTicket,
  closeTicketClient,
  closeTicketEndpoints,
} from "./closeTicket";
import {
  replyTicket,
  replyTicketClient,
  replyTicketEndpoints,
} from "./replyTicket";
import {
  createTicket,
  createTicketClient,
  createTicketEndpoints,
} from "./createTicket";

const statisticsRouter = u.router({
  [getTicketListEndpoints.getTicketList]: getTicketList,
  [getTicketListEndpoints["GET /support/ticket/list"]]: getTicketList,
  [getTicketDetailsEndpoints.getTicketDetails]: getTicketDetails,
  [getTicketDetailsEndpoints["GET /support/ticket/details/:id"]]:
    getTicketDetails,
  [closeTicketEndpoints.closeTicket]: closeTicket,
  [closeTicketEndpoints["POST /support/ticket/:id/close"]]: closeTicket,
  [replyTicketEndpoints.replyTicket]: replyTicket,
  [replyTicketEndpoints["POST /support/ticket/:id/reply"]]: replyTicket,
  [createTicketEndpoints.createTicket]: createTicket,
  [createTicketEndpoints["POST /support/ticket/create"]]: createTicket,
});

/**
 * @param defaultRequestInit default fetch parameters for every request
 * @returns statisticsClient
 *
 * @example
 * ```ts
 * const supportClient = createSupportClient({
 *   apiKey: API_ACCESS_KEY,
 * });
 *
 * const response = await supportClient("getTicketList");
 * ```
 */
export function createSupportClient(
  defaultInput: Record<string, any> = {},
  defaultRequestInit: RequestInit = {}
) {
  const supportClient = createTypeLevelClient<typeof statisticsRouter>(
    async (path, input) => {
      const overrideInput = {
        ...defaultInput,
        ...input,
      };

      switch (path) {
        case getTicketListEndpoints.getTicketList:
        case getTicketListEndpoints["GET /support/ticket/list"]:
          return getTicketListClient(defaultRequestInit, overrideInput);
        case getTicketDetailsEndpoints.getTicketDetails:
        case getTicketDetailsEndpoints["GET /support/ticket/details/:id"]:
          return getTicketDetailsClient(defaultRequestInit, overrideInput);
        case closeTicketEndpoints.closeTicket:
        case closeTicketEndpoints["POST /support/ticket/:id/close"]:
          return closeTicketClient(defaultRequestInit, overrideInput);
        case replyTicketEndpoints.replyTicket:
        case replyTicketEndpoints["POST /support/ticket/:id/reply"]:
          return replyTicketClient(defaultRequestInit, overrideInput);
        case createTicketEndpoints.createTicket:
        case createTicketEndpoints["POST /support/ticket/create"]:
          return createTicketClient(defaultRequestInit, overrideInput);
        default:
          throw new Error(
            `[${supportClient.name}]: no endpoint found named "${path}"`
          );
      }
    }
  );
  return supportClient;
}
