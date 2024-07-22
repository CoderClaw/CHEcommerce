import { connect } from "mongoose";
import 'dotenv/config';

export class MongoSingleton {

    static #instance

    constructor(){
        connect(process.env.MONGODB_URI);
    }

    static getInstance(){
        if(this.#instance){
            console.log("Ya se encuentra conectado a la db")
            return this.#instance
        }

        this.#instance = new MongoSingleton();
        console.log("Conectado a la db")
        return this.#instance;
    }

}