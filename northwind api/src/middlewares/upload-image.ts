import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";

export default function uploadImage(req: Request, res: Response, next: NextFunction){
    if(!req.body.image) return next();

    const image = req.body.image as UploadedFile;
    const imageName = `${v4()}${path.extname(image.name)}`;

    req.body.imageName = imageName;
    return next();

}