import { Response } from "express";
import { IJsonResponse } from "../interfaces/IJsonResponse";

export default function responseJson<T>(res: Response, statusCode: number, data: T, quantity?: number) {
  const response: IJsonResponse = {
    data
  };
  if (quantity !== undefined) response.total = quantity;
  return res.status(statusCode).json(response);
}
