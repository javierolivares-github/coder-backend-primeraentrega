// Imports
import { Router } from "express";
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";

// Router
const router = Router();

// Routes
router.use("/products", productsRouters);
router.use("/carts", cartsRouters);

// Export
export default router;