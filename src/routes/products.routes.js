import { Router } from "express";
import productManager from "../managers/productManager.fs.js";

// Router
const router = Router();

// Product Routes:
router.post("/", create); 
router.get("/", read); 
router.get("/:pid", readOne); 
router.put("/:pid", update); 
router.delete("/:pid", destroy); 

// Callback funtions:
async function create(req,res) {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);
    return res.json({ status: 201, response: newProduct });

  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });
    
  }
}

async function read(req,res) {
  try {
    const { limit } = req.query;
    const all = await productManager.getProducts(limit);
    if (all.length > 0) {
      return res.json({ status: 200, response: all });
    } else {
      return res.json({ status: 404, response: "Not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, response: error.message });
  }
}

async function readOne(req,res) {
  try {
    const { pid } = req.params;
    const one = await productManager.getProductById(pid);
    if (one) {
      return res.json({ status: 200, response: one });

    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;

    }

  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });

  }
}

async function update(req,res) {
  try {
    // Capture params
    const { pid } = req.params;
    // Capture body
    const data = req.body;
    // Update
    const one = await productManager.updateProduct(pid, data);
    // Response
    if (one) {
      return res.json({ status: 200, response: one });
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });
  }
}

async function destroy(req,res) {
  try {
    // Capture params
    const { pid } = req.params;
    // Search
    const one = productManager.getProductById(pid);
    // Destroy
    if (one) {
      await productManager.deleteProduct(pid);
      return res.json({status: 200, response: one});
    }
    // Error
    const error = new Error("Not found!");
    error.status = 404;
    throw error;
    
  } catch (error) {
    console.log(error);
    return res.json({ status: error.status || 500, response: error.message || "ERROR" });
  }
}

export default router;