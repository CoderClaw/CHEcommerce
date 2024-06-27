import { productService } from "../service/index.js";

class ProductController {

    constructor(){
        this.service = productService;
    }

    getProducts = async (req,res)=>{

        const products = await this.service.getProducts(req.query)
        
        res.send({
            status: "success",
            payload: products.docs,
            totalPages:products.totalDocs,
            prevPage: products.hasPrevPage ? products.page-1 : null,
            nextPage: products.hasNextPage ? products.page+1 : null ,
            page:products.page,
            hasPrevPage:products.hasPrevPage,
            hasNextPage:products.hasNextPage,
            prevLink:products.hasPrevPage ? "http://localhost:8080/api/products?page=" + (products.page-1) : null ,
            nextLink:products.hasNextPage ? "http://localhost:8080/api/products?page=" + (products.page+1) : null ,
        })
    }

    getProduct = async (req,res)=>{
        const product = await this.service.getProductById(req.params.pid)        
        console.log(product)
        if(product){
            return res.send(product)
        }else{
            return res.send({
                error: "No se ha encontrado un producto con la id proporcionada"
            })
        }   
    }

    createProduct = async (req,res)=>{
        
        const response =await this.service.addProduct(req.body);
    
        if(response){
            res.status(200).send({staus: "success",payload: response}) 
        }else{
            res.status(401).send({staus: "error", payload: response}) 
        }
    }

    updateProduct = async (req,res)=>{

        const id = req.params.pid;
        const obj = req.body;
        
        const response = await this.service.updateProduct(id,obj)
    
        if(response){
            res.send(response) 
        }else{
            const products = await prodModel.find({});
            res.send(products) 
        }
    }

    deleteProduct = async (req,res)=>{
        const pid = req.params.pid;
        const response = await this.service.deleteProduct(pid);
        if(response){
            res.send(response) 
        }else{
            const products = await prodModel.find({});
            res.send(products) 
        }
    }
}

export default ProductController;