var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import rest from "../api/rest.js";
import HttpMethods from "../enums/http-methods.js";
export default function Productslistener(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const targetId = e.target;
        if (targetId.id.startsWith('delete-')) {
            const productId = targetId.id.substring('delete-'.length);
            const response = yield rest(HttpMethods.DELETE, `https://dummyjson.com/products/${productId}`);
            console.log(response);
            document.getElementById(`tr-${productId}`).remove();
            return;
        }
        if (targetId.id.startsWith('update-')) {
            const productId = targetId.id.substring('update-'.length);
            const newDescription = prompt('please enter new description');
            const data = {
                description: newDescription
            };
            const response = yield rest(HttpMethods.PATCH, `https://dummyjson.com/products/${productId}`);
            console.log(response);
            document.getElementById(`tr-${productId}`).children[2].textContent = `${newDescription}`;
            return;
        }
        //REST request to delete from server
    });
}
