import express from "express";
import {getPost} from "../controller/posts.mjs";

const router = express.Router()


router.get('/', getPost)


export default router