import { Response } from "express";

import { IJsonResponse } from "../interfaces/IJsonResponse";

export default function responseJson<T>(res: Response, statusCode: number, data: T) {
  const response: IJsonResponse = {
    statusCode,
    data
  };
  return res.status(response.statusCode).json(response);
}
