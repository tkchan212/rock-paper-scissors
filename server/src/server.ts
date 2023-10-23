import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config();
import { errorMiddleware } from "./middlewares/errorHandling";

import { Route } from "./types/route";
import AuthRoute from "./routes/auth.route";
import adminRoute from "./routes/admin.route";
import UserRoute from "./routes/user.route";
import ShopRoute from "./routes/shop.route";
/* const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/database');
const app = express();
const dotenv = require('dotenv');
const authMiddleware = require("./middlewares/auth.middleware");
const { errorMiddleware } = require('./middlewares/errorHandling'); */
/* 
dotenv.config();
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:5173"
}))

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const authRoute = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user-account');
const shopRoutes = require('./routes/shop');
app.use('/admin', adminRoutes)
app.use('/user-account', authMiddleware, userRoutes)
app.use(authRoute)
app.use(shopRoutes)

//for serving image
//app.use(express.static('public')); 
app.use(express.static(path.join(__dirname, 'public')))
//both serving doesn't work, skip first
app.use(errorMiddleware)

app.use((req, res, next)=> {
    res.status(404).send('<h1> Page not found </h1>');
});

app.listen(9090);
 */

class App {
    app: Application;
    port: number;
    constructor(routes: Route[]){
        this.app = express();
        this.port = Number(process.env.SERVER_PORT);
        this.initFrontMiddlewares();
        this.initRoutes(routes);
        this.initBackMiddlewares();
    }
    initFrontMiddlewares(){
        const app = this.app;
        app.use(cors({origin: process.env.FRONTEND_ADDRESS}))
        app.use(bodyParser.json());
        app.use(express.static('public')); 
    }
    initBackMiddlewares(){
        this.app.use(errorMiddleware);
    }
    initRoutes(routes: Route[]){
        routes.forEach(route => {
            this.app.use(route.path, route.router);    
        });
    }
    listen(){
        this.app.listen(this.port, () => console.log(`Server is listening on port ${this.port}!`));
    }
}

const app = new App([
    new adminRoute(),
    new AuthRoute(),
    new UserRoute(),
    new ShopRoute(),
    
]);
app.listen();