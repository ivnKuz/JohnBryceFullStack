
import Header from "../header/Header";
import Menu from "../menu/Menu";
import Routing from "../routing/Routing";
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
            <Routing/>
            </main>
            

        </div>
    )
}

export default Layout;