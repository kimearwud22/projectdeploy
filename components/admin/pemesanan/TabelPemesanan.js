import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TabelPemesanan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOrder = () => {
    fetch("/api/order/getOrder?state=uncormirmed", {
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
  }

  const handleDelete = (id) => {
    fetch(`/api/order/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Berhasil menghapus pemesanan");
        } else {
          toast.error("Gagal menghapus pemesanan");
        }
        setLoading(false);
        handleOrder();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }

  const handleConfirm = (e,id)=>{
    e.preventDefault();
    fetch(`/api/order/confirm`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        toast.success("Order berhasil dikonfirmasi");
        handleOrder();
      } else {
        toast.error("Order gagal dikonfirmasi");
      }
    })
    .catch((err) => {
      console.log(err);
      toast.error("Order gagal dikonfirmasi");
    });
  }
  useEffect(() => {
    handleOrder();
  }
  , []);
  return (
    <div>
      <div className="card">
      <div className="card-header pb-0">
              <h6>Tabel Pemesanan</h6>
            </div>
        <div className="table-responsive">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">
                  No.
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Nama
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Product
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Janji Temu
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Alamat
                </th>
                <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Action
                </th>
              </tr>
            </thead>
              {data.length > 0 ? data.map((item, index) => (
            <tbody>
              <tr>
                <td>
                <p className="text-xs font-weight-bold mb-0 text-center">{index + 1}</p>
                </td>
                <td>
                  <p className="text-xs font-weight-bold mb-0">{item.name}</p>
                </td>
                <td className="align-middle text-center text-sm">
                <p className="text-xs font-weight-bold mb-0">{item.product.name}</p>
                </td>
                <td className="align-middle text-center text-sm">
                <p className="text-xs font-weight-bold mb-0">{item.date}</p>
                </td>
                <td className="align-middle text-center text-sm">
                <p className="text-xs font-weight-bold mb-0">{item.addres}</p>
                </td>
                <td className="align-middle text-center text-sm">
                  <button className="btn btn-danger" onClick={()=>handleDelete(item._id)}>Delete</button>
                  <button className="btn btn-success" onClick={(e)=>handleConfirm(e,item.id)}>Confirm</button>
                </td>
                
              </tr>
            </tbody>
              )) : (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      <h5 className="font-weight-bolder">Belum ada pemesanan</h5>
                    </td>
                  </tr>
                </tbody>
              )}
              )
          </table>
        </div>
      </div>
    </div>
  );
}
