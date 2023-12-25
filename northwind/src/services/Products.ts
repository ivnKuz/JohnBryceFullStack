import axios from "axios";
import Product from "../models/Product";
import appConfig from "../utils/AppConfig";
import { ProductsAction, ProductsActionType, productsStore } from "../redux/ProductsState";

class Products {

    public async getAll(): Promise<Product[]>{

        let products = productsStore.getState().products;
        
        if(products.length === 0) {
//get productws form remote server
    const response = await axios.get<Product[]>(appConfig.productsUrl);

        //extract the data from response
        products = response.data;
        //create an action to set the products into the state,
        // and set the action payload, to hold the products themselves
        const action: ProductsAction = {
            type: ProductsActionType.SetProduct,
            payload: products
        }

        //now all that is left to do is to send this action to redux
        productsStore.dispatch(action)
        }
        

        return products;
    }
    public async getOne(id: number): Promise<Product | undefined>{
        //get one product
        //extract the data from response
        const products = productsStore.getState().products;
        let product = products.find(p => p.id === id);
        if(!product){
            await this.getAll()
            const products = productsStore.getState().products;
             product = products.find(p => p.id === id);
            // const response = await axios.get<Product>(appConfig.productsUrl+`${id}`);
            // product = response.data;
        }
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

        //create an addProduct action for redux
        const action: ProductsAction = {
            type: ProductsActionType.addProduct,
            payload: addedProduct
        }
        //perform the action on redux
        productsStore.dispatch(action);
        return addedProduct;
    }
    public async deleteProduct(id: number): Promise<void>{
        await axios.delete(appConfig.productsUrl + `${id}`);
        const action: ProductsAction = {
            type: ProductsActionType.DeleteProduct,
            payload: id
        }
        //perform the action on redux
        productsStore.dispatch(action);
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
        //update  product with redux
        const action: ProductsAction = {
            type: ProductsActionType.UpdateProduct,
            payload: updatedProduct
        }
        //perform the action on redux
        productsStore.dispatch(action);
        return updatedProduct;
    }
}

//singleton
const products = new Products();
export default products;