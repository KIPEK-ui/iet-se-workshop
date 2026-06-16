import { HttpInterceptorFn } from '@angular/common/http';

export const refreshtokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
