import { Response } from "express";
import * as JSONbigint from 'json-bigint'; 

export const safeResJson = (data: any, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSONbigint.stringify(data));
}