import React from "react";

export default function Header() {
  return (
    <div>
      <header
        id="header"
        className="header"
        style={{ backgroundColor: "White" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <div className="section-title">Welcome to Kita Bisa Jual</div>
                <h1 className="h1-large">Ayo meraih impian bersama kami</h1>
                <p className="p-large">
                  Memberikan pelayanan di bidang branding, social media
                  management, desain grafis, animasi, foto produk, video &
                  percetakan.
                </p>
                <a className="btn-solid-lg" href="#services">
                  Selengkapnya
                </a>
                <a className="quote" href="#contact">
                  <i className="fas fa-paper-plane" />
                  Pesan Layanan
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src="/assets/img/home/header-illustration.svg"
                  alt="alternative"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
