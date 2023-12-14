import axios from "axios";
import Product from "../models/Product";
import appConfig from "../utils/AppConfig";

class Products {

    public async getAll(): Promise<Product[]>{
        //get productws form remote server
        const response = await axios.get<Product[]>(appConfig.productsUrl);

        //extract the data from response
        const products = response.data;

        return products;
    }
    public async getOne(id: number): Promise<Product>{
        //get one product
        const response = await axios.get<Product>(appConfig.productsUrl+`${id}`);

        //extract the data from response
        const product = response.data;

        return product;
    }
}

//singleton
const products = new Products();
export default products;