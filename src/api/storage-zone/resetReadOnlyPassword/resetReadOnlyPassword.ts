import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface ResetReadOnlyPasswordRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  ApiKey?: string;
  /**
   * The ID of the storage zone that should have the read-only password reset
   * @example 270299
   */
  id: number;
}

export type ResetReadOnlyPasswordResponse = void;

export const resetReadOnlyPassword = u
  .input<ResetReadOnlyPasswordRequest>()
  .output<ResetReadOnlyPasswordResponse>();

const url = "https://api.bunny.net/storagezone/resetReadOnlyPassword";
const options: RequestInit = {
  method: "POST",
};

export const resetReadOnlyPasswordEndpoints = {
  resetReadOnlyPassword: "resetReadOnlyPassword",
  "POST /storagezone/resetReadOnlyPassword?id=:id":
    "POST /storagezone/resetReadOnlyPassword?id=:id",
} as const;

export async function resetReadOnlyPasswordClient(
  defaultRequestInit: RequestInit,
  { ApiKey, id }: ResetReadOnlyPasswordRequest
): Promise<ResetReadOnlyPasswordResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(ApiKey && { ApiKey }),
    },
  };

  const urlSearchParameters = new URLSearchParams({
    id: id.toString(),
  }).toString();

  const overrideUrl = `${url}?${urlSearchParameters}`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
