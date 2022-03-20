/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from "express";

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
    try {
        const jsonData:JsonData = req.body;
        if (Object.keys(jsonData).length === 0) {
            res.setHeader("Content-Type", "application/json");
            res.json({ error:"Could not get channel data"} );
        }
        const result = jsonData.payload.filter(item=>item.drm && item.episodeCount>0).map(item=>({
            image: item.image.showImage,
            slug: item.slug,
            title: item.title,
        }));
        if(result.length>0){
            res.setHeader("Content-Type", "application/json");
            res.json({ response: result });
        }else{
            res.setHeader("Content-Type", "application/json");
            res.json( {error:"Could not get channel data"} );
        }

        
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.json( {error:"Could not get channel data"} );
    }
};
