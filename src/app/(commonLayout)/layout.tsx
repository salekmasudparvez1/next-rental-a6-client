import Navbar from "@/components/module/nav/Navbar";
import React from "react";


const Layout = ({children}:React.PropsWithChildren<{}>) => {
    return (
        <div className="max-w-[1130px] mx-auto">
            <Navbar />
           {children}
        </div>
    );
}

export default Layout;
