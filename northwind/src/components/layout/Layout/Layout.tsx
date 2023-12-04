import Footer from "../footer/Footer";
import Header from "../header/Header";
import "./Layout.css"


function Layout(): JSX.Element{
    return(
        <div className="Layout">
            <header>
            <Header></Header>
            </header>
            <aside>
                nav
            </aside>
            <main>
            main
            </main>
            <footer>
             <Footer></Footer>
            </footer>

        </div>
    )
}

export default Layout;