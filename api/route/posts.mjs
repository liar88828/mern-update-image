import express from "express";
import {getPosts,postPost,deletePost} from "../controller/posts.mjs";

const router = express.Router()


router.get('/', getPosts)
router.post('/', postPost)
router.delete('/:id', deletePost)


export default router