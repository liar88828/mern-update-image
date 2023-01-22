import express from "express";
import {getUser,updateUser} from "../controller/users.mjs";

const router = express.Router()


router.get('/find/:id', getUser)
router.put('/',updateUser)


export default router