export interface SocketResponse<T> {
  success: boolean;
  data: T;
  message: string;
  action: string;
}
