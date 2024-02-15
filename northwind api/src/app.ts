process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

import express from "express";
import productsRouter from './routers/products';
import config from 'config';
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import { errorLogger } from "./middlewares/error-logger";
import { pagerDuty } from "./middlewares/pager-duty";
import authRouter from './routers/auth'
import categoryRouter from './routers/categories'
import authentication from "./middlewares/authenitcation";
import imagesRouter from "./routers/images"
import userLogger from "./middlewares/user-logger";
import expressFileUpload from 'express-fileupload'
import path from "path";

const server = express();

server.use(authentication);
server.use(userLogger)
server.use(express.json());
server.use(expressFileUpload());

server.use('/api', authRouter)
server.use('/api/products', productsRouter)
server.use('/api/categories', categoryRouter);
server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))));
// special middleware for not found error
server.use(notFound)

// error middlewares
server.use(errorLogger)
server.use(pagerDuty)
server.use(errorHandler)

server.listen(config.get<number>('app.port'), () => {
    console.log(`${config.get<string>('app.name')} is running on localhost:${config.get<number>('app.port')}`)
})
