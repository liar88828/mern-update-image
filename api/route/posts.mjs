import express from "express";
import {getUser} from "../controller/users.mjs";

const router = express.Router()


router.get('/', getUser)


export default router