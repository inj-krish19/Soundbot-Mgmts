import { AnimatePresence } from "framer-motion"
import { Outlet, useLocation } from "react-router"
import { motion } from "framer-motion";
import BackToTop from "./components/BackToTop";
import ThemeToggle from "./components/ThemeToggle";
import NavbarMobile from "./components/NavbarMobile";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {

    const location = useLocation();

    return (

        <main className='relative flex flex-col h-full min-h-screen w-full justify-around '>


            <Header />


            <AnimatePresence mode="wait">

                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="min-h-screen"
                >
                    <Outlet />
                </motion.div>

            </AnimatePresence>


            <BackToTop />
            <ThemeToggle />

            <Footer />

            {/* Implementation 2 : Mobile native app  */}
            {/* <NavbarMobile /> */}


        </main>
    )
}

export default Layout;