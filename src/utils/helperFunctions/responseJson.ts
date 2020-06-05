import { Response } from "express";
import { IJsonResponse } from "../interfaces/IJsonResponse";

export default function responseJson<T>(res: Response, statusCode: number, data: T, quantity?: number) {
  const response: IJsonResponse = {
    statusCode,
    data
  };
  if (quantity) response.total = quantity;
  return res.status(response.statusCode).json(response);
}
