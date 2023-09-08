import express from "express";
import dotenv from "dotenv";
import Bootstrap from "./bootstrap";
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
app.set("port", process.env.PORT || 7070);
const bootstrap = new Bootstrap(app);
