import { NextFunction, Request, Response } from "express";
import getModel from "../../models/product/factory"
import { StatusCodes } from 'http-status-codes';
import createHttpError from "http-errors";
import  config  from "config";
import productDTO from "../../models/product/dto"

//replacing image name with image url
function convertProductToImageUrl(product: productDTO) {
const productWithImageUrl = {
    ...product,
    imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${product.imageName}`
}
delete productWithImageUrl.imageName;

return productWithImageUrl;
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new Error('custom error')
        const products = await getModel().getAll();
        // res.json(products.map(p => convertProductToImageUrl(p)));
        res.json(products.map(convertProductToImageUrl)); // same as ^
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getModel().getOne(+req.params.id);
        if (!product) return next();
        res.json(convertProductToImageUrl(product));
    } catch (err) {
        next(err)
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await getModel().add(req.body);
        const productWithImageUrl = {
            ...product,
            imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${product.imageName}`
        }
        // delete productWithImageUrl.imageName
        return res.status(StatusCodes.CREATED).json(productWithImageUrl);
    } catch (err) {
        next(err)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const updatedProduct = {id, ...req.body}
        const product = await getModel().update(updatedProduct);
        res.json(convertProductToImageUrl(product));
    } catch (err) {
        next(err)
    }

}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const existingProduct = await getModel().getOne(id);
        const updatedProduct = {...existingProduct, ...req.body};
        const product = await getModel().update(updatedProduct);
        res.json(convertProductToImageUrl(product));
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const isDeleted = await getModel().delete(+req.params.id)
       if(!isDeleted) return next(); //will pass it to 404
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (err) {
        next(err)
    }
}