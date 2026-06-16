import { HttpInterceptorFn } from '@angular/common/http';

export const authtokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
