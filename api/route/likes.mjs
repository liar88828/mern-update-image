import express from "express";
import {getLikes,deleteLikes,postLikes} from "../controller/likes.mjs";

const router = express.Router()


router.get('/', getLikes)
router.post('/', postLikes)
router.delete('/', deleteLikes)


export default router