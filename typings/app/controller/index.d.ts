// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGetMovies from '../../../app/controller/getMovies';

declare module 'egg' {
  interface IController {
    getMovies: ExportGetMovies;
  }
}
