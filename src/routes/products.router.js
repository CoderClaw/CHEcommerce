import { Router } from "express";


const router = new Router();

export default router;

router.get("/", async (req, res)=>{
    res.send("products")
})