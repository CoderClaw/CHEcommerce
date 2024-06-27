import CartManagerMongo from "../dao/cartManagerMongo.js";
import ProductManagerMongo from "../dao/productManagerMongo.js"
import UsersManagerMongo from "../dao/userManagerMongo.js"

export const productService = new ProductManagerMongo();
export const cartService = new CartManagerMongo();
export const userService = new UsersManagerMongo();
