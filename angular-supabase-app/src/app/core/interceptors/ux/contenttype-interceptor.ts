import { HttpInterceptorFn } from '@angular/common/http';

export const contenttypeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
