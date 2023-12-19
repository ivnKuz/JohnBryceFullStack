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

    public async addProduct(product: Product): Promise<Product>{
        //need to do it to send image
        const options = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.post<Product>(appConfig.productsUrl, product, options);
        const addedProduct = response.data;
        return addedProduct;
    }
    public async deleteProduct(id: number): Promise<void>{
        await axios.delete(appConfig.productsUrl + `${id}`);
    }

    public async editProduct(product: Product): Promise<Product>{
        //need to do it to send image
        const options = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.put<Product>(appConfig.productsUrl + `${product.id}`, product, options);
        const updatedProduct = response.data;
        return updatedProduct;
    }
}

//singleton
const products = new Products();
export default products;