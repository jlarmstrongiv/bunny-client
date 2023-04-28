import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface resetReadOnlyPasswordRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The ID of the storage zone that should have the read-only password reset
   * @example 270299
   */
  id: number;
}

export type resetReadOnlyPasswordResponse = void;

export const resetReadOnlyPassword = u
  .input<resetReadOnlyPasswordRequest>()
  .output<resetReadOnlyPasswordResponse>();

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
  { AccessKey, id }: resetReadOnlyPasswordRequest
): Promise<resetReadOnlyPasswordResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
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
