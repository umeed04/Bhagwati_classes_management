import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    className: "",
    board: "",
    gender: "",
    contact: "",
    address: "",
    totalFees: "",
  });

  const [error, setError] = useState("");

  //  SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    //  Validation
    if (!/^[0-9]{10}$/.test(data.contact)) {

      setError("Contact must be 10 digits");

      return;

    }

    try {

      //  TOKEN
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:5000/api/add",
        data,
        {
         headers: {
      authorization: `Bearer ${token}`,
    },
        }
      );

      alert("Student Added Successfully ");

      navigate("/students", { replace: true });

    } catch (err) {

      console.log(err);

      alert("Unauthorized or Error Adding Student");

    }

  };

  return (

    <div className="container mt-4 col-md-6">

      <h2 style={styles.heading}>
        🎓 Add New Student
      </h2>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow"
      >

        {/* NAME */}
        <input
          className="form-control mb-3"
          placeholder="Enter Name"
          value={data.name}
          onChange={(e) =>
            setData({
              ...data,
              name: e.target.value
            })
          }
          required
        />

        {/* CLASS */}
        <select
          className="form-control mb-3"
          value={data.className}
          onChange={(e) =>
            setData({
              ...data,
              className: e.target.value
            })
          }
          required
        >
          <option value="">
            Select Class
          </option>

          {[1,2,3,4,5,6,7,8,9,10,11,12].map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}
        </select>

        {/* BOARD */}
        <select
          className="form-control mb-3"
          value={data.board}
          onChange={(e) =>
            setData({
              ...data,
              board: e.target.value
            })
          }
          required
        >
          <option value="">
            Select Board
          </option>

          <option value="CBSE">
            CBSE
          </option>

          <option value="Gujarat">
            Gujarat
          </option>

          <option value="Maharashtra">
            Maharashtra
          </option>
        </select>

        {/* GENDER */}
        <select
          className="form-control mb-3"
          value={data.gender}
          onChange={(e) =>
            setData({
              ...data,
              gender: e.target.value
            })
          }
          required
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {/* CONTACT */}
        <input
          className="form-control mb-2"
          placeholder="Enter Contact Number"
          value={data.contact}
          onChange={(e) =>
            setData({
              ...data,
              contact: e.target.value.replace(/\D/g, "")
            })
          }
          maxLength={10}
          required
        />

        {/* ERROR */}
        {error && (
          <p className="text-danger">
            {error}
          </p>
        )}

        {/* ADDRESS */}
        <textarea
          className="form-control mb-3"
          placeholder="Enter Address"
          value={data.address}
          onChange={(e) =>
            setData({
              ...data,
              address: e.target.value
            })
          }
          required
        />

        {/* FEES */}
        <input
          type="number"
          className="form-control mb-3"
          placeholder="Enter Total Fees"
          value={data.totalFees}
          onChange={(e) =>
            setData({
              ...data,
              totalFees: e.target.value
            })
          }
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          style={styles.btn}
        >
           Add Student
        </button>

      </form>

    </div>

  );

};

export default AddStudent;


// STYLES
const styles = {

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#5c1616",
    fontWeight: "bold",
  },

  btn: {
    padding: "10px",
    background: "#5c1616",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  }

};