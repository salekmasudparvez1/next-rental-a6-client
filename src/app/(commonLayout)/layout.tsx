import Footer from "@/components/module/footer/Footer";
import Navbar from "@/components/module/nav/Navbar";



const Layout = ({children}: React.PropsWithChildren<object>) => {
    return (
        <div className="max-w-[1130px] pt-16 mx-auto">
            <Navbar />
           {children}
           <Footer/>
        </div>
    );
}

export default Layout;
