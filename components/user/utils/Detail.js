import React from "react";

export default function Detail() {
  return (
    <div>
      <div id="details" className="basic-1" style={{backgroundColor:"white"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src="/assets/img/home/details-1.svg"
                  alt="alternative"
                />
              </div>{" "}
            </div>{" "}
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <h2>
                  <span>Spesifikasi Alamat</span>
                  <br /> for your small business
                </h2>
                <p>
                  Maecenas fringilla quam posuere, pellentesque est nec, gravida
                  turpis. Integer vitae mollis felis. Integer id quam id tellus
                  hendrerit laciniad binfer
                </p>
                <p>
                  Sed id dui rutrum, dictum urna eu, accumsan turpis. Fusce id
                  auctor velit, sed viverra dui rem dina
                </p>
                <a
                  className="btn-solid-reg"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Modal
                </a>
              </div>{" "}
              {/* end of text-container */}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
