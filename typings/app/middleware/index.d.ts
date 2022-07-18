// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrCatch from '../../../app/middleware/errCatch';
import ExportValidator from '../../../app/middleware/validator';

declare module 'egg' {
  interface IMiddleware {
    errCatch: typeof ExportErrCatch;
    validator: typeof ExportValidator;
  }
}
