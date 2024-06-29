import express from "express";
import { __dirname } from "./pathfile.js";
import handlebars from 'express-handlebars';
import 'dotenv/config';

//import db
import mongoose from "mongoose";

//import routes
import appRouter from "./routes/index.js"


const app = express();

const PORT = 8080

const httpServer = app.listen(PORT, err =>{
    console.log("escuchando en el puerto " + PORT)
})

try{
    mongoose.connect(process.env.MONGODB_URI)
    console.log("db conectada")
}catch(error){
    console.log(error)
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

//view engine

app.set("view engine", "handlebars");

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

//routes

app.use(appRouter)
