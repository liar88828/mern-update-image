import express from "express";
import {getUser} from "../controller/users.mjs";

const router = express.Router()


router.get('/find/:id', getUser)


export default router