import axios from "axios";
import appConfig from "../utils/AppConfig";
import Category from "../models/Category";
import { authStore } from "../redux/authState";

class Categories {

public async getAll(): Promise<Category[]> {
    const token = authStore.getState().token;

    //have to send this header so server know that we are authorized
    // const options = {
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // }
    const response = await axios.get<Category[]>(appConfig.categoriesUrl);
    const categories = response.data;
    return categories
}
public async getOne(id: number): Promise<Category> {
    const token = authStore.getState().token;

    //have to send this header so server know that we are authorized
    // const options = {
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // }
    const response = await axios.get<Category>(appConfig.categoriesUrl + `${id}`);
    const category = response.data;
    return category
}

}

const categories = new Categories();
export default categories;