import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config();
import { errorMiddleware } from "./middlewares/errorHandling";

import { Route } from "./types/route";
import MatchRoute from "./routes/match.route";

class App {
    app: Application;
    port: number;
    constructor(routes: Route[]){
        this.app = express();
        this.port = Number(process.env.PORT);
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
    new MatchRoute(),
]);
app.listen();