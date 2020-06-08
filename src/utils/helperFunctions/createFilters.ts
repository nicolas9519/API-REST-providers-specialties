import { QueryFindOptions, Types } from "mongoose";
import { IObject } from "../interfaces/IObject";

interface queryData {
  paging: QueryFindOptions;
  sort: IObject<any>;
  filters: IObject<any>
}

export default function organizeQuery(query: IObject<any>, rules: IObject<any>): queryData {
  let paging: QueryFindOptions = {};
  if (query.offSet || query.limit) {
    paging = createPaging(query.offSet, query.limit);
    delete query.offSet;
    delete query.limit;
  }
  let sort: IObject<number> = {};
  if (query.sort) {
    sort = createSort(query.sort);
    delete query.sort;
  }
  let filters: IObject<any> = {};
  if (Object.keys(query).length) {
    filters = createFilters(query, rules);
  }
  return {
    paging,
    sort,
    filters
  }
}

function createPaging(offSet: number, limit: number): QueryFindOptions {
  const paging: QueryFindOptions = {
    skip: offSet || 0,
    limit: limit || 20,
  };
  return paging;
}

function createSort(sort: string): IObject<number> {
  const fields: string[] = sort.split(',');
  const finalSort: IObject<number> = {};
  for (const field of fields) {
    if (field.substr(0, 1) === '-') {
      const key = field.substr(1);
      finalSort[key] = -1;
    } else {
      finalSort[field] = 1;
    }
  }
  return finalSort;
}

function createFilters(query: IObject<any>, rules: IObject<string>): IObject<any> {
  const filters: IObject<any> = {};
  for (const key in query) {
    const value = query[key];
    const type = rules[key];
    if (type === 'ObjectId') {
      filters[`${key}._id`] = new Types.ObjectId(value);
    } else if (type === 'date') {
      const startDate = new Date(value).setHours(0, 0, 0, 0);
      const endDate = new Date(value).setHours(23, 59, 59, 59);
      filters[key] = { $gte: startDate, $lt: endDate };
    } else if (type === 'string') {
      const regex = new RegExp(value, 'gi');
      filters[key] = { $regex: regex };
    } else if (type === 'multiple') {
      const list = value.split(',');
      filters[key] = { $in: list };
    } else {
      filters[key] = value;
    }
  }
  return filters;
}
