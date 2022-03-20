/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { json } from "body-parser";
import { Request, Response } from "express";
import HttpError from "../errorHandler";

type ChannelItem = {
    image:{showImage:string},
    episodeCount:number,
    drm:boolean,
    slug:string,
    title:string
}
type JsonData = {
    payload:[ChannelItem]
}

export const index = (req:Request, res:Response) => {
    const jsonData:JsonData = req.body;
    if (Object.keys(jsonData).length === 0) {
        res.statusCode=400;
        res.json({ error:"Could not decode request: JSON parsing failed"} );
    }
    try {
        const result = jsonData.payload.map((item)=>{
            if(item.drm && item.episodeCount>0){
                return {
                    image: item.image.showImage,
                    slug: item.slug,
                    title: item.title,
                };
            }
        }).filter(item=>!!item);
        if(result.length>0){
            res.json({ response: result });
        }else{
            res.statusCode=400;
            res.json( {error:"Could not decode request: JSON parsing failed"} );
        }

        
    } catch (error) {
      res.statusCode=400;
      res.json( {error:"Could not decode request: JSON parsing failed"} );
    }
};
