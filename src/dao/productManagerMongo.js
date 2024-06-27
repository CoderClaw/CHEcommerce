
import { prodModel } from "../dao/models/Product.model.js";

export default class ProductManagerMongo{   

    constructor(){}

    async addProduct(body){
        
        const {title,description,code,price,status,stock,category,thumbnails} = body;

        const response = await prodModel.create({title,description,code,price,status:true,stock,category,thumbnails:"thumbnail"});

        return response;
    }

    async getProducts(query){

        let products = [];
    
        if(query.limit){
            products = await prodModel.find().limit(parseInt(query.limit));
        }else if(query.sort){
            if(query.sort === "asc"){
                products = await prodModel.find().sort({price: 1});
            }else{
                products = await prodModel.find().sort({price: -1});
            }        
        }else if(query.page){
            products = await prodModel.paginate({},{limit:5,page:query.page});
        }else if(query.category){
            products = await prodModel.aggregate([
               {$match: {category:query.category}}
            ])
        }else if(query.status){
            products = await prodModel.aggregate([
               {$match: {status:query.status}}
            ])
        }else{
            products = await prodModel.paginate({},{limit:5,page:1});       
        }

        return products;

    }

    async getProductById(pid){
        
        const product = await prodModel.findOne({_id: pid});
        return product;
        
    }

    async updateProduct(id,obj){
        
        const response = await prodModel.findOneAndUpdate({_id: id},obj);
        
        return response;

    }

    async deleteProduct(id){
        
        const response = await prodModel.deleteOne({_id:id});
        
        return response;

    }
    
}   











