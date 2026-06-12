import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {

  const { id } = useParams();
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

  //  TOKEN
  const token = localStorage.getItem("token");

  // FETCH SINGLE STUDENT
  useEffect(() => {

    const fetchStudent = async () => {

      try {

        const res = await axios.get(
          `http://127.0.0.1:5000/api/single/${id}`,
          {
           headers: {
      authorization: `Bearer ${token}`,
    },
          }
        );

        const s = res.data;

        setData({
          name: s.name || "",
          className: s.className || "",
          board: s.board || "",
          gender: s.gender || "",
          contact: s.contact || "",
          address: s.address || "",
          totalFees: s.totalFees || "",
        });

      } catch (err) {

        console.log(err);

        //  IF TOKEN INVALID
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }

      }

    };

    fetchStudent();

  }, [id, token, navigate]);

  // HANDLE CHANGE
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  // UPDATE STUDENT
  const handleSubmit = async (e) => {

    e.preventDefault();

    //  VALIDATION
    if (!/^[0-9]{10}$/.test(data.contact)) {

      setError("Contact must be 10 digits");
      return;

    }

    setError("");

    try {

      await axios.put(
        `http://127.0.0.1:5000/api/update/${id}`,
        data,
        {
        headers: {
      authorization: `Bearer ${token}`,
    },
        }
      );

      alert("Student Updated Successfully");

      navigate("/students", { replace: true });

    } catch (err) {

      console.log(err);

      if (err.response?.status === 401) {

        alert("Unauthorized Access");

        localStorage.removeItem("token");

        navigate("/");

      } else {

        alert("Error Updating Student");

      }

    }

  };

  return (

    <div className="container mt-4 col-md-6">

      <h2 style={styles.heading}>
         Edit Student
      </h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        {/* NAME */}
        <input
          type="text"
          className="form-control mb-3"
          name="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={handleChange}
          required
        />

        {/* CLASS */}
        <select
          className="form-control mb-3"
          name="className"
          value={data.className}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>

          {[1,2,3,4,5,6,7,8,9,10,11,12].map((c) => (
            <option key={c} value={c}>
              Class {c}
            </option>
          ))}

        </select>

        {/* BOARD */}
        <select
          className="form-control mb-3"
          name="board"
          value={data.board}
          onChange={handleChange}
          required
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>

        {/* GENDER */}
        <select
          className="form-control mb-3"
          name="gender"
          value={data.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* CONTACT */}
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          placeholder="Enter Contact Number"
          value={data.contact}
          maxLength={10}
          onChange={(e) =>
            setData({
              ...data,
              contact: e.target.value.replace(/\D/g, ""),
            })
          }
          required
        />

        {/* ERROR */}
        {error && (
          <p className="text-danger fw-bold">
            {error}
          </p>
        )}

        {/* ADDRESS */}
        <textarea
          className="form-control mb-3"
          name="address"
          placeholder="Enter Address"
          value={data.address}
          onChange={handleChange}
          rows="3"
          required
        />

        {/* TOTAL FEES */}
        <input
          type="number"
          className="form-control mb-3"
          name="totalFees"
          placeholder="Enter Total Fees"
          value={data.totalFees}
          onChange={handleChange}
          required
        />

        {/* BUTTON */}
        <button type="submit" style={styles.btn}>
          💾 Update Student
        </button>

      </form>

    </div>

  );

};

export default EditStudent;

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
    width: "100%",
  },

};