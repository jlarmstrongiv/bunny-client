import { CustomError } from "ts-custom-error";

export class FetchError extends CustomError {
  public constructor(
    public code: number,
    public reason: string,
    public response: Response,
  ) {
    super(`${code}: ${reason}`);
  }
}
