import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable, InternalServerErrorException,
  NestInterceptor,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error => {
          if (error instanceof DomainError) {
            return throwError(() => this.httpExceptionFactory(error));
          }

          return throwError(error);
        }),
      );
  }

  private httpExceptionFactory(error: DomainError): HttpException {
    switch (error.errorCode) {
      case ErrorCode.DATA_FORMAT:
        return new BadRequestException({
          errorType: error.constructor.name,
          occurredOn: error.occurredOn,
          statusCode: 400,
          message: error.message,
          stack: error.stack?.split('\n').map((trace: string) => trace.trim())
        });

      case ErrorCode.NOT_FOUND:
        return new NotFoundException({
          errorType: error.constructor.name,
          occurredOn: error.occurredOn,
          statusCode: 404,
          message: error.message,
          stack: error.stack?.split('\n').map((trace: string) => trace.trim())
        });
      case ErrorCode.AUTHORIZATION_ERROR:
        return new UnauthorizedException({
          errorType: error.constructor.name,
          occurredOn: error.occurredOn,
          statusCode: 401,
          message: error.message,
          stack: error.stack?.split('\n').map((trace: string) => trace.trim())
        });
      case ErrorCode.APPLICATION_ERROR:
      case ErrorCode.EXTERNAL_PROVIDER_ERROR:
        return new InternalServerErrorException({
          errorType: error.constructor.name,
          occurredOn: error.occurredOn,
          statusCode: 500,
          message: error.message,
          stack: error.stack?.split('\n').map((trace: string) => trace.trim())
        });
      default:
        return new BadRequestException({
          errorType: error.constructor.name,
          occurredOn: error.occurredOn,
          statusCode: 400,
          message: error.message,
          stack: error.stack?.split('\n').map((trace: string) => trace.trim())
        });
    }
  }
}
