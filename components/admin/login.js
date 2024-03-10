import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {setCookie} from '../../libs/cookie.lib';
import { toast } from 'react-toastify';

export default function Formlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter();

  const handleLogin = (e) =>{
    e.preventDefault();
    setLoading(true);
    fetch('api/auth/login', {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.message === "Login success" && data.user.token){
        toast.success("Login Success");
        setCookie("token", data.user.token, 1);
        router.push("/admin");
      } else {
        setError(data.message);
      }
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      toast.error("Login Failed");
      setLoading(false)
    });
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center shadow">
                <h3 className="mb-5">Login</h3>
                <div className="form-outline mb-4">
                  <input type="email" id="typeEmailX-2" className="form-control form-control-lg" value={username} onChange={(e)=> setUsername(e.target.value)} />
                  <label className="form-label" htmlFor="typeEmailX-2">Username</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg" value={password} onChange={(e)=> setPassword(e.target.value)} />
                  <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                </div>
                {/* Checkbox */}
                {/* <div className="form-check d-flex justify-content-start mb-4">
                  <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" />
                  <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div> */}
                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleLogin} >Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}