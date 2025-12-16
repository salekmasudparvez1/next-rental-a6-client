import Footer from "@/components/module/footer/Footer";
import { Navbar } from "@/components/module/nav/Navbar";

const Layout = ({ children }: React.PropsWithChildren<object>) => {
    return (
        <div className="min-h-screen flex flex-col w-full">
            <Navbar />
            <main className="flex-1 w-full max-w-[1130px] mx-auto pt-14 sm:pt-16 px-3 md:px-4 lg:px-6">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
