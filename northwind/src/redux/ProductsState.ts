import { createStore } from "redux";
import Product from "../models/Product";

//1. global state for products
export class ProductsState{
    public products: Product[] = [];
}

//2. action type
export enum ProductsActionType { // what types of actions do we want to enable on the data itself
    SetProduct = 'SetProduct',
    DeleteProduct = 'DeleteProduct',
    UpdateProduct = "UpdateProduct",
    addProduct = 'AddProduct',
}

// 3. Action Object
export type ProductPayload = Product[] | Product | number;
export interface ProductsAction {
    type:ProductsActionType,
    payload: ProductPayload, // this is the specific data that is delivered with the action
}

//4. Reducer ()
export function productsReducer(currentState = new ProductsState(), action:ProductsAction): ProductsState {
    const newState = {...currentState};

    switch(action.type){
        case ProductsActionType.SetProduct: //payload here will be an array of products: Product[]
        newState.products = action.payload as Product[];
        break;
        case ProductsActionType.addProduct: // payload here will be a single product: Product
        newState.products.push(action.payload as Product)
        break;
        case ProductsActionType.DeleteProduct: //payload will be product id: number
        const productId = action.payload as number;
        const indexToDelete = newState.products.findIndex(product => product.id === productId);
        if(indexToDelete !== -1) newState.products.splice(indexToDelete, 1)
        break;
        case ProductsActionType.UpdateProduct: // payload will be single product: Product
        const productToUpdate = action.payload as Product;
        const indexToUpdate = newState.products.findIndex(product => product.id === productToUpdate.id);
        if(indexToUpdate !== -1) newState.products[indexToUpdate] = productToUpdate
        break;
            
    }
    
    return newState;
}

// 5. Store
export const productsStore = createStore(productsReducer)