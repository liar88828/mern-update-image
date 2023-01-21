import express from "express";
import {getComments} from "../controller/comments.mjs";

const router = express.Router()


router.get('/', getComments)


export default router