import React from "react";
import {useState, useEffect} from  'react';

export default function Card() {
  const [dataCount, setDataCount] = useState({orders: 0, products: 0, post: 0, users: 0});

  const handleCount =()=>{
    fetch('/api/counterDashboard',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res)=>res.json())
    .then((data)=>{
      setDataCount(data.data);
    }
    )
    .catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    handleCount();
  },[])
    
  return (
      <div className="row mb-5">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Data Order
                    </p>
                    <h5 className="font-weight-bolder">{dataCount.products}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        Data Order Pelanggan
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <i
                      className="ni ni-money-coins text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Data Produk
                    </p>
                    <h5 className="font-weight-bolder">{dataCount.products}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        Data Jumlah Produk
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i
                      className="ni ni-world text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Data Post
                    </p>
                    <h5 className="font-weight-bolder">+{dataCount.post}</h5>
                    <p className="mb-0">
                      <span className="text-danger text-sm font-weight-bolder">
                        Data Jumlah Post
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <i
                      className="ni ni-paper-diploma text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Data User
                    </p>
                    <h5 className="font-weight-bolder">{dataCount.users}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        Data Jumlah User
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <i
                      className="ni ni-cart text-lg opacity-10"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
