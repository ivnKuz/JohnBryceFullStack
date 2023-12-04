import Home from "../../home/home/Home";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import "./Layout.css"


function Layout(): JSX.Element{
    return(
        <div className="Layout">
            <header>
            <Header></Header>
            </header>
            <aside>
                <Menu></Menu>
            </aside>
            <main>
            <Home></Home>
            </main>
            <footer>
             <Footer></Footer>
            </footer>

        </div>
    )
}

export default Layout;