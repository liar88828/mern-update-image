import express from "express";
import {getPosts,postPost} from "../controller/posts.mjs";

const router = express.Router()


router.get('/', getPosts)
router.post('/', postPost)


export default router