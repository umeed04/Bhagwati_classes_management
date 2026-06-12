import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const ShowStudent = () => {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [deletingId, setDeletingId] = useState(null);
  const [progress, setProgress] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [successMsg, setSuccessMsg] = useState("");

  // ================= FETCH DATA =================
  const fetchData = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:5000/api/all",
              {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
      );

      setStudents(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  // ================= SEARCH FILTER =================
  const filteredData = students.filter((item) => {

    if (!search.trim()) return true;

    return (
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.className?.toString().includes(search)
    );

  });

  // ================= GROUP BY BOARD =================
  const groupedData = filteredData.reduce((acc, student) => {

    let board = student.board?.trim() || "Unknown";

    if (!acc[board]) acc[board] = [];

    acc[board].push(student);

    return acc;

  }, {});

  // ================= SORT =================
  Object.keys(groupedData).forEach((board) => {

    groupedData[board].sort((a, b) =>
      b._id.localeCompare(a._id)
    );

  });

  // ================= DELETE =================
  const confirmDelete = () => {

    setShowPopup(false);

    setDeletingId(selectedId);

    setProgress(0);

    let count = 0;

    const interval = setInterval(() => {

      count += 10;

      setProgress(count);

      if (count >= 100) {

        clearInterval(interval);

        const token = localStorage.getItem("token");

        axios.delete(
          `http://127.0.0.1:5000/api/delete/${selectedId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {

          setStudents((prev) =>
            prev.filter((item) => item._id !== selectedId)
          );

          setDeletingId(null);

          setProgress(0);

          setSuccessMsg("Student Deleted ");

          setTimeout(() => {

            setSuccessMsg("");

          }, 2000);

        })
        .catch((err) => {

          console.log(err);

          setDeletingId(null);

        });

      }

    }, 100);

  };

  return (

    <div className="container mt-4">

      {/* SUCCESS MESSAGE */}
      {successMsg && (

        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 9999,
            fontWeight: "bold",
          }}
        >
          {successMsg}
        </div>

      )}

      {/* SEARCH */}
      <input
        className="form-control mb-4"
        placeholder="Search by name or class"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* DATA */}
      {Object.keys(groupedData).length === 0 ? (

        <h5 className="text-center">
          No Data Found
        </h5>

      ) : (

        Object.keys(groupedData).map((board) => (

          <div key={board} className="mb-4">

            <h3 className="text-primary">
              {board}
            </h3>

            <div className="row">

              {groupedData[board].map((student) => (

                <div
                  className="col-md-4 mb-3"
                  key={student._id}
                >

                  <div className="card p-3 shadow-sm">

                    <h5>{student.name}</h5>

                    <p>
                      <b>Class:</b> {student.className}
                    </p>

                    <p>
                      <b>Contact:</b> {student.contact}
                    </p>

                    <p>
                      <b>Address:</b> {student.address}
                    </p>

                    {/* PROGRESS BAR */}
                    {deletingId === student._id && (

                      <div className="mb-2">

                        <div className="progress">

                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            style={{
                              width: `${progress}%`,
                            }}
                          >
                            {progress}%
                          </div>

                        </div>

                      </div>

                    )}

                    {/* BUTTONS */}
                    <div className="d-flex gap-2">

                      <NavLink
                        className="btn btn-primary btn-sm"
                        to={`/update/${student._id}`}
                      >
                        Edit
                      </NavLink>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {

                          setSelectedId(student._id);

                          setShowPopup(true);

                        }}
                        disabled={deletingId === student._id}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))

      )}

      {/* DELETE POPUP */}
      {showPopup && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >

            <h5>Confirm Delete</h5>

            <p>Are you sure?</p>

            <div className="d-flex justify-content-between mt-3">

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={confirmDelete}
              >
                Yes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default ShowStudent;