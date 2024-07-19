import Link from 'next/link'
import React from 'react'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import {useRouter} from 'next/router'

export default function OrderCart() {
  //get and update order from api/orderCart by state
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [state, setState] = useState("unconfirmed");
  const router = useRouter()

  const handleOrder = ()=>{
    fetch('/api/order/notif?state=uncormirmed', {
      method: "GET",
  })
      .then((res) => res.json())
      .then((res) => {
          if (res.data) {
              setData(res.data);
              setTotal(res.data.reduce((total, item) => total + item.total, 0));
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
  }

  //handle data order clear ketika handle update dilakukan 
  const handleClear = () => {
    setName("");
    setAddres("");
    setPhone("");
    setDate("");
    setData([]);
  };

  const handleUpdateOrder =(e)=>{
    e.preventDefault()
    fetch('/api/order/update?state=unconfirmed', {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        addres: addres,
        phone: phone,
        date: date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Berhasil diupdate");
          router.push('/checkout')
        } else {
          setLoading(false);
          toast.success("Berhasil Manambahkan data diri");
          handleClear();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Terjadi kesalahan saat mengupdate data");
      });
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    fetch(`/api/order/notif?id=${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                toast.success("Berhasil dihapus");
                handleOrder();
            } else {
                toast.error("Gagal dihapus");
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error("Terjadi kesalahan saat menghapus data");
        });
  };


  useEffect(() => {
    handleOrder()
  }, [])

  return (
    <div>
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                  <div className="col-lg-5">
                      <div className="card bg-success text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Data Pemesan</h5>
                          </div>
                          <p className="small mb-2">Pembayaran Bisa Melalui Tranfer BANK</p>
                          <a href="#!" type="submit" className="text-white ml-2">
                            <i className="fa-2x me-2" />
                            - BCA
                          </a>
                          <a href="#!" type="submit" className="text-white ml-2">
                            <i className="fa-2x me-2" />
                            - BNI
                          </a>
                          <a href="#!" type="submit" className="text-white ml-2">
                            <i className="fa-2x me-2" />
                            - BRI
                          </a>
                          <a href="#!" type="submit" className="text-white ml-2">
                            <i className="fa-2x" />
                            - Mandiri
                          </a>
                          <form className="mt-4" onSubmit={handleUpdateOrder}>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeName">
                                Nama
                              </label>
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                placeholder="Nama Pemesan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeText">
                                No WhatsApp
                              </label>
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="08xxxxxxxxxx"
                                minLength={10}
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeText">
                                Janji Temu 
                              </label>
                              <input
                                type="date"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="08xxxxxxxxxx"
                                value={date}
                                required
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </div>
                            <div className="form-outline form-white mb-4">
                              <label className="form-label" htmlFor="typeText">
                                Alamat
                              </label>
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                placeholder="Masukan alamat"
                                minLength={3}
                                value={addres}
                                required
                                onChange={(e) => setAddres(e.target.value)}
                              />
                            </div>
                            {/* <input type="hidden" name="id" value={data.id} /> */}
                            <button
                            type="submit"
                            className="btn btn-secondary btn-block btn-lg"

                          >
                            <div className="">
                              <span>
                                Confirm
                              </span>
                            </div>
                          </button>
                            <button
                            className="btn btn-primary btn-block btn-lg"

                          >
                            <div className="">
                              <span>
                                <a href='/' >
                                Kembali
                                </a>
                              </span>
                            </div>
                          </button>
                          </form>
                          <hr className="my-4" />
                          {/* <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">Rp. 300.000</p>
                          </div> */}
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Ongkir Luar Banyuwangi</p>
                            <p className="mb-2">Rp. 20.000</p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total</p>
                            <p className="mb-2">{total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <a href="#!" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2" />
                          Konfirmasi  
                        </a>
                      </h5>
                      {/* <h6 className="mb-4">
                        Status : {state}
                      </h6> */}
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Isikan Data Pemesan</p>
                          {/* <p className="mb-0">Kamu memiliki {data.length} Barang</p> */}
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted"></span>{" "}
                            <a href="#!" className="text-body">
                              <i className="fas fa-angle-down mt-1" /> 
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="card mb-3 bg-success text-white">
                        <div className="card-body">
                        {data.length > 0 ? data.map((ord, index) => (
                          <div className="d-flex justify-content-between" key={index}>
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={ord.product.image}
                                  className="img-fluid rounded-3 mr-3"
                                  alt="Shopping item"
                                  style={{ width: 65 }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{ord.product.name}</h5>
                                <p className="small mb-0">{ord.product.desc}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: 130 }}>
                                <h5 className="mb-0">{ord.product.price}</h5>
                              </div>
                              <div className="d-flex align-items-center btn btn-outline-dark">
                                <a href="#!" className="text-white " onClick={(e) => handleDelete(e, ord.id)}>
                                  X
                                </a>
                                </div>
                            </div>
                          </div>
                        )) : 
                        <div className="text-center">
                          <a href="https://wa.me/+6287851772114" className='btn btn-success' target="_blank">Hubungi Admin</a>
                          <a href="/" className='btn btn-primary' target="_blank">Kembali</a>
                        </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}