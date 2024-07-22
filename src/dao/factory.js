import { objectConfig } from "../config";

export let ProductsDao;
export let CartsDao;
export let UsersDao;

switch(objectConfig.persistance) {
    case "MEMORY":
        break;
    case "FS":
        const { default: ProductDaoFs } = await import("./FS/productManager.js")
        ProductsDao = ProductDaoFs;
        break;
    default: //MONGO

        const { default: ProductDaoMongo } = await import("./MONGO/productManagerMongo.js")
        ProductsDao = ProductDaoMongo;

        const { default: CartDaoMongo } = await import("./MONGO/cartManagerMongo.js")
        CartsDao = CartDaoMongo;

        const { default: UserDaoMongo } = await import("./MONGO/userManagerMongo.js")
        UsersDao = UserDaoMongo;

        break;
}