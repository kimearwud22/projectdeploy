import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";

export default function EditLayanan() {
    const [data, setData] = useState([]);
const [name_, setName] = useState("");
  const [price_, setPrice] = useState("");
  const [desc_ , setDesc] = useState("");
  const [image_, setImage] = useState("");
  const [kode_product_, setKodeProduct] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);


  const resetForm = () => {
    setName("");
    setPrice("");
    setDesc("");
    setImage("");
    setKodeProduct("");
    setFilename("Choose File");
  }
  const router = useRouter();
  const {name, price, image, desc, kode_product, id} = router.query;

  useEffect(() => {
    if(typeof name === "string"){
      setName(name);
    }
    if(typeof price === "string"){
      setPrice(price);
    }
    if(typeof image === "string"){
      setImage(image);
    }
    if(typeof desc === "string"){
      setDesc(desc);
    }
    if(typeof kode_product === "string"){
      setKodeProduct(kode_product);
    }
  }, [name, price, image, desc, kode_product]);

  const handleUpload = async (event) => {
    event.preventDefault();
      setUploading(true);
      try{
        if(!e.target.files || e.target.files.length === 0){
          console.error("No file selected");
          return;
        }
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        setFilename(file.name);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME);
        const res = await fetch("https://api.cloudinary.com/v1_1/dkjialnw3/image/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        setImage(result.secure_url);
        setImagePreview(URL.createObjectURL(file));
        setCreateObjectUrl(URL.createObjectURL(file));
        setUploading(false);
        console.log(result.secure_url);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
  
    };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        name: name_,
        price: price_,
        image: image_,
        desc: desc_,
        kode_product: kode_product_,
      };
      const res = await fetch(`/api/produk/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === "success") {
        toast.success("Product berhasil diubah");
        resetForm();
        router.push("/admin/layanan");
      } else {
        toast.success("berhasil mengubah product");
        console.log(result);
        router.push("/admin/layanan");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  


  return (
    <div>
      <form onSubmit={handleEdit}>
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
                value={kode_product_}
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
                value={name_}
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
                value={price_}
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
                value={desc_}
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
