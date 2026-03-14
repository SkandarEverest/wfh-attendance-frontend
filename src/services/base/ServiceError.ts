export class ServiceError<T = unknown> {
  message: string;
  status: number | null;
  data: T | null;

  constructor(
    message: string,
    status: number | null = null,
    data: T | null = null,
  ) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
