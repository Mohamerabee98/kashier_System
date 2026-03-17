import  { Router } from 'express';
import * as ProductService from "./product.services.js"
import * as auth from "../../middleware/auth.middleware.js"
import { asyncHandler } from '../../utils/error/async-handler.js';


const router  = Router()
//  localhost:3000/product/{create-product}
router.post("/create-product" ,auth.authenticate, auth.isAdmin ,asyncHandler( ProductService.createProduct))
router.get("/AllProduct" ,auth.authenticate,asyncHandler( ProductService.getAllProduct))
router.delete("/delete-product/:id" ,auth.authenticate, auth.isAdmin ,asyncHandler( ProductService.deleteProduct))
router.put("/update-product/:id" ,auth.authenticate, auth.isAdmin ,asyncHandler( ProductService.updateProduct))

export default router