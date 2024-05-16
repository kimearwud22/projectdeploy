import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function FormInputProject() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [date, setDate] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);

  const router = useRouter();
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

  const handleAuthor = () => {
    fetch('/api/user/all', {
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


  const handleAddProject = (event) => {
    event.preventDefault();
    setLoading(true);
    try{
      const data = {
        title, content, image, date, authorId
      };
      const res = fetch("/api/project/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        toast.success("Project berhasil ditambahkan");
        setTitle("");
        setContent("");
        setImage("");
        setDate("");
        setAuthorId("");
        setFilename("Choose File");
        router.push("/admin/project");
        window.location.reload();
      } else {
        toast.error("Gagal menambahkan project");
      }
      setLoading(false);

    } 
    catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    handleAuthor();
  }, []);


  return (
    <div>
      <div>
        <form onSubmit={handleAddProject}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
              <img src={createObjectUrl} alt="preview" style={{width: "30px", height:"20px"}} />
                <label className="form-control-label text-white fs-6">
                  Masukkan File Gambar/Foto
                </label>
                <input className="form-control" type="file" id="formFile" onChange={handleUpload} />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label text-white fs-6">
                Nama Project
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama Product"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label text-white fs-6">
                Tanggal Project
              </label>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Masukkan Harga"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label text-white fs-6">
                Author
              </label>
              <div className="form-group">
                <select onChange={(e) => {setAuthorId(e.target.value.split(";")[0])}} className="form-control">
                  <option value="">Pilih Author</option>
                  {data.map((item, index) => (
                    <option key={index} value={`${item.id};${item.name}`}>{item.name}</option>
                  ))}
                </select>
                </div>
                </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="text-white fs-6">Content Project</label>
                <textarea
                  className="form-control"
                  rows={3}
                  defaultValue={""}
                  placeholder="Masukkan Deskripsi"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
    </div>
  );
}
