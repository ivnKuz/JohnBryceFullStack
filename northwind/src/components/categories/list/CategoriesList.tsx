import { useEffect, useState } from "react";
import "./CategoriesList.css";
import categoriesService from "../../../services/Categories";
import Category from "../../../models/Category";
import notify from "../../../services/Notify";

function CategoriesList(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(()=> {
        categoriesService.getAll()
        .then(categories =>{
            setCategories(categories);
        })
        .catch(err =>{
            notify.error(err)
        });

    }, [])
    return (
        <div className="CategoriesList">
			{categories.length}
        </div>
    );
}

export default CategoriesList;
