
import express from "express";
import { Route } from "../types/route";

import UserController from "../controller/user.controller";

import validationMiddleware from "../middlewares/validation.middleware";
import { 
    bodyProdID, 
    bodyQuantity, 
    bodyModifyProductQuantity,
    paramOrderID
} from "../validations"

export default class GameRoute implements Route {
    path = '/game';
    router = express.Router();
    userController = new UserController();

    constructor(){
        this.initRoutes();
    }

    initRoutes(){
        let router = this.router;
        let userController = this.userController;
        //get user info
        router.get(
            "/:gameID", 
            userController.getUserByToken
        )
        router.post(
            "",
            userController.getUserActivate
        )
    }
}

