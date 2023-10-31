import { Controller } from "../types/request";
export const handleError = (func: Controller): Controller => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        }
        catch(e){
            next(e)
        }
    }
}

export const errorMiddleware = (error, req, res, next) => {
    try {
        //well-defined error
        const { statusCode, message } = error;
        res.status(statusCode).json(message)
    }
    catch(e) {
        res.status(400).json(e.message)
    }
} 
