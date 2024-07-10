import React from "react";
// import {CldUploadButton} from 'next-cloudinary';

export default function About() {
  return (
    <div className="bg-white mt-0">
      <div className="basic-1"> 
      {/* <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <span>
          Upload
        </span>
      </CldUploadButton> */}
      </div>
      <div className="basic-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-container">
                <h4 >
                  Pada Awalnya KITABISAJUAL Merupakan Perusahaan Yang Bergerak
                  Di Bidang Cetak Foto & Polaroid Yang Berada Di Banyuwangi
                  Sejak Tahun 2019.
                </h4>
                <p className="p-large " style={{textAlign:"justify"}}>
                  Pesatnya Perkembangan Dunia Teknologi Dan Informasi Membuat
                  Kami Harus Selalu Berinovasi Dan Ikut Dalam Perkembangannya.
                  Kami Pun Berusaha Untuk Bergerak Secara Online Agar Tidak
                  Tenggelam Dalam Perkembangan Dunia Informasi.
                </p><hr/>
                <div className="row">
                  <div  className="col-6">
                    <p className="text-white p-large">Visi</p>
                    <p className="text-white p-large" style={{textAlign:"justify"}}>Memberikan Hasil Yang Terbaik Dalam Sarana Promosi Yang Menarik Dan Tertarget Di Era Digital Saat Ini, Agar Memperluas Jangkauan & Permintaan Pesanan.</p>
                    </div>
                  <div  className="col-6">
                    <p className="text-white p-large">Misi</p>
                    <p className="text-white p-large" style={{textAlign:"justify"}}>Menjadi Perusahaan Yang Profesional Yang Mengedepankan Kreatifitas, Inovasi, Solusi Pemasaran Dan Penjualan Serta Mengikuti Perkembangan Teknologi.</p>
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
