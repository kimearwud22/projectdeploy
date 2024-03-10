import React from "react";

export default function DetailProject() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-lg-0 mb-4 mt-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-lg-4 me-auto ms-0 text-center">
                  <div className="bg-gradient-primary border-radius-lg min-height-200">
                    <img
                      className="position-absolute mt-0 rounded d-md-block d-none"
                      style={{height: "200px", width: "200px"}} 
                      alt="waves"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-lg-0  mt-3 mt-lg-0">
                  <div className="d-flex flex-column h-100">
                    <h3 className="font-weight-bolder">rtttt</h3>
                    <h5 className="font-weight-bolder">eee</h5>
                    <span className="price mb-2">eeee</span>
                    <p className="">
                eeeee
                    </p>
                    <div>
                    <button className="btn btn-primary mb-0 me-2" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger mb-0" type="button">
                    Hapus
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )) : (
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
        )
        <div className="col-lg-6 mt-4">
        <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-lg-4 me-auto ms-0 text-center">
                  <div className="bg-gradient-primary border-radius-lg min-height-200">
                    <img
                      src="/assets/img/team-2.jpg"
                      className="position-absolute mt-0 rounded d-md-block d-none"
                      style={{height: "200px", width: "200px"}} 
                      alt="waves"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-lg-0  mt-3 mt-lg-0">
                  <div className="d-flex flex-column h-100">
                    <h5 className="font-weight-bolder">Nama Layanan</h5>
                    <p className="">
                    Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak.
                    </p>
                    <div>
                    <button className="btn btn-primary mb-0 me-2" type="button">
                    Edit
                  </button>
                  <button className="btn btn-danger mb-0" type="button">
                    Hapus
                  </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
