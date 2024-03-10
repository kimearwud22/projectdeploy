import Link from "next/link";
import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";

export default function CardProject() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleProduct = () => {
    fetch('/api/post/all', {
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

  const handleDelete = (id) => {
    fetch(`/api/post/delete?id=${id}`, {
      method: "DELETE",
  })
      .then((res) => res.json())
      .then((res) => {
          if (res.data) {
              toast.success("Berhasil menghapus project");
              handleProduct();
          } else {
              toast.error("Gagal menghapus produk");
          }
          setLoading(false);
          
      })
      .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(err);
      });
  }

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div>
      <div className="row">
      {data.length > 0 ? data.map((item, index) => (  
        <div className="col-lg-6 mb-lg-0 mb-4 mt-4" key={index}>
          <div className="card">
            <div className="card-body p-3" style={{height: "350px"}}>
              <div className="row" style={{height: "300px"}}>
                <div className="col-lg-4 me-auto ms-0 text-center">
                  <div className="bg-gradient-primary border-radius-lg min-height-200">
                    <img
                      src={item.image}
                      className="position-absolute mt-0 rounded d-md-block d-none"
                      style={{height: "200px", width: "200px"}} 
                      alt="waves"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-lg-0  mt-3 mt-lg-0">
                  <div className="d-flex flex-column h-100">
                    <h4 className="font-weight-bolder">{item.title}</h4>
                    <p className="font-weight-bolder overflow-auto text-ellipsis" style={{height: "100px"}}> {item.content}</p>
                    <span className="price mb-2">{item.author.name || "Admin"}</span>
                    <p className="">
                    {item.date}
                    </p>
                    <div>
                    <Link href={`/admin/produk/edit?id=${item.id}`} className="btn btn-primary mb-0 me-2" type="button">
                    Edit
                  </Link>
                  <button className="btn btn-danger mb-0" type="button" onClick={() => handleDelete(item.id)}>
                    Hapus
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )) : (
          <div className="col-lg-12 mb-lg-0 mb-4 mt-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-12 me-auto ms-0 text-center">
                    <h5 className="font-weight-bolder">Belum ada Post </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="col-lg-6 mt-4">
        <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-lg-4 me-auto ms-0 text-center">
                  <div className="bg-gradient-primary border-radius-lg min-height-200">
                    <img
                      src="/assets/img/team-2.jpg"
                      className="position-absolute mt-0 rounded d-md-block d-none"
                      style={{height: "200px", width: "200px"}} 
                      alt="waves"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-lg-0  mt-3 mt-lg-0">
                  <div className="d-flex flex-column h-100">
                    <h5 className="font-weight-bolder">Nama Layanan</h5>
                    <p className="">
                    Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                    </p>
                    <div>
                    <button className="btn btn-primary mb-0 me-2" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger mb-0" type="button">
                    Hapus
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
