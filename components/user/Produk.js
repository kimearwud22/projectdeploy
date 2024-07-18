import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";

export default function Produk() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();

  const handleProduct = () => {
    fetch("/api/produk/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  // button buy add to cart
  const handleAddBuy = (id, price) => {
    if (session) {
      fetch("/api/order/create", {
        method: "POST",
        body: JSON.stringify({
          name: "",
          email: session.user.email,
          date: new Date(),
          total: parseInt(price),
          productId: id,
          addres: "",
          phone: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data) {
            toast.success("Berhasil, Lanjut Checkout");
            router.push("/order?state=unconfirmed");
          } else {
            toast.success("Berhasil, Lanjut Checkout");
            router.push("/order?state=unconfirmed");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Terjadi kesalahan. Silakan coba lagi.");
        });
    } else {
      toast.error("Silakan login terlebih dahulu");
      signIn("google"); // Memunculkan dialog login dengan Google
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div id="product">
      <div className="product">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 text-center colorlib-heading mt-5 mb-4">
              <h1>Product</h1>
            </div>
          </div>
          <div className="row">
            {data.length > 0 ? (
              data.map((prod, index) => (
                <div className="col-lg-3 col-md-6 col-12 mb-4 text-center " key={index}>
                  <div className="single-product border ">
                    <a href="#" className="prod-img">
                      <img
                        src={prod.image}
                        className="img-fluid mt-4 rounded"
                        alt="Free html5 bootstrap 4 template"
                        style={{ height: "200px" }}
                      />
                    </a>
                    <div className="desc text-white mt-3">
                      <h4 >
                        <a href="#" className="text-white">{prod.name}</a>
                      </h4>
                      {/* <label>Kode Produk : {prod.kode_product}</label> */}
                      <span className="price mb-3">
                        Rp.{prod.price}
                      </span>
                      <br/>
                      <a
                        href
                        className="btn btn-danger mt-2 ml-2 btn-sm"
                        onClick={() => handleAddBuy(prod.id, prod.price)}
                      >
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-center text-danger">Belum ada produk</h3>
            )}

            <div className="w-100" />
          </div>
        </div>
      </div>
    </div>
  );
}