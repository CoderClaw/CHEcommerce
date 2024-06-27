import { cartService } from "../service/index.js"

export default class cartController {

    constructor(){
        this.service = cartService;
    }

    getCarts = async (req, res)=>{

        const carts = this.service.getCarts();
        
        if(req.query.limit){
            res.send(carts.slice(0,parseInt(req.query.limit)))
        }else{
            res.send(carts)
        }
        
    }

    getCart = async (req, res)=>{
        const cart = await this.service.getCartById(req.params.cid)
    
        if(cart){
            return res.send(cart.products)
        }else{
            return res.send({
                error: "No se ha encontrado un carrito con la id proporcionada"
            })
        }   
        
    }

    createCart = async (req, res)=>{
        try{
            await this.service.createCart;                    
            res.send("carrito creado con exito");
        }catch(err){
            console.log(err);
        }        
                
    }

    addProduct = async (req, res)=>{

        try{
            const resp = await this.service.addProdToCart(req.params);   
           
            const data = typeof resp === typeof "string" ? resp.split("#") : resp
            
            if(data[0] === "401" ){
                return res.status(401).send(data[1])
            }
            console.log(data)
            return res.send(data)
        }catch(error){
            console.log(data)
        }
    }

    updateCart = async (req, res)=>{

        const cart = await this.service.updateCart(req.params)        
        
        if(cart === "error"){
            return res.send("Error");
        }

        return res.send(cart)        
    }

    updateCartProduct = async (req, res)=>{

        const cart = await this.service.updateCartProduct(req.params)
    
        if(cart.split("#")[0] === "401"){
            res.status(401).send(cart.split("#")[1])
        }
        
        return res.send(cart)  
        
    }


    deleteAll = async (req, res)=>{

        const {cid} = req.params;
    
        const resp = await this.service.deleteAll(cid)
    
        if(resp !== "OK"){
            return res.send(resp)
        }

        return res.send("El carrito a sido borrado correctamente")  
      
    }

    deleteCart = async (req, res)=>{

        const resp = this.service.deleteProdFromCart(req.params)

        if(typeof resp === String){
            return res.send(resp)
        }
                
        res.send(resp)
        
    }
}