import Head from "next/head";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>Dashboard</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="shortcut icon" href="/dist/img/logo/logos.png" /> */}
        <link rel="icon" href="/kitabisajual.ico" /> 
      </Head>

      <div className="g-sidenav-show bg-gray-100">
        <div className="min-height-300 bg-primary position-absolute w-100"></div>
        <Sidebar />
        <div id="main" className="main-content position-relative border-radius-lg" >
          <Navbar />
          <div className="container-fluid py-4">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
 