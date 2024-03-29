import "./Home.css";
// if you have an image to display, this is how you would import it
// import Products2ImageSource from '../../../assets/images/products2.jpg';
import { useEffect, useState } from "react";

function Home(): JSX.Element {

    const [something, setSomething] = useState<string>('');

    useEffect(() => {
        /*
        perform any operations required for the loading of this component here.
        remember we can't use async function here, so either use then/catch
        or an IIFE
        */
       setSomething('a string from state')
    }, []);

    return (
        <div className="Home">

        </div>
    );
    }

export default Home;
