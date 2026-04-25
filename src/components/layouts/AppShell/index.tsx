import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";

// Dynamic import Navbar - tidak critical untuk initial load
const Navbar = dynamic(() => import("../navbar"), {
  ssr: false,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    
    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
             {/* <Footer /> */}
        </main>
    );
};

export default AppShell;