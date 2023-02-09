
export interface ISuccessResponse {}

export interface IErrorResponse {
  code: string;
  message: string;
}

import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

export class CustomResponse {
  public success(data: any = {}): ISuccessResponse {
    return data;
  }
  public error(error: IErrorResponse): BadRequestException {
    return new BadRequestException(error);
  }
  public unauthorized(error: IErrorResponse): UnauthorizedException {
    return new UnauthorizedException(error);
  }
  public forbidden(error: IErrorResponse): ForbiddenException {
    return new ForbiddenException(error);
  }
}
