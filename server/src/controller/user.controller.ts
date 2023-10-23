import { makeStdErr } from "../exceptions/HttpError";
import { handleError } from "../middlewares/errorHandling";
import { Controller } from "../types/request"
import Order from "../models/order";
import CartItem from "../models/cartitem";
import User from "../models/user";

//types
import { Order as OrderType, 
    OrderItem as OrderItemType,
    CartItem as CartItemType, 
    User as UserType } from "../types/user";
import { ResultSetHeader } from "mysql2";

export default class UserController {
    getUserByToken: Controller = handleError(
        (req, res, next) => {
            const { user } = req.tokenData;
            User.fetchUser(user.email)
            .then((result) => {
                let users = result[0] as UserType[]
                if (users.length == 0){
                    next(makeStdErr("USER_DNE"))
                } 
                else {
                    res.send(users[0])
                }
            })
            .catch((e) => {
                console.log("error", e)
                next(makeStdErr("DATABASE_ERROR"))
            })
        }
    )
    getUserActivate: Controller = handleError(
        async (req, res, next) => {
            const { user } = req.tokenData;
            //activate the account
            try {
                const userResult = (await User.fetchUser(user.email))[0] as UserType[];
                if (userResult.length == 0){
                    next(makeStdErr("USER_DNE"))
                }
                await User.activateUser(user.email);
                res.send(userResult[0])
            }
            catch {
                next(makeStdErr("DATABASE_ERROR"))
            }
        }
    ) 
    addProducttoCart: Controller = handleError(
        (req, res, next) => {
            const { prodID, quantity } = req.body;
            const { user } = req.tokenData;
            const cart = new CartItem(user.id);
            cart.findProductById(prodID).then(result => {
                let products = result[0] as CartItemType[];
                if (products.length === 0){
                    return cart.addToCart(prodID, quantity)
                }
                let existingQty = products[0].quantity;
                return cart.updateCartItem(prodID, existingQty + quantity)
            }).then(result => {
                //res.json(a)
                res.status(200).send('Product added to cart.')
            }).catch(error => console.log(error)) 
        }
    ) 
    createOrder: Controller = handleError(
        (req, res, next) => {
            const { user } = req.tokenData;
            const order = new Order(user.id);
            const cart = new CartItem(user.id);
            let orderID, total_amount;
            order.createOrder()
            .then(result => {
                orderID = (result[0] as ResultSetHeader).insertId;
            })
            .then(() => cart.fetchAll())
            .then(result => {
                let cartProducts = (result[0] as Array<CartItemType>).map(item => {
                    return {
                        ...item,
                        orderID
                    }
                });
                total_amount = cartProducts.reduce((a,b) => (a + parseFloat(b.price) * b.quantity), 0)
                order.insertOrderItems(cartProducts);
            })
            .then(() => cart.emptyCart())
            .then(() => order.updateOrderAmount(total_amount, orderID))
            .then(() => {
                let returnObj = {
                    message: 'Order created.',
                    orderID
                }
                res.status(200).json(returnObj)
            } )
            .catch(error => console.log(error))
        }
    ) 
    removeFromCart: Controller = handleError(
        (req, res, next) => {
            const prodID = req.body.prodID;
            const { user } = req.tokenData;
            const cart = new CartItem(user.id);
            cart.removeCartItem(prodID)
            .then(result => res.status(200).send('Cart item removed.'))
            .catch(error => console.log(error)) 
        }
    ) 
    emptyCart: Controller = handleError(
        (req, res, next) => {
            const { user } = req.tokenData;
            const cart = new CartItem(user.id);
            cart.emptyCart()
            .then(() => res.status(200).send('All cart item removed.'))
            .catch(error => console.log(error)) 
        }
    ) 
    modifyProductQty: Controller = handleError(
        (req, res, next) => {
            //2 ways: press + or - button
            const {prodID, action, existingQty } = req.body;
            const { user } = req.tokenData;
            const cart = new CartItem(user.id);
            if (action === "increase") {
                cart.updateCartItem(prodID, existingQty + 1)
                .then(result => res.status(200).send('Cart item quantity modified.'))
                .catch(error => console.log(error)) 
            } 
            else if (action === "decrease"){
                if (existingQty === 1) {
                    cart.removeCartItem(prodID)
                    .then(result => res.status(200).send('Cart item quantity modified.'))
                    .catch(error => console.log(error)) 
                } 
                cart.updateCartItem(prodID, existingQty -1)
                .then(result => res.status(200).send('Cart item quantity modified.'))
                .catch(error => console.log(error)) 
            }
            
        }
    ) 
    getAllCartItems: Controller = handleError(
        (req, res, next) => {
            const { user } = req.tokenData;
            const cart = new CartItem(user.id);
            cart.fetchAll()
            .then(result =>{
                let cartItems = result[0] as CartItemType[];
                cartItems = cartItems.map(item => {
                    return {
                        ...item,
                        id: item.prodID
                    }
                })
                res.json(cartItems)
            })
            .catch(error => console.log(error)) 
        }
    ) 
    getAllOrders: Controller = handleError(
        (req, res, next) => {
            const { user } = req.tokenData;
            const order = new Order(user.id);
            order.fetchAll()
            .then(result => {
                let allOrders = (result[0] as OrderType[]).map(item => {
                    return {
                        ...item,
                        total_amount: parseFloat(item.total_amount)
                    }
                });
                res.status(200).json(allOrders)
            })
            .catch(error => console.log(error))
        }
    ) 
    getOrderById: Controller = handleError(
        (req, res, next) => {
            const orderID = req.params.orderID;
            const { user } = req.tokenData;
            const order = new Order(user.id);
            order.findById(orderID)
            .then(result => {
                if ((result[0] as OrderItemType[]).length === 0) next(makeStdErr("ORDER_DNE"));
                else {
                    let order = (result[0] as OrderItemType[]).map(item => {
                        return {
                            ...item,
                            price: parseFloat(item.price)
                        }
                    });
                    res.status(200).json(order)
                }
            })
            .catch(error => console.log(error))
        }
    ) 

}