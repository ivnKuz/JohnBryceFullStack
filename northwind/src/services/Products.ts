import axios from "axios";
import Product from "../models/product";
import appConfig from "../utils/AppConfig";

class Products {

    public async getAll(): Promise<Product[]>{
        
        //get productws form remote server
        const response = await axios.get<Product[]>(appConfig.productsUrl);

        //extract the data from response
        const products = response.data;

        return products;
    }
}

const products = new Products();
export default products;