import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import leftLogo from "../Components/logo1.jpeg";

import rightLogo from "../Components/logo2.jpeg";


const Navbar = () => {

  const navigate = useNavigate();

  //  Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div>

      {/* Header */}
      <div
        className="container-fluid text-white py-2"
        style={{
          background:
            "linear-gradient(90deg,rgb(242,227,68),rgb(92,22,22),rgb(242,227,68))"
        }}
      >

        <div className="row text-center align-items-center">

          <div className="col-4 text-start">
            <img
              src={leftLogo}
              alt="logo"
              className="rounded-circle"
              style={{
                height: "60px",
                width: "60px"
              }}
            />
          </div>

          <div className="col-4">
            <h4 className="m-0 fw-bold">
              𝕭𝖍𝖆𝖌𝖜𝖆𝖙𝖎 𝕴𝖓𝖘𝖙𝖎𝖙𝖚𝖙𝖊
            </h4>
          </div>

          <div className="col-4 text-end">
            <img
              src={rightLogo}
              alt="logo"
              className="rounded-circle"
              style={{
                height: "60px",
                width: "60px"
              }}
            />
          </div>

        </div>

      </div>


      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

        <div className="container">

          <ul className="navbar-nav me-auto">

            {/*  HOME */}
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive
                    ? "active fw-bold text-primary"
                    : "")
                }
              >
                Home
              </NavLink>
            </li>


            {/*  ADMISSION */}
            <li className="nav-item">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive
                    ? "active fw-bold text-primary"
                    : "")
                }
              >
                Admission
              </NavLink>
            </li>


            {/*  STUDENTS */}
            <li className="nav-item">
              <NavLink
                to="/students"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive
                    ? "active fw-bold text-primary"
                    : "")
                }
              >
                Students
              </NavLink>
            </li>


            {/* FEES */}
            <li className="nav-item">
              <NavLink
                to="/fees"
                className={({ isActive }) =>
                  "nav-link " +
                  (isActive
                    ? "active fw-bold text-primary"
                    : "")
                }
              >
                Fees Status
              </NavLink>
            </li>

          </ul>


          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="btn btn-danger"
          >
            Logout
          </button>

        </div>

      </nav>

    </div>

  )

}

export default Navbar;