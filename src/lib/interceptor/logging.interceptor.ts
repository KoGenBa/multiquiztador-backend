import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const ctx = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - now;
        const warningMessage = elapsedTime > 2000 ? '!!!' : '';
        const logMessage =
          `[${ctx.req.method}] ${ctx.statusCode}: ${ctx.req.url} - ${elapsedTime}ms ${warningMessage}`.trim();

        if (warningMessage) {
          this.logger.warn(logMessage);
        } else {
          this.logger.log(logMessage);
        }
      }),
      catchError((err) => {
        this.logger.error(
          `[${ctx.req.method}] ${err.status ?? 500}: ${ctx.req.url} - ${
            Date.now() - now
          }ms`,
          err.stack,
        );

        return throwError(() => err);
      }),
    );
  }
}
