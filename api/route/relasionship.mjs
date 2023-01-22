import express from "express";
import {getRelasionShip,deleteRelasionShip,postRelasionShip} from "../controller/relasionship.mjs";

const router = express.Router()


router.get('/', getRelasionShip)
router.post('/', postRelasionShip)
router.delete('/', deleteRelasionShip)


export default router