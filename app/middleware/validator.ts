import { Context } from 'egg';
interface sort {
  orderBy: string;
  order: 'desc' | 'asc';
}
export interface requestParam {
  dataSourceId: string;
  selectFields: string[];
  currentPage?: number;
  pageSize?: number;
  sort?: sort;
  groupBy?: string[];
}
// 参数校验
export default () => {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (ctx.request.method !== 'POST') {
      await next();
    } else {
      const {
        dataSourceId,
        selectFields,
        currentPage,
        pageSize,
        sort,
        groupBy,
      } = ctx.request.body as requestParam;

      // const sort: "desc"|'asc' = request?.sort
      let fields: string;

      try {
        fields = selectFields.join();
      } catch (e) {
        return (ctx.body = {
          err: 'selectFields: A parameter as string[] is required',
        });
      }
      if (!dataSourceId) {
        return (ctx.body = {
          err: 'dataSourceId: A parameter as string is required',
        });
      }
      if (!fields) {
        return (ctx.body = {
          err: 'selectFields: A parameter as string[] is required',
        });
      }
      if (
        sort !== undefined &&
        (typeof sort.orderBy !== 'string' ||
          (sort.order !== 'desc' && sort.order !== 'asc'))
      ) {
        return (ctx.body = {
          err: 'sort must be {orderBy:string;order:"desc"|"asc"}|undefined',
        });
      }
      if (currentPage !== undefined && typeof currentPage !== 'number') {
        return (ctx.body = {
          err: 'currentPage must be number',
        });
      }
      if (pageSize !== undefined && typeof pageSize !== 'number') {
        return (ctx.body = {
          err: 'pageSize must be number',
        });
      }
      if ((pageSize !== undefined) !== (currentPage !== undefined)  ) {
        return (ctx.body = {
          err: 'pageSize and currentPage must exist at the same time',
        });
      }
      if (
        groupBy !== undefined &&
        (!Array.isArray(groupBy) ||
          !groupBy.every((item) => typeof item === 'string'))
      ) {
        return (ctx.body = {
          err: 'groupBy must be string[]',
        });
      }
      await next();
    }
  };
};
