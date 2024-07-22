import CartManagerMongo from "../dao/MONGO/cartManagerMongo.js";
import ProductManagerMongo from "../dao/MONGO/productManagerMongo.js"
import UsersManagerMongo from "../dao/MONGO/userManagerMongo.js"

export const productService = new ProductManagerMongo();
export const cartService = new CartManagerMongo();
export const userService = new UsersManagerMongo();
