import express from "express";
import {getComments, postComments} from "../controller/comments.mjs";

const router = express.Router()


router.get('/', getComments)
router.post('/', postComments)


export default router