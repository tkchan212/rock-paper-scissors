/* const shopControllers = require('../controller/shop.controller');

const express = require('express')
const router = express.Router()

//single product page
router.get("/products/:prodID",  shopControllers.getProductById);

//catalog
router.get("/products",  shopControllers.getAllProducts);
router.use((req, res, next)=> {
    res.status(404).send('<h1> Page not found </h1>');
});

module.exports = router */

import express from "express";
import { Route } from "../types/route";
import ShopController from "../controller/shop.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { paramsProdID } from "../validations";

export default class ShopRoute implements Route {
    path = '/';
    router = express.Router();
    shopController = new ShopController();

    constructor(){
        this.initRoutes();
    }

    initRoutes(){
        let router = this.router;
        let shopController = this.shopController;
        router.get(
            "/products/:prodID", 
            validationMiddleware(paramsProdID, "params"),
            shopController.getProductById
        );
        router.get("/products",  shopController.getAllProducts);
        router.post("/contact", shopController.postContactForm);
        router.use((req, res, next)=> {
            res.status(404).send('<h1> Page not found </h1>');
        });
    }
}

