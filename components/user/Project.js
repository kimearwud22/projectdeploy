import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PostProject() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleBlogPosts = () => {
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
    fetch(`/api/post/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Berhasil menghapus post");
        } else {
          toast.error("Gagal menghapus post");
        }
        setLoading(false);
        handleBlogPosts();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    handleBlogPosts();
  }, []);

  return (
    <div id="project" className="container-fluid mt-5 mb-5 justify-content-center ml-3">
    <h3 className="font-weight-bolder text-center text-white">Post Project</h3>
      <div className="row container d-flex justify-content-center " >
        {data.length > 0 ? ( 
          data.map((post, index) => (
            <div className="col-lg-6 col-md-12 mb-4 mt-4" key={index}>
              <div className="card" style={{ height: "310px" }}>
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-lg-4 me-auto ms-0 text-center">
                      <div className="bg-gradient-primary border-radius-lg min-height-200">
                        <img
                          src={post.image}
                          className="position-absolute mt-0 rounded d-md-block d-none"
                          style={{ height: "200px", width: "200px" }}
                          alt="blog-image"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-lg-0 mt-3 mt-lg-0">
                      <div className="d-flex flex-column h-100">
                        <h3 className="font-weight-bolder">{post.title}</h3>
                        <p className="font-weight-bolder overflow-auto" style={{height: "100px"}}>{post.content}</p>
                        <span className="price mb-2">
                          {post.author.name || "Admin"}
                        </span>
                        <p className="">{post.date}</p>
                        <div>
                          {/* <Link href={`/blog/${post.id}`}> */}
                            {/* <a className="btn btn-primary mb-0 me-2" type="button">
                              Read More
                            </a> */}
                          {/* </Link> */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
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
      </div>
    </div>
  );
}
