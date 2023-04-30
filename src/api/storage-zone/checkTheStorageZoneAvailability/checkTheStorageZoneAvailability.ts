import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface CheckTheStorageZoneAvailabilityRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
  /**
   * Determines the name of the zone that we are checking.
   *
   * The zone can be any in the [Points of Presence](https://web.archive.org/web/20230427225159/https://www.imperva.com/learn/performance/what-is-cdn-how-it-works/) [list](https://web.archive.org/web/20230427225239/https://bunny.net/network/) of abbreviations
   * @example "NY"
   */
  Name: string;
}

export type CheckTheStorageZoneAvailabilityResponse = {
  Available: boolean;
};

export const checkTheStorageZoneAvailability = u
  .input<CheckTheStorageZoneAvailabilityRequest>()
  .output<CheckTheStorageZoneAvailabilityResponse>();

const url = "https://api.bunny.net/storagezone/checkavailability";
const options: RequestInit = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
};

export const checkTheStorageZoneAvailabilityEndpoints = {
  checkTheStorageZoneAvailability: "checkTheStorageZoneAvailability",
  "POST /storagezone/checkavailability": "POST /storagezone/checkavailability",
} as const;

export async function checkTheStorageZoneAvailabilityClient(
  defaultRequestInit: RequestInit,
  { ApiKey, ...input }: CheckTheStorageZoneAvailabilityRequest
): Promise<CheckTheStorageZoneAvailabilityResponse> {
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
