import React from 'react'
 
export default function Footer() {
  return ( 
   <div>
  <div className="footer bg-gray">
    <img className="decoration-city" src="/assets/img/home/decoration-city.svg" alt="alternative" />
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h4>Jangan lupa follow sosial media kami agar tidak ketinggalan informasi terbaru</h4>
          <div className="social-container">
            <span className="fa-stack">
              <a href="#your-link">
                {/* <i className="fas fa-circle fa-stack-2x" />
                <i className="fab fa-facebook-f fa-stack-1x" /> */}
                <img src="/assets/img/instagram.svg" alt="Coffee Icon" />
              </a>
            </span>
            <span className="fa-stack">
              <a href="#your-link">
              <img src="/assets/img/wa.svg" alt="Coffee Icon" />
              </a>
            </span>
            <span className="fa-stack">
              <a href="#your-link">
              <img src="/assets/img/tiktok.svg" alt="Coffee Icon" />
              </a>
            </span>
            <span className="fa-stack">
              <a href="#your-link">
              <img src="/assets/img/linkedin.svg" alt="Coffee Icon" />
              </a>
            </span>
            <span className="fa-stack">
              <a href="#your-link">
              <img src="/assets/img/twitter.svg" alt="Coffee Icon" />
              </a>
            </span>
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
 <div className="copyright bg-gray">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <ul className="list-unstyled li-space-lg p-small">
          <li><a href="#">Article Details</a></li>
          <li><a href="#">Terms &amp; Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="col-lg-3">
        <p className="p-small statement">Copyright © <a href="#">PutraDwiKusuma</a></p>
      </div> 
      <div className="col-lg-3">
        <p className="p-small statement">Distributed By: <a href="#" target="_blank">KitaBisaJual</a></p>
      </div> 
    </div> 
  </div> 
</div>


</div>

  )
}
