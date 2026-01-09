/**
 * Logging Interceptor
 * 
 * This interceptor logs all HTTP requests and responses.
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  
  console.log(`[HTTP] ${req.method} ${req.url}`);
  
  return next(req).pipe(
    tap({
      next: (event) => {
        const elapsed = Date.now() - started;
        console.log(`[HTTP] ${req.method} ${req.url} completed in ${elapsed}ms`);
      },
      error: (error) => {
        const elapsed = Date.now() - started;
        console.error(`[HTTP] ${req.method} ${req.url} failed in ${elapsed}ms`, error);
      }
    })
  );
};
