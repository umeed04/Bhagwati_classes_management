import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const FeesDashboard = () => {
  const [students, setStudents] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [popup, setPopup] = useState(null);
 const token = localStorage.getItem("token");
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get( "http://127.0.0.1:5000/api/all",
        {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
      );
      setStudents(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (index, value) => {
    setAmounts({ ...amounts, [index]: value });
  };

  const payFees = async (index) => {
    const amount = amounts[index];
    if (!amount) return alert("Enter amount");

    const stu = students[index];
    if (!stu || !stu._id) return alert("Student not found");

    const total = Number(stu.totalFees || 0);
    const paid = Number(stu.paidFees || 0);
    const remaining = total - paid;

    if (remaining <= 0) return alert("Fees already completed!");
    if (Number(amount) > remaining)
      return alert(`Only ₹${remaining} remaining allowed`);

    try {
      const res = await axios.post(
  "http://127.0.0.1:5000/api/fees",
  {
    studentId: stu._id,
    amount: Number(amount),
  },
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
);  

      if (!res.data.success) return alert(res.data.message);

      setPopup({
        name: stu.name,
        amount: Number(amount),
        remaining: remaining - Number(amount),
      });

      setAmounts({ ...amounts, [index]: "" });
      fetchStudents();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };





const downloadAllReports = () => {
  let data = [];

  students.forEach((student, index) => {

    const total = Number(student.totalFees || 0);
    const paid = Number(student.paidFees || 0);
    const pending = total - paid;

    const paidInstallments = (student.installments || []).filter(
      (inst) => inst.status === "Paid"
    );

    //  If NO paid installments → only student row
    if (paidInstallments.length === 0) {
      data.push({
        Sr_no: index + 1,
        Name: student.name,
        Class: student.className,
        Board: student.board,
        Contact: student.contact,
        Address: student.address,
        TotalFees: total,
        PaidFees: paid,
        RemainingFees: pending <= 0 ? "Completed" : `₹ ${pending}`, 
        Installment: "-",
        Amount: "-",
        Status: "-",
        Date: "-",
      });
    } else {
      // Student + installments
      paidInstallments.forEach((inst, i) => {
        data.push({
          Sr_no: i === 0 ? index + 1 : "",
          Name: i === 0 ? student.name : "",
          Class: i === 0 ? student.className : "",
          Board: i === 0 ? student.board : "",
          Contact: i === 0 ? student.contact : "",
          Address: i === 0 ? student.address : "",
          TotalFees: i === 0 ? total : "",
          PaidFees: i === 0 ? paid : "",
          RemainingFees:
            i === 0
              ? pending <= 0
                ? "Completed"
                : `₹ ${pending}`
              : "",

          Installment: `Inst ${i + 1}`, 
          Amount: inst.amount,
          Status: inst.status,
          Date: inst.date
            ? new Date(inst.date).toLocaleDateString("en-GB")
            : "-",
        });
      });
    }
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "All Students Report");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([buffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "All_Students_Report.xlsx");
};
 

  const totalStudents = students.length;
  const totalFees = students.reduce((a, s) => a + Number(s.totalFees || 0), 0);
  const totalPaid = students.reduce((a, s) => a + Number(s.paidFees || 0), 0);
  const pending = totalFees - totalPaid;

  const styles = {
    page: {
      padding: "20px",
      minHeight: "100vh",
      background: "#f7f7f7",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "12px 0 18px 0",
      padding: "10px 18px",
      background: "rgba(92,22,22,0.08)",
      border: "1px solid rgba(92,22,22,0.2)",
      borderRadius: "12px",
      fontSize: "15px",
      fontWeight: "600",
      color: "rgb(92,22,22)",
    },
    cardRow: {
      display: "flex",
      gap: "15px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    card: {
      flex: 1,
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
      background: "white",
      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      minWidth: "200px",
    },
    tableCard: {
      background: "white",
      padding: "15px",
      borderRadius: "12px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "center",
    },
    thead: {
      background: "rgb(92,22,22)",
      color: "white",
    },
    tdAction: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
    },
    input: {
      width: "90px",
      padding: "5px",
      textAlign: "center",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    btn: {
      padding: "6px 10px",
      background: "rgb(92,22,22)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    reportBtn: {
      padding: "6px 10px",
      background: "rgb(92,22,22)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.sectionHeader}>
        💰 Fee Collection Dashboard
      </div>

      {/* CARDS */}
      <div style={styles.cardRow}>
        <div style={styles.card}>
          <h4>Total Students</h4>
          <h2>{totalStudents}</h2>
        </div>
        <div style={styles.card}>
          <h4>Total Fees</h4>
          <h2>₹ {totalFees}</h2>
        </div>
        <div style={styles.card}>
          <h4>Pending Fees</h4>
          <h2>₹ {pending}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
              <th>Board</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Action</th>
              <th>Report</th> 
            </tr>
          </thead>

          <tbody>
            {students.map((stu, index) => {
              const pending = stu.totalFees - (stu.paidFees || 0);

              return (
                <tr key={stu._id}>
                  <td>{index + 1}</td>
                  <td>{stu.name}</td>
                  <td>{stu.gender}</td>
                  <td>{stu.className}</td>
                  <td>{stu.board}</td>
                  <td>₹ {stu.totalFees}</td>
                  <td>₹ {stu.paidFees || 0}</td>

                  <td style={{ color: pending <= 0 ? "green" : "red" }}>
                    {pending <= 0 ? "Completed" : `₹ ${pending}`}
                  </td>

    

                  <td style={styles.tdAction}>
                    <input
                      style={styles.input}
                      type="number"
                      placeholder="Amount"
                      value={amounts[index] || ""}
                      onChange={(e) =>
                        handleChange(index, e.target.value)
                      }
                    />

                    <button
                      style={styles.btn}
                      onClick={() => payFees(index)}
                    >
                      Pay
                    </button>
                  </td>


               
                   {index === 0 && (
        <td
          rowSpan={students.length}
          style={{
            textAlign: "center",
            verticalAlign: "middle",
          }}
        >  <button
            onClick={downloadAllReports}
            style={{
              padding: "10px 16px",
              background: "rgb(92,22,22)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
             Download Report
          </button>
        </td>
      )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {popup && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <h3>Payment Successful </h3>
            <p>{popup.name}</p>
            <p>Paid ₹{popup.amount}</p>
            <p>Remaining ₹{popup.remaining}</p>

            <button onClick={() => setPopup(null)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesDashboard;