import "./Home.css";
import ProductsImageSource from '../../../assets/images/Dry Foods comp.jpg'
import ProductsImageSource2 from '../../../assets/images/ProductReinvention_Lead.jpg'
function Home(): JSX.Element {
    const randomNumber = Math.floor(Math.random() * 2) + 1
    return (
        <div className="Home">
			<p>Welcome to Northwind Traders!</p>
            <img src={ randomNumber === 1 ?  ProductsImageSource : ProductsImageSource2} alt="" />
            {/* react standard is short sucruin */}
            {/* {randomNumber === 1 && < img src={ProductsImageSource} />}
            {randomNumber === 2 && < img src={ProductsImageSource2} />} */}
        </div>
    );
}

export default Home;
