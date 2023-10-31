import { PrismaClient } from "@prisma/client";
import { getNowInSecond } from "../utils/database";

const prismaClient = new PrismaClient()


/**
 * Middleware to add timestamp
 */
prismaClient.$use(async (params, next) => {
    let now: number | undefined = undefined;
    let addModifyAt = false;
    // auto add created_at
    if (
      params.action === 'create' &&
      params.args?.data
    ) {
      now = getNowInSecond();
      params.args.data.created_at = now;
      addModifyAt = true;
    }
  
    // auto update modified_at
    if (
      (params.action === 'update' || addModifyAt) &&
      params.args?.data
    ) {
      params.args.data.modified_at = now || getNowInSecond();
    }
    const result = await next(params);
    return result;
});
export default prismaClient;