/* import UserController from '../controller/user.controller';

const express = require('express')
const router = express.Router()

//get user info
router.get("", userController.getUserByToken)

//single product page
router.post("/add-to-cart",  userController.addProducttoCart);

//shopping cart page
router.post("/cart/create-order",  userController.createOrder);
router.post("/cart/remove-from-cart",  userController.removeFromCart);
router.post("/cart/empty-cart",  userController.emptyCart);
router.post("/cart/modify-cartitem",  userController.modifyProductQty);
router.get("/cart",  userController.getAllCartItems);

//orders
router.get("/orders", userController.getAllOrders);
router.get("/orders/:orderID", userController.getOrderById);

module.exports = router */

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

