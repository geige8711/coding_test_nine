import express from "express";
// import compression from "compression";  // compresses requests
// import session from "express-session";
// import bodyParser from "body-parser";
// import lusca from "lusca";
// import MongoStore from "connect-mongo";
// import flash from "express-flash";
// import path from "path";
// import mongoose from "mongoose";
// import passport from "passport";
// import bluebird from "bluebird";
// import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";

// Create Express server
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH");
      return res.status(200).json({});
    }
    if(req.method !== "POST"){
        return res.status(404).json({error:"Invalid request, only POST request is allowed"});
    }
    if(req.path!=="/"){
        return res.status(404).json({error:"Invalid request, only POST request with root route '/' is allowed"});
    }
    next();
  });
app.use(express.json());

// Express configuration
app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */
app.post("/", homeController.index);

export default app;
