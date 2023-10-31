
import express from "express";
import { Route } from "../types/route";

import MatchController from "../controller/match.controller";

import validationMiddleware from "../middlewares/validation.middleware";
import { 
    bodyMove,
    bodyMatchwMove
} from "../validations"

export default class GameRoute implements Route {
    path = '/match';
    router = express.Router();
    matchController = new MatchController();

    constructor(){
        this.initRoutes();
    }

    initRoutes(){
        let router = this.router;
        let matchController = this.matchController;
        //get user info
        router.get(
            "/:selector", 
            matchController.getMatchBySelector
        )
        router.post(
            "",
            validationMiddleware(bodyMatchwMove),
            matchController.createMatchwithMove
        )
        router.post(
            "/:selector",
            validationMiddleware(bodyMove),
            matchController.addMove
        )
    }
}

