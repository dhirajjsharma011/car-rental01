import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaCar } from "react-icons/fa";
import "../styling/Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  // =========================
  // USER DATA
  // =========================

  const userName = localStorage.getItem("name");


  // =========================
  // LOGIN STATE
  // =========================

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });


  // =========================
  // LOGIN INPUT CHANGE
  // =========================

  const handleLoginChange = (e) => {

    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // LOGIN
  // =========================

  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "http://localhost:1175/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(login)
        }
      );


      const data = await res.json();


      console.log("Login Response:", data);


      if (res.ok) {

        // =========================
        // SAVE USER DATA
        // =========================

        localStorage.setItem(
          "name",
          data.user.name
        );


        localStorage.setItem(
          "userId",
          data.user._id
        );


        localStorage.setItem(
          "token",
          data.token
        );


        console.log(
          "Saved User ID:",
          data.user._id
        );


        alert("Login Successfully");


        // Close login popup
        setShowLogin(false);


        // Clear login form
        setLogin({
          email: "",
          password: ""
        });


        // =========================
        // REDIRECT
        // =========================

        if (data.user.role === "admin") {

          navigate("/admindash");

        } else {

          navigate("/");

        }

      } else {

        alert(
          data.message || "Login Failed"
        );

      }

    } catch (error) {

      console.log(
        "Login Error:",
        error
      );

      alert(
        "Server not reachable."
      );

    }

  };


  // =========================
  // REGISTER STATE
  // =========================

  const [regData, setRegData] = useState({

    name: "",
    email: "",
    contact: "",
    password: "",
    confirmpassword: ""

  });


  // =========================
  // REGISTER INPUT CHANGE
  // =========================

  const handleRegisterChange = (e) => {

    setRegData({
      ...regData,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // REGISTER
  // =========================

  const handleRegisterSubmit = async () => {

    // Check password
    if (
      regData.password !==
      regData.confirmpassword
    ) {

      alert(
        "Passwords do not match!"
      );

      return;
    }


    // Check fields
    if (
      !regData.name ||
      !regData.email ||
      !regData.contact ||
      !regData.password
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }


    try {

      const res = await fetch(
        "http://localhost:1175/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            name: regData.name,
            email: regData.email,
            contact: regData.contact,
            password: regData.password

          })
        }
      );


      const data = await res.json();


      console.log(
        "Register Response:",
        data
      );


      if (res.ok) {

        alert(
          "Registration Successful"
        );


        // Close register popup
        setShowRegister(false);


        // Clear form
        setRegData({

          name: "",
          email: "",
          contact: "",
          password: "",
          confirmpassword: ""

        });


        // Open login popup
        setShowLogin(true);

      } else {

        alert(
          data.message ||
          "Registration Failed"
        );

      }

    } catch (error) {

      console.log(
        "Register Error:",
        error
      );

      alert(
        "Server not reachable."
      );

    }

  };


  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {

    localStorage.removeItem("name");

    localStorage.removeItem("userId");

    localStorage.removeItem("token");


    setShowDropdown(false);


    alert("Logout Successfully");


    navigate("/");

  };


  // =========================
  // JSX
  // =========================

  return (

    <div className="crnav-wrapper">

      {/* =====================================
          TOP INFO BAR
      ====================================== */}

      <div className="crnav-topbar">

        {/* LOGO */}

        <div className="crnav-logo">

          <h3>

            <FaCar
              style={{
                marginRight: "8px"
              }}
            />

            Car Rental Portal

          </h3>

        </div>


        {/* SUPPORT EMAIL */}

        <div className="crnav-support">

          <span>

            <FaEnvelope />

            {" "}FOR SUPPORT MAIL US :

          </span>

          <p>
            info@gmail.com
          </p>

        </div>


        {/* PHONE */}

        <div className="crnav-phone">

          <span>

            <FaPhoneAlt />

            {" "}SERVICE HELPLINE CALL US :

          </span>

          <p>
            8974561236
          </p>

        </div>


        {/* LOGIN / REGISTER */}

        {!userName && (

          <div className="loginregister">

            <span
              className="loglink"
              onClick={() => {
                setShowLogin(true);
                setShowRegister(false);
              }}
            >
              Login /
            </span>


            <span
              className="loglink"
              onClick={() => {
                setShowRegister(true);
                setShowLogin(false);
              }}
            >
              Register
            </span>

          </div>

        )}

      </div>


      {/* =====================================
          NAVBAR
      ====================================== */}

      <div className="crnav-navbar">

        {/* NAVIGATION LINKS */}

        <div className="crnav-links">

          <Link to="/">
            HOME
          </Link>

          <Link to="/about">
            ABOUT US
          </Link>

          <Link to="/cars">
            CAR LISTING
          </Link>

          <Link to="/faqs">
            FAQS
          </Link>

          <Link to="/contact">
            CONTACT US
          </Link>

        </div>


        {/* RIGHT SIDE */}

        <div className="crnav-right">

          {/* ACCOUNT */}

          <div className="crnav-account">

            {userName ? (

              <div className="dropdown">

                <span
                  className="username"
                  onClick={() =>
                    setShowDropdown(
                      !showDropdown
                    )
                  }
                >

                  {userName} ⬇

                </span>


                {/* DROPDOWN */}

                {showDropdown && (

                  <div className="dropdown-menu">

                    <Link to="/profile">
                      Profile
                    </Link>

                    <br />


                    <Link to="/mybooking">
                      My Bookings
                    </Link>

                    <br />


                    <span
                      onClick={handleLogout}
                    >
                      Log Out
                    </span>

                  </div>

                )}

              </div>

            ) : (

              <span
                className="account-text"
                onClick={() =>
                  setShowLogin(true)
                }
              >
                Account
              </span>

            )}

          </div>


          {/* SEARCH */}

          <input
            className="crnav-search"
            type="text"
            placeholder="Search..."
          />

        </div>

      </div>


      {/* =====================================
          LOGIN POPUP
      ====================================== */}

      {showLogin && (

        <div className="popup-overlay">

          <div className="popup-box">

            <button
              className="close-btn"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>


            <h2>
              Login
            </h2>


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={login.email}
              onChange={handleLoginChange}
            />


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={login.password}
              onChange={handleLoginChange}
            />


            <button
              className="submit-btn"
              onClick={handleLoginSubmit}
            >
              Login
            </button>

          </div>

        </div>

      )}


      {/* =====================================
          REGISTER POPUP
      ====================================== */}

      {showRegister && (

        <div className="popup-overlay">

          <div className="popup-box">

            <button
              className="close-btn"
              onClick={() =>
                setShowRegister(false)
              }
            >
              ×
            </button>


            <h2>
              Register
            </h2>


            <input
              type="text"
              name="name"
              placeholder="Name"
              value={regData.name}
              onChange={handleRegisterChange}
            />


            <input
              type="email"
              name="email"
              placeholder="Email"
              value={regData.email}
              onChange={handleRegisterChange}
            />


            <input
              type="number"
              name="contact"
              placeholder="Contact"
              value={regData.contact}
              onChange={handleRegisterChange}
            />


            <input
              type="password"
              name="password"
              placeholder="Password"
              value={regData.password}
              onChange={handleRegisterChange}
            />


            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              value={regData.confirmpassword}
              onChange={handleRegisterChange}
            />


            <button
              className="submit-btn"
              onClick={handleRegisterSubmit}
            >
              Register
            </button>

          </div>

        </div>

      )}

    </div>

  );
}
