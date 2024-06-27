import express from "express";
import {getPosts,postPost,deletePost,getPostsBiasa} from "../controller/posts.mjs";

const router = express.Router()


router.get('/', getPosts)
router.get('/biasa', getPostsBiasa)
router.post('/', postPost)
router.delete('/:id', deletePost)


export default router