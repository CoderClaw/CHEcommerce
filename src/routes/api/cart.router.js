import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";

const {
    getCarts,
    getCart,
    createCart,
    updateCart,
    updateCartProduct,
    deleteAll,
    deleteCart,
    addProduct
} = new CartController();

const router = new Router();

router.get('/', getCarts );
router.get('/:cid',getCart);
router.post('/', createCart);
router.post('/:cid/product/:pid',addProduct);
router.put('/:cid',updateCart);
router.put('/:cid/products/:pid',updateCartProduct);
router.delete('/:cid',deleteAll);
router.delete('/:cid/products/:pid',deleteCart);

export default router;