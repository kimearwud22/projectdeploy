import React from "react";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/router";

export default function EditProject() {
    const [data, setData] = useState([]);
    const [title_, setTitle] = useState("");
    const [content_, setContent] = useState("");
    const [image_, setImage] = useState("");
    const [authorId_, setAuthorId] = useState("");
    const [date_, setDate] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [createObjectUrl, setCreateObjectUrl] = useState(null);


  const resetForm = () => {
    setTitle("");
    setContent("");
    setImage("");
    setDate("");
    setAuthorId("");
    setFilename("Choose File");
  }
  const router = useRouter();
  const {title, content, image, authorId, date, id} = router.query;

  useEffect(() => {
    if(typeof title === "string"){
        setTitle(title);
    }
    if(typeof content === "string"){
        setContent(content);
    }
    if(typeof image === "string"){
        setImage(image);
    }
    if(typeof authorId === "string"){
        setAuthorId(authorId);
    }
    if(typeof date === "string"){
        setDate(date);
    }
    }, [title, content, image, authorId, date]);

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
        title: title_,
        content: content_,
        image: image_,
        authorId: authorId_,
        date: date_,
      };
      const res = await fetch(`/api/post/update?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === "success") {
        toast.success("Project berhasil diubah");
        resetForm();
        router.push("/admin/project");
      } else {
        toast.success("berhasil mengubah Project");
        console.log(result);
        router.push("/admin/project");
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

    useEffect(() => {
        handleAuthor();
        }
    , []);
  


  return (
    <div>
      <div>
        <form onSubmit={handleEdit}>
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
                  value={title_}
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
                  value={date_}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label text-white fs-6">
                Author
              </label>
              <div className="form-group">
                {/* <select onChange={(e) => {setAuthorId(e.target.value.split(";")[0])}} className="form-control">
                  <option value="">Pilih Author</option>
                  {data.map((item, index) => (
                    <option key={index} value={`${item.id};${item.name}`}>{item.name}</option>
                  ))}
                </select> */}
                <select onChange={(e) => setAuthorId(e.target.value.split(";")[0])} className="form-control">
                    <option value="">Pilih Author</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
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
                  value={content_}
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
