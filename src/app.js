// Imports
import express from "express";
import router from "./routes/index.js";

// To create an express app/server:
const app = express();

// For initializing the express app, I need to configure:
const port = 8080;
const ready = console.log("server ready on port " + port);

// To initialize the server:
app.listen(port, ready);

// To configure the server with specific functions:
app.use(express.json()); // To manage JSON
app.use(express.urlencoded({extended:true})); // To use the info that comes from body

// Router
app.use("/api", router);






