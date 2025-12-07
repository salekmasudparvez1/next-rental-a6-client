import Footer from "@/components/module/footer/Footer";
import Navbar from "@/components/module/nav/Navbar";
import React from "react";


const Layout = ({children}:React.PropsWithChildren<{}>) => {
    return (
        <div className="max-w-[1130px] pt-16 mx-auto">
            <Navbar />
           {children}
           <Footer/>
        </div>
    );
}

export default Layout;
