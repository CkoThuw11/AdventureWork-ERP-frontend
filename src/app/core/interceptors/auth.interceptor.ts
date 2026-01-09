/**
 * HTTP Interceptor for Authentication
 * 
 * This interceptor adds authentication headers to all HTTP requests.
 */

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // In a real app, you would get the token from a service
  // const token = inject(AuthService).getToken();
  
  // For now, just pass through
  // When auth is implemented, clone the request and add headers:
  // const authReq = req.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });
  
  return next(req);
};
