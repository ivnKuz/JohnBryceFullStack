import { NavLink } from "react-router-dom";
import Product from "../../../models/Product";
import "./ProductCard.css";
import getAbsoluteImageSrc from "../../../utils/getAbsoluteImageSrc";

interface ProductCardProps {
    product: Product;
}

function ProductCard(props:ProductCardProps): JSX.Element {
    return (
        <div className="ProductCard">
			<div>
                {props.product.name}
                <br />
                {props.product.price?.toFixed(2)}
                <br />
                {props.product.stock} 

            </div>
            <div>

            <NavLink  to={`/product/details/${props.product.id}`}>
            <img src={getAbsoluteImageSrc(props.product.imageUrl)} alt="" />
            </NavLink>
                
            </div>
        </div>
    );
}

export default ProductCard;
