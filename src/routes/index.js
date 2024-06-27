import {Router} from "express"
import prodRouter from "./api/products.router.js"
import cartRouter from "./api/cart.router.js"
import viewsRouter from "./view.router.js"


const router =  new Router();

//routes

router.use('/', viewsRouter)

router.use("/api/products", prodRouter)

router.use("/api/carts", cartRouter)

export default router;