import { Router } from "express"


const router = Router();

router.get("/", async (req, res) => {
    res.redirect("login")
})

//LOGIN
router.get('/login',(req ,res)=>{
    res.render('login')
})

//REGISTER
router.get('/register',(req ,res)=>{
    res.render('register')
})

//USERS
// router.get('/users', auth, async (req ,res)=>{

//     const {numPage, limit} = req.query

//     const userService = new UsersManagerMongo();

//     const {docs, page, hasPrevPage, hasNextPage, prevPage, nextPage} = await userService.getUsers();

//     res.render('users',{users:docs, page, hasPrevPage, hasNextPage, prevPage, nextPage})
// })


//PRODUCTS

router.post('/products', async (req, res) => {

    const {prodId} = req.body

    const cart = await cartModel.findOne({}).lean();

    if(!cart.products.find(obj => obj.product.toString() === prodId)){
        cart.products.push({
            product: prodId,
            quantity: 1
        })
    }else{
        const selectedCart = cart.products.findIndex(obj => obj.product.toString() === prodId)
        cart.products[selectedCart].quantity++
    }    
    

    await cartModel.findOneAndUpdate({_id:cart._id},cart).lean()
    
    const newCart = await cartModel.findById(cart._id).populate('products.product').lean();
   
    res.redirect('/carts/'+cart._id)
}); 


export default router;
