import { deepmerge } from "deepmerge-ts";
import { FetchError } from "../../../utilities";
import { u } from "../untypeable";

export interface ResetPasswordRequest {
  /**
   * User-specific API Access Key
   * @example "cb1a7c68-89a0-462a-9495-13ebd7366cfe"
   */
  apiKey?: string;
  /**
   * The ID of the storage zone that should have the password reset
   * @example 270299
   */
  id: number;
}

export type ResetPasswordResponse = void;

export const resetPassword = u
  .input<ResetPasswordRequest>()
  .output<ResetPasswordResponse>();

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
  { apiKey, id }: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  const overrideOptions: RequestInit = {
    headers: {
      ...(apiKey && { AccessKey: apiKey }),
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
