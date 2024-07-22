import { cartModel } from "./models/Cart.model.js";
import { productService } from "../../service/index.js";

export default class CartManagerMongo{
    constructor(){
        this.prodService = productService;
    }    

    async createCart(){
        
        const resp = await cartModel.create({});
        
        return "OK";  
    }

    async getCarts(){
        const response = await cartModel.find({}).populate("products.product");

        return response;
    }

    async getCartById(id){
        const cart = await cartModel.findOne({_id: id}).populate("products.product")
        return cart;
    }

    async addProdToCart(params){        
        
        const {cid, pid} = params;

        const cart = await cartModel.findById(cid).lean()
        const prod = await this.prodService.getProductById(pid);
        
        if(!prod){
            return "401#product not found";
        }
        
        if(!cart.products.find(obj => obj.product.toString() === prod._id.toString())){
            cart.products.push({
                product: pid,
                quantity: 1
            })
        }else{
            const selectedCart = cart.products.findIndex(obj => obj.product.toString() === prod._id.toString())
            cart.products[selectedCart].quantity++
        }        
    
        const resp = await cartModel.findByIdAndUpdate({_id:cid},cart);

        return resp;           
        
    }

    async updateCart(params){
        
        try{
            const {cid} = params;

            const cart = await cartModel.findById(cid).lean()
        
            cart.products = req.body;
        
            await cartModel.findByIdAndUpdate({_id: cid},cart)

            return cart;
        }catch(err){
            return "error";
        }       
        
    }

    async updateCartProduct(params){
        const {cid,pid} = params;
    
        const cart = await cartModel.findById(cid).lean()
    
        if(!cart){
            return"401#error, carrito no encontrado";
        }
        
        const prodIndex = cart.products.findIndex(prod=>prod.product == pid);
        if(prodIndex < 0){
            console.log(prodIndex)
            return "401#error, producto no encontrado en el carrito seleccionado";
        }else{
            cart.products[prodIndex].quantity = req.body.quantity;
    
            await cartModel.findByIdAndUpdate({_id: cid},cart)
            
            return res.send(cart)
        }   
    }

    async deleteAll(id){
        try{
            const cart = await cartModel.findById(id).lean()

            cart.products = []
        
            await cartModel.findByIdAndUpdate({_id: id},cart)

            return "OK";
        }catch(err){
            return err.message;
        }       
        
    }

    async deleteProdFromCart(params){
        try{
            const {cid,pid} = params;
    
            const cart = await cartModel.findById(cid).lean()
        
            cart.products = cart.products.filter(prod => prod.product != pid)
        
            await cartModel.findByIdAndUpdate({_id: cid},cart)

            return cart;

        }catch(err){
            return err.message;
        }       
        
    }
    
}   
