var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import reduceProducts from "./reducers/products.js";
import presentProductTable from "./ui/products.js";
import Productslistener from "./event-listeners/products-table.js";
//get data
(() => __awaiter(void 0, void 0, void 0, function* () {
    document.getElementById('products-table-body').addEventListener('click', (e) => { Productslistener(e); });
    const response = yield fetch('https://dummyjson.com/products');
    const json = yield response.json();
    const products = json.products;
    // const {products} = await response.json();
    //prep data for presentation
    const productsHTML = reduceProducts(products);
    presentProductTable(productsHTML);
}))();
//present data (UI)
