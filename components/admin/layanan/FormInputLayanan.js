import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";

export default function FormInputLayanan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc , setDesc] = useState("");
  const [image, setImage] = useState("");
  const [kode_product, setKodeProduct] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleUpload = (event) => {
    setImage(event.target.files[0]);
    try{
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Pilih file untuk diunggah.");
    }
    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    setFilename(file.name);
    console.log(fileExt);
    const parse = Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_")
    });
    console.log(parse);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleAddProduct = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("desc", desc);
    data.append("image", image);
    data.append("kode_product", kode_product);
    fetch("/api/produk/create", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Berhasil menambahkan produk");
          router.push("/admin/layanan");
        } else {
          toast.error("Gagal menambahkan produk");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-control-label text-white fs-6">
                Masukkan File Gambar/Foto {filename}
              </label>
              <input className="form-control" type="file" id="formFile" onChange={handleUpload} />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-control-label text-white fs-6">
              Kode Product
            </label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama Product"
                value={kode_product}
                onChange={(event) => setKodeProduct(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-control-label text-white fs-6">
              Nama Product
            </label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama Product"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-control-label text-white fs-6">
              Harga
            </label>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama Product"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="text-white fs-6">
                Deskripsi Product
              </label>
              <textarea
                className="form-control"
                rows={3}
                defaultValue={""}
                placeholder="Masukkan Deskripsi"
                value={desc}
                onChange={(event) => setDesc(event.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
          <button className="btn btn-dark w-50 mt-5" type="submit">
            Submit
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
