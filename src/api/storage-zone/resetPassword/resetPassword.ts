import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface resetPasswordRequest {
  /**
   * user-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  AccessKey?: string;
  /**
   * The ID of the storage zone that should have the password reset
   * @example 270299
   */
  id: number;
}

export type resetPasswordResponse = void;

export const resetPassword = u
  .input<resetPasswordRequest>()
  .output<resetPasswordResponse>();

const url = "https://api.bunny.net/storagezone";
const options: RequestInit = {
  method: "POST",
};

export const resetPasswordEndpoints = {
  resetPassword: "resetPassword",
  "POST /storagezone/:id/resetPassword": "POST /storagezone/:id/resetPassword",
} as const;

export async function resetPasswordClient(
  defaultRequestInit: RequestInit,
  { AccessKey, id }: resetPasswordRequest
): Promise<resetPasswordResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(AccessKey && { AccessKey }),
    },
  };

  const overrideUrl = `${url}/${id}/resetPassword`;

  const response = await fetch(
    overrideUrl,
    deepmerge(defaultRequestInit, options, overrideOptions)
  );

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText, response);
  }
}
