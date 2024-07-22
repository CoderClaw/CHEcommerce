
export default class Dao{
    constructor(model){
        this.model = model;
    }    

   getAll = async () => this.model.find()
   get = async (filter) => this.model.findOne(filter)
   create = async (obj) => this.model.create(obj)
   update = async (filter,obj) => this.model.findOneAndUpdate(filter,obj)
   delete = async (filter) => this.model.deleteOne(filter)
   
}   
