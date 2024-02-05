import { useEffect, useState } from "react";
import "./details.css";
import Category from "../../../models/Category";
import categoriesService from "../../../services/Categories";
import { useParams } from "react-router-dom";
import notify from "../../../services/Notify";
import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";

function Details(): JSX.Element {
    const params = useParams();
    // const categoryId = Number(params.categoryId)
    const [category, setCategory] = useState<Category>();

    useEffect(()=>{
        categoriesService.getOne(1)
        .then(setCategory)
        .catch(err =>{
            notify.error(err);
        })
    }, []);
    return (
        <div className="categoryDetails">
			<div>{category?.name}</div>
            <div>{category?.description}</div>
            <div><img src={getAbsoluteImageSrc(category?.imgUrl) } alt="" /></div>
        </div>
    );
}

export default Details;
