import ROUTE from '@/constant/Routes';
import express from 'express';
const auth = express.Router();


auth.post(ROUTE.LOGIN, (req, res) => {
    console.log("🚀 ~ req:", req)
})

export default auth