import { HttpException } from '@nestjs/common';

export class Response {
  private status: number;
  private message: string;
  private data: any;

  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static errorResponse(status: number, message: string) {
    return new HttpException(
      {
        status: status,
        message: message,
      },
      status,
    );
  }

  static successResponse(status: number, message: string, data: any) {
    return {
      status: status,
      message: message,
      data: data,
    };
  }
}
