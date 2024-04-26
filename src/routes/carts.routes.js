// Imports
import { Router, response } from "express";
import cartManager from "../managers/cartManager.fs.js";

// Router
const router = Router();

// Cart Routes:
router.post("/", create); 
router.get("/", read); 
router.get("/:cid", readOne); 
router.post("/:cid/product/:pid", addProductToCart);

// Callbacks
async function create(req,res) {
  try {
    const newCart = await cartManager.createCart();
    return res.json({ status: 201, response: newCart });
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });
  }
}

async function read(req,res) {
  try {
    const carts = await cartManager.getCarts();
    return res.json({ status: 200, response: carts });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

async function readOne(req,res) {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(parseInt(cid));
    if (cart) {
      return res.json({ status: 200, response: cart });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    };

  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });

  }
}

async function addProductToCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));

    if (cart) {
      return res.json({ status: 200, response: cart });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    };

  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });
  }
}

// Export
export default router;