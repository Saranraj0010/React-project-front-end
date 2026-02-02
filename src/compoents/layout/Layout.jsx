import Header from "./header/Header"
import Sidebar from "./sidebar/Sidebar"
import Container from "./container/Container"

const Layout = () => {



    return (
        <>
            <div className="m-0 p-0 h-screen">
                <div className="border bg-blu-500 h-20">
                    <Header/>
                </div>
                <div className="flex">
                    <div className="bg-red-2 w-30 border h-svw">
                        <Sidebar/>
                    </div>
                    <div className="bg-green-200 px-10 overflow-hidden">
                        <Container/>
                    </div>
                </div>
                <div className="border h-20"></div>
            </div>
        </>
    )
}
export default Layout