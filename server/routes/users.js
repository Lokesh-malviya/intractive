import express from "express";
import{
    getUser,
    setPoints,
    setRounds,
    setPointn,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/* Read */

router.get("/:id",verifyToken,getUser);
router.patch("/:id/points",verifyToken,setPoints)
router.patch("/:id/rounds",verifyToken,setRounds)
router.patch("/:id/pointn",verifyToken,setPointn)
/* router.patch("/:id/crops",verifyToken,setCrops);
router.patch("/:id/crops-delete",verifyToken,delCrops); */

/* router.get("/:id/friends",verifyToken, getUserFriend);  */

/* update */
/* router.patch("/:id/:friendID",verifyToken,addRemoveFriend); */

export default router;