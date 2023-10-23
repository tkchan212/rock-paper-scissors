import { makeStdErr } from '../exceptions/HttpError';

import limit from 'express-rate-limit';

export const rateLimit = (max = 10, windowMs = 10000) =>
  limit({
    windowMs, 
    max, // Limit each IP to 10 requests per `window`
    message: makeStdErr("TOO_MANY_REQUEST"),
    keyGenerator: (req, res) => req.tokenData?.user?.id.toString() || req.ip,
  });

