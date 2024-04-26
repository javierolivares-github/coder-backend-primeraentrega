// Imports
import fs from "fs";

// Class
class CartManager {
  constructor() {
    this.pathFile = "./src/data/fs/files/carts.json";
    this.carts = [];
    this.init();
  }

  // INIT
  init() {
    this.loadCarts();
  }

  // LOAD
  async loadCarts() {
    try {
      const cartsJson = await fs.promises.readFile(this.pathFile, "utf-8");
      if (cartsJson) {
        this.carts = JSON.parse(cartsJson);
      };
    } catch (error) {
      console.error("Error loading carts:", error);
    }
  }

  // SAVE
  async saveCarts() {
    try {
      await fs.promises.writeFile(this.pathFile, JSON.stringify(this.carts));
    } catch (error) {
      console.error("Error saving carts:", error);
    }
  }

  // CREATE
  async createCart() {
    try {
      await this.loadCarts();
      const newCart = {
        id: this.carts.length + 1,
        products: []
      };
      this.carts.push(newCart);
      await this.saveCarts();
      console.log(`Your new Cart were created with success.`);
      return newCart;

    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }

  // READ
  async getCarts() {
    try {
      await this.loadCarts();
      console.log(this.carts);
      return this.carts;
    } catch (error) {
      console.error("Error reading carts:", error);
    }
  }

  // READ ONE
  async getCartById(cid) {
    try {
      await this.loadCarts();
      const cart = this.carts.find( c => c.id === cid );
      if(!cart) return `The cart with the ID ${cid} was not found.`;
      console.log(cart);
      return cart;

    } catch (error) {
      console.error(`Error reading the cart with ID${cid}:`, error);
    }
  }

  // ADD PRODUCT TO CART
  async addProductToCart(cid, pid) {
    try {
      await this.loadCarts();
      const index = this.carts.findIndex( c => c.id === cid );
      if ( index === -1 ) return `The cart with the ID ${cid} was not found.`;
      const cart = this.carts[index];
      const existingProductIndex = cart.products.findIndex(p => p.product === pid);

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment its quantity
        cart.products[existingProductIndex].quantity++;
      } else {
        // If the product does not exist in the cart, add it with quantity 1
        cart.products.push({
          product: pid,
          quantity: 1
        });
      }
  
      await this.saveCarts();
      console.log(`The product with the ID ${pid} was added to the cart with ID ${cid} with success.`);
      console.log(cart);
      return cart

    } catch (error) {
      console.error(`Error adding the product with ID${pid} to the cart with ID${cid}:`, error);
    }
  }
  
}

// Initialization
const cartManager = new CartManager();

// Export
export default cartManager;

// TESTING PROCESS:
// async function test() {
//   try {
//     // await cartManager.createCart();
//     // await cartManager.getCarts();
//     // await cartManager.getCartById(3);
//     // await cartManager.addProductToCart(1, 3);
//     // await cartManager.addProductToCart(1, 2);
    
//   } catch (error) {
//     console.log(error)
//   }
// }

// test();