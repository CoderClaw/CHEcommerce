import express from "express";
import { __dirname } from "./pathfile.js";
import handlebars from 'express-handlebars';

//import routes
import prodRouter from "./routes/products.router.js"
import  viewsRouter  from './routes/view.router.js';


const app = express();

const PORT = 8080

const httpServer = app.listen(PORT, err =>{
    console.log("escuchando en el puerto " + PORT)
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

//view engine

app.set("view engine", "handlebars");

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");



//routes

app.use('/', viewsRouter)

app.use("/api/products", prodRouter)