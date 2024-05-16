import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";
// import {CldUploadButton} from 'next-cloudinary';
import useSWR from "swr";

export default function FormInputLayanan() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc , setDesc] = useState("");
  const [image, setImage] = useState("");
  const [kode_product, setKodeProduct] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  // const handleUpload = (event) => {
  //   setImage(event.target.files[0]);
  //   try{
  //     if (!event.target.files || event.target.files.length === 0) {
  //       throw new Error("Pilih file untuk diunggah.");
  //   }
  //   const file = event.target.files[0];
  //   const fileExt = file.name.split(".").pop();
  //   setFilename(file.name);
  //   console.log(fileExt);
  //   const parse = Papa.parse(file, {
  //       header: true,
  //       skipEmptyLines: true,
  //       transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_")
  //   });
  //   console.log(parse);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handleUpload = (info) => {
  //   setImage(info.secure_url);
  //   setFilename(info.original_filename);
  // }

  // const handleAddProduct = (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   const data = new FormData();
  //   data.append("name", name);
  //   data.append("price", price);
  //   data.append("desc", desc);
  //   data.append("image", image);
  //   data.append("kode_product", kode_product);
  //   fetch("/api/produk/create", {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (res.data) {
  //         toast.success("Berhasil menambahkan produk");
  //         router.push("/admin/layanan");
  //       } else {
  //         toast.error("Gagal menambahkan produk");
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //       setError(err);
  //     });
  // }

  // handle upload with cloudinary : https://api.cloudinary.com/v1_1/dkjialnw3/image/upload
  const handleUpload = async (event) => {
    event.preventDefault();
    setUploading(true);
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Pilih file untuk diunggah.");
      }
      const file = event.target.files[0];
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
      console.log(result);
      setImage(result.secure_url);
      setCreateObjectUrl(URL.createObjectURL(file));
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      setError(error);
    }
  }
  

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = { name, price, desc, image, kode_product };
      const res = await fetch("/api/produk/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 200) {
        toast.success("Berhasil menambahkan produk");
        window.location.reload();
        router.push("/admin/layanan");
      } else {
        toast.error("Gagal menambahkan produk");
      }
      setLoading(false);
    }
    catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
            <img src={createObjectUrl} alt="preview" style={{width: "30px", height:"20px"}} />
              <label className="form-control-label text-white fs-6">
                Masukkan File Gambar/Foto {filename}
                
              </label>
              {/* <input className="form-control" type="file" id="formFile" onChange={handleUpload} /> */}
              <input
                type="file"
                className="form-control"
                onChange={handleUpload}
              />
              {/* <CldUploadButton
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_NAME}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                folder="uploads"
                resourceType="image"
                buttonText="Upload File"
                onSuccess={handleUpload}
              >
                <span>
                  Upload
                </span>
              </CldUploadButton> */}
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
