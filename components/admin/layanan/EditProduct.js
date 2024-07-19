import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";

export default function EditLayanan() {
    const [data, setData] = useState([]);
const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc , setDesc] = useState("");
  const [image, setImage] = useState("");
  const [kode_product, setKodeProduct] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {id} = useRouter().query;

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

  const handleEdit = async (id) => {
    try{
        const res = await fetch(`/api/produk/${id}`)
        const json = await res.json()
        setData(json.data)
        setName(json.data.name)
        setPrice(json.data.price)
        setDesc(json.data.desc)
        setKodeProduct(json.data.kode_product)
        setImage(json.data.image)
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
    }

    useEffect(() => {
        if(id){
            handleEdit(id)
        }
    }, [id])

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("desc", desc);
        formData.append("image", image);
        formData.append("kode_product", kode_product);
        const res = await fetch(`/api/produk/${id}`, {
            method: "PUT",
            body: formData
        })
        const json = await res.json()
        if(!res.ok) return toast.error(json.message)
        toast.success(json.message)
        // router.push("/admin/layanan")
        console.log(json)
    } 


  return (
    <div>
      <form onSubmit={handleUpdateProduct}>
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
