import express from "express";
import { NextFunction, Request, Response } from "express";
import HttpException from "./httpException";

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
app.use(( err:HttpException,_req:Request, res:Response, next:NextFunction) => {
  if(err.status===400){
    return res.status(400).json({error:"Could not decode request: JSON parsing failed"});
  }
  next();
});

// Express configuration
app.set("port", process.env.PORT || 3000);

/**
 * Primary app routes.
 */
app.post("/", homeController.index);

export default app;
