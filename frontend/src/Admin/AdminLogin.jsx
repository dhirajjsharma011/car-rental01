import React, { useState } from 'react'
// import './admincss/admin.css'
import { useNavigate } from 'react-router-dom'
// import admin from './images/userimg.png'

export default function AdminLogin() {

  const navigate = useNavigate();

  const [Alogin, setAlogin] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAlogin({
      ...Alogin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://car-rental-01-9nu4.onrender.com/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Alogin)
      });

      const data = await res.json();

      if (res.status === 200) {
        setError("");
        localStorage.setItem("admin", JSON.stringify(data));
        navigate("/adminDashboard");
      } else {
        setError(data.message);
      }

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div>
      <h1 className='alog-h1'>Admin Log In page</h1>

      <div className='alog-container'>
        <br />

        {/* <img 
          src={admin} 
          alt="admin" 
          style={{ marginLeft: "140px", width: "120px" }} 
        /> */}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name='email'   
            placeholder='Enter email'
            className='alog-input'
            value={Alogin.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name='password'   
            placeholder='Enter your password'
            className='alog-input'
            value={Alogin.password}
            onChange={handleChange}
            required
          />

          <button className='alog-but' type='submit'>
            Admin Log In
          </button>
        </form>


      </div>
    </div>
  );
}