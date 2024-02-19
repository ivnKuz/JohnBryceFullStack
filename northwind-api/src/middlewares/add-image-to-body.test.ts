import { NextFunction, Request, Response } from "express";
import addImageToBody from "./add-image-to-body"
import { v4 } from "uuid";
describe('add image to body middleware unit test', () => {
    
    test('add image to body', () => {
        const req = {
            body: {

            },
            files: {
                image: v4(),
            }
        } as unknown as Request;
        const res = {} as Response;
        const next = (() => {}) as NextFunction;
        addImageToBody(req, res, next);
        expect(req.body).toHaveProperty('image');
        expect(req.body.image).toEqual(req.files.image);
    });
    test('expect to not have image in body', () => {
        const req = {
            body: {

            }
        } as unknown as Request;
        const res = {} as Response;
        const next = (() => {}) as NextFunction;
        addImageToBody(req, res, next);
        expect(req.body).toHaveProperty('image');
        expect(req.body.image).not.toBeDefined;
    });
})