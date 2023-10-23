import express from "express";
import { Route } from "../types/route";
import authControllers from "../controller/auth.controller";

//validation middleware
import validationMiddleware from "../middlewares/validation.middleware"; 
import { rateLimit } from "../middlewares/limit.middleware";
import { 
    bodyLogin
 } from "../validations";

class AuthRoute implements Route {
    path = '/';
    router = express.Router();
    authController = new authControllers();

    constructor(){
        this.initRoutes();
    }

    initRoutes(){
        let router = this.router;
        let authController = this.authController;
        router.post("/signup",  authController.signup);
        //validation middlware
        router.post("/login",  
            validationMiddleware(bodyLogin, "body"),
            authController.login
        );
        router.post("/get-long-token",  
            validationMiddleware(bodyLogin, "body"),
            authController.__getLongToken
        );
        router.post("/refresh-token", authController.refreshToken);
    }
}

export default AuthRoute;