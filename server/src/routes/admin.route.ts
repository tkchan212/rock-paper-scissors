import express from "express";
import { Route } from "../types/route";
import adminControllers from "../controller/admin.controller";
import multer from "multer";
import { rateLimit } from "../middlewares/limit.middleware";
import path from "path";
import { adminAuthMiddleware } from "../middlewares/auth.middleware";
import { makeStdErr } from "../exceptions/HttpError";

//validation middleware
import validationMiddleware from "../middlewares/validation.middleware"; 
import { 
    bodyProduct, paramsProdID,
    paramsUserID
 } from "../validations";

class AdminRoute implements Route {
    path = '/admin';
    router = express.Router();
    adminController = new adminControllers();
    //impose limit on file size and type
     imageUpload = multer({ 
        //dest: "public/product_img/",
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "public/product_img/")
              },
            filename: function (req, file, cb) {
              cb(null, file.originalname)
            }
        }), 
        limits: {
            fieldNameSize: 50,
            fileSize: 3000000, // 3 MB
        },
        fileFilter: (req, file, cb) => {
            const allowedExt = /jpeg|jpg|png/;
            const extname = allowedExt.test(
              path.extname(file.originalname).toLowerCase()
            );
            const mimetype = allowedExt.test(file.mimetype);
      
            if (mimetype && extname) {
              cb(null, true);
            } else {
              cb(makeStdErr("INVALID_DATA"));
            }
        },
    });
    constructor(){
        this.initMiddlewares();
        this.initRoutes();
    }

    initMiddlewares(){
        this.router.use(adminAuthMiddleware);
        this.router.use(rateLimit()); 
    }

    initRoutes(){
        let router = this.router;
        let adminController = this.adminController;
        router.get(
            "/products/:prodID", 
            validationMiddleware(paramsProdID, "params"), 
            adminController.getProductById
        );
        router.get(
            "/products",  
            adminController.getAllProducts
        );
        router.post(
            "/create-product", 
            //validationMiddleware(bodyProduct, "body"), removed temp bc it doesn't recognize formdata
            this.imageUpload.single("product_img"),
            adminController.addProduct,
        );
        /* router.post( //for testing
            "/create-product-temp", 
            this.imageUpload.single("product_img"),
        ); */
        router.delete(
            "/delete-product/:prodID", 
            validationMiddleware(paramsProdID, "params"),
            adminController.deleteProduct
        );
        router.put(
            "/edit-product/:prodID", 
            validationMiddleware(bodyProduct, "body"),
            adminController.editProduct
        );
        router.put(
            "/edit-product-image/:prodID", 
            this.imageUpload.single("product_img"),
            adminController.editProductImage
        );
        router.get(
            "/users",
            adminController.getAllUsers
        )
        router.post(
            "/suspend-user/:userID",
            validationMiddleware(paramsUserID, "params"),
            adminController.suspendUser
        )
        router.post(
            "/unsuspend-user/:userID",
            validationMiddleware(paramsUserID, "params"),
            adminController.unsuspendUser
        )
        
    }
}

export default AdminRoute;