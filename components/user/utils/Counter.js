import React from "react";

export default function Counter() {
  return (
    <div>
      <div className="counter" style={{backgroundColor:"white"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-xl-5">
              <div className="text-container">
                <h2>
                  <span>Kami telah melayani</span>
                  <br /> berbegai jenis kebutuhan pelanggan
                </h2>
                <p>
                Dengan motto perusahaan meraih impian bersama kami, KITABISAJUAL Ingin selalu memanjakan setiap klien yang menggunakan jasa kami dengan pelayanan yang terbaik dan hasil yang maksimal.
                </p>
                <div className="counter-container">
                  <div className="counter-cell">
                    <div
                      data-purecounter-start={0}
                      data-purecounter-end={1250}
                      data-purecounter-duration={0}
                      className="purecounter"
                    >
                      50
                    </div>
                    <div className="counter-info">Happy Customers</div>
                  </div>{" "}
                  <div className="counter-cell red">
                    <div
                      data-purecounter-start={0}
                      data-purecounter-end={1380}
                      data-purecounter-duration={0}
                      className="purecounter"
                    >
                      80
                    </div>
                    <div className="counter-info">Issues Solved</div>
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-lg-6 col-xl-7">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src="/assets/img/home/details-2.svg"
                  alt="alternative"
                />
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
