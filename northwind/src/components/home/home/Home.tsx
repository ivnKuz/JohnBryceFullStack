import "./Home.css";
import ProductsImageSource from '../../../assets/images/Dry Foods comp.jpg'
import ProductsImageSource2 from '../../../assets/images/ProductReinvention_Lead.jpg'
import { useEffect, useState } from "react";
import { time } from "console";
function Home(): JSX.Element {
    const randomNumber = Math.floor(Math.random() * 2) + 1;

    const desserts = [
        {id:1, name: 'Pana Cota', price: 10},
        {id:2, name: 'Re-colad', price:40},
        {id:3, name: 'Black Forest Cake', price: 30},
        {id:4, name: 'Baklava', price:5}
    ]

    function displaySale(){
        alert('%50 discount on Re-colad');
    }
    const arr = useState<string>('test');
    // console.log(arr)
    let sale2Info = arr[0];
    const setSale2Info = arr[1];
    function displaySale2(){
        setSale2Info('30% dicscount on all fruits');
    }
    const [sale3Info, setSale3Info] = useState<string>('test');;
    // let sale3Info = arr3[0];
    // const setSale3Info = arr3[1];
    function displaySale3(){
        setSale3Info('20% discount on all fish');
    }

    const [time, dateChange] = useState<string>('');;
    function showCurrentTime(){
        const currentDate = new Date();
        dateChange(currentDate.toLocaleTimeString())
    }
    useEffect(()=> {
        setInterval(()=>{
            showCurrentTime();
        
}, 1000);
    })
    
    
    
    
    return (
        <div className="Home">
			<p>Welcome to Northwind Traders!</p>
            <img src={ randomNumber === 1 ?  ProductsImageSource : ProductsImageSource2} alt="" />
            {/* react standard is short sucruin */}
            {/* {randomNumber === 1 && < img src={ProductsImageSource} />}
            {randomNumber === 2 && < img src={ProductsImageSource2} />} */}
            <hr />
            {desserts.map(dessert => <span key={dessert.id}>{dessert.name}: $ {dessert.price} |</span>)}
            <hr />
            <button onClick={displaySale}>Display Sale</button>
            <hr />
            <p>sale2: {sale2Info}</p>
            <hr />
            <button onClick={displaySale2}>Display Sale 2</button>
            <hr />
            <p>sale2: {sale3Info}</p>
            <hr />
            <button onClick={displaySale3}>Display Sale 2</button>
            <hr />
            <button onClick={showCurrentTime}>Show time</button>
            <hr />
            <span>current date is: {time}</span>
            
        </div>
    );
}

export default Home;
