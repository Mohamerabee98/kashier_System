import { Router } from "express";
import * as authServices from "./auth.services.js"
import * as auth from "../../middleware/auth.middleware.js"

const router = Router()

router.post("/createUser" ,auth.authenticate, auth.isAdmin , authServices.createUser )
router.post("/login" , authServices.Login )

export default router