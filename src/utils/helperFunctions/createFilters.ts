import { Types } from "mongoose";
import { IObject } from "../interfaces/IObject";

export default function createFilters(query: IObject, rules: Map<string, string>): IObject {
  const filters: IObject = {};
  for (const key in query) {
    const value = query[key];
    const type = rules.get(key);
    console.log(key, value, type);
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