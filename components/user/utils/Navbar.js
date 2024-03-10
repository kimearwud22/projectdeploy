import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState([]);
  const [state, setState] = useState("unconfirmed");

  const handleOrder = () => {
    fetch("/api/order/getOrder?state=uncormirmed", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setOrder(res.data);
        } else {
          setOrder([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    handleOrder();
  }, []);

  if(session){
    return (
      <nav  className="navbar navbar-expand-lg navbar-light bg-light shadow-sm ">
        <div className="container">
          <Link href="/">
            {/* <p className="navbar-brand">Navbar</p>
             */}
             <img src="/assets/img/kitabisajual.jpg" alt="" width="50" height="50"></img>
          </Link>
          <button
            className={`navbar-toggler btn btn-light ${isNavOpen ? "collapsed" : ""}`}
            type="button"
            onClick={toggleNav}
          >
            <span className="ni ni-bullet-list-67 fs-3 text-primary"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
            <ul className=" me-auto mb-0 ms-2 mb-lg-0 " id="navbar-lading-ul">
              <li className="">
                <Link className="" href="/">
                  <p className="my-auto rounded-3">Home</p>
                </Link>
              </li>
              <li className="">
                <Link href="/link">
                  <p className="my-auto rounded-3">About</p>
                </Link>
              </li>
              <li className="">
                <Link href="/link">
                  <p className="my-auto rounded-3">Layanan</p>
                </Link>
              </li>
              <li className="">
                <Link href="#product">
                  <p className="my-auto rounded-3">Produk</p>
                </Link>
              </li>
              <li className="">
                <Link href="#project">
                  <p className="my-auto rounded-3">Project Post</p>
                </Link>
              </li>
            </ul>
            <div className="d-flex p-2">
              <a href={`order?state=${state}`}>
                      {/* <i className="icon-shopping-cart" /> Cart[{order.length}] */}
                      <i className="ni ni-bell-55" style={{fontSize:"20px"}} /> 
                <span className=" rounded-3" style={{ fontSize:"10px", position:"absolute", color:"green"}}>{order.length}</span>
                    </a>
                    </div>
            <form className="d-flex ">
              <button className="btn btn-success my-auto" type="submit">
                Contact
              </button>
            </form>
            <div className="d-flex">
              <button onClick={() => signOut()} className="btn btn-primary my-auto ms-2">
                Sign Out
              </button>
              <img src={session.user.image} alt="" width="50" height="50"/>
              </div>
              
              {/* <div className="d-flex">
              <a href={`ladingpage/cart?state=${state}`}>
                      <i className="icon-shopping-cart" /> Cart [{order.length}]
                    </a>
                    </div> */}
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav  className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link href="/">
            {/* <p className="navbar-brand">Navbar</p>
             */}
             <img src="/assets/img/kitabisajual.jpg" alt="" width="50" height="50"></img>
          </Link>
          <button
            className={`navbar-toggler btn btn-light ${isNavOpen ? "collapsed" : ""}`}
            type="button"
            onClick={toggleNav}
          >
            <span className="ni ni-bullet-list-67 fs-3 text-primary"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
            <ul className=" me-auto mb-0 ms-2 mb-lg-0 " id="navbar-lading-ul">
              <li className="">
                <Link className="" href="/">
                  <p className="my-auto rounded-3">Home</p>
                </Link>
              </li>
              <li className="">
                <Link href="/link">
                  <p className="my-auto rounded-3">About</p>
                </Link>
              </li>
              <li className="">
                <Link href="/link">
                  <p className="my-auto rounded-3">Layanan</p>
                </Link>
              </li>
              <li className="">
                <Link href="#product">
                  <p className="my-auto rounded-3">Produk</p>
                </Link>
              </li>
              <li className="">
                <Link href="#project">
                  <p className="my-auto rounded-3">Project Post</p>
                </Link>
              </li>
            </ul>
            <form className="d-flex ">
              <button className="btn btn-success my-auto" type="submit">
                Contact
              </button>
            </form>
            <div className="d-flex">
              <button onClick={() => signIn()} className="btn btn-primary my-auto ms-2">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
