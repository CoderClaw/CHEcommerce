
import { prodModel } from "./models/Product.model.js";
import Dao from "./dao.js";

export default class ProductManagerMongo{   

    constructor(){
        this.model = prodModel;
        this.dao = new Dao(this.model);
    }

    async addProduct(body){
        
        const {title,description,code,price,status,stock,category,thumbnails} = body;

        const response = await this.dao.create({title,description,code,price,status:true,stock,category,thumbnails:"thumbnail"});

        return response;
    }

    async getProducts(query){

        let products = [];
    
        if(query.limit){
            products = await this.dao.getAll().limit(parseInt(query.limit));
        }else if(query.sort){
            if(query.sort === "asc"){
                products = await this.dao.getAll().sort({price: 1});
            }else{
                products = await this.dao.getAll().sort({price: -1});
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
        
        const product = await this.dao.get({_id: pid});
        return product;
        
    }

    async updateProduct(id,obj){
        
        const response = await this.dao.update({_id: id},obj);
        
        return response;

    }

    async deleteProduct(id){
        
        const response = await this.dao.delete({_id:id});
        
        return response;

    }
    
}   











