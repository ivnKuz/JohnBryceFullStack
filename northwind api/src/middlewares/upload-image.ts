import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import { promisify } from "util";
import config from "config";

export default async function uploadImage(req: Request, res: Response, next: NextFunction){
    if(!req.body.image) return next();

    const image = req.body.image as UploadedFile;
    const imageName = `${v4()}${path.extname(image.name)}`;


    // save images somewhere
    const mvPromisified = promisify(image.mv).bind(image)
    try{
        const fileAbsolutePath = path.resolve(config.get<string>('app.images.path'), imageName);
       await mvPromisified(fileAbsolutePath);
       req.body.imageName = imageName;
       return next();
    }catch(err){
        next(err);
    }

  

}