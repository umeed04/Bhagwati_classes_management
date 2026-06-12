const express = require("express");

const router = express.Router();

const Student = require("../Model/Student");

const authMiddleware = require("../middleware/authMiddleware");


// ADD STUDENT
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        name,
        className,
        board,
        gender,
        contact,
        address,
        image,
        totalFees,
        installmentPlan
      } = req.body || {};

      const feesValue = Number(totalFees) || 0;
      const plan = Number(installmentPlan) || 2;

      let installments = [];

      if (feesValue > 0) {

        const amount = feesValue / plan;

        for (let i = 1; i <= plan; i++) {

          installments.push({
            installmentNo: i,
            amount,
            status: "Pending"
          });

        }

      }

      const student = new Student({
        name,
        className,
        board,
        gender,
        contact,
        address,
        image,
        totalFees: feesValue,
        paidFees: 0,
        remainingFees: feesValue,
        installments
      });

      await student.save();

      res.status(201).json({
        message: "Student added successfully",
        data: student
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: err.message
      });

    }

  }
);


//  GET ALL STUDENTS
router.get(
  "/all",
  authMiddleware,
  async (req, res) => {

    try {

      const students = await Student.find();

      res.status(200).json(students);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


//  GET SINGLE STUDENT
router.get(
  "/single/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const student = await Student.findById(req.params.id);

      if (!student) {

        return res.status(404).json({
          message: "Student not found"
        });

      }

      res.status(200).json(student);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


// UPDATE STUDENT
router.put(
  "/update/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updated = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        success: true,
        message: "Updated successfully",
        data: updated
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


// DELETE STUDENT
router.delete(
  "/delete/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await Student.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Deleted successfully"
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);


//  FEES PAYMENT
router.post(
  "/fees",
  authMiddleware,
  async (req, res) => {

    try {

      const { studentId, amount } = req.body;

      const student = await Student.findById(studentId);

      if (!student) {

        return res.json({
          success: false,
          message: "Student not found",
        });

      }

      if (!student.installments) {
        student.installments = [];
      }

      student.installments.push({
        amount: Number(amount),
        status: "Paid",
        date: new Date(),
      });

      student.paidFees =
        (student.paidFees || 0) + Number(amount);

      student.remainingFees = Math.max(
        0,
        (student.totalFees || 0) - student.paidFees
      );

      await student.save();

      res.json({
        success: true,
        message: "Payment successful",
      });

    } catch (err) {

      res.json({
        success: false,
        message: err.message,
      });

    }

  }
);

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const Student = require("../Model/Student");


// // ➜ ADD STUDENT
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       name,
//       className,
//       board,
//       gender,
//       contact,
//       address,
//       image,
//       totalFees,
//       installmentPlan
//     } = req.body || {};

//     const feesValue = Number(totalFees) || 0;
//     const plan = Number(installmentPlan) || 2;

//     let installments = [];

//     if (feesValue > 0) {
//       const amount = feesValue / plan;

//       for (let i = 1; i <= plan; i++) {
//         installments.push({
//           installmentNo: i,
//           amount,
//           status: "Pending"
//         });
//       }
//     }

//     const student = new Student({
//       name,
//       className,
//       board,
//       gender,
//       contact,
//       address,
//       image,
//       totalFees: feesValue,
//       paidFees: 0,
//       remainingFees: feesValue,
//       installments
//     });

//     await student.save();

//     res.status(201).json({
//       message: "Student added successfully",
//       data: student
//     });

//   } catch (err) {
//     console.log("ADD ERROR 👉", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ➜ GET ALL STUDENTS
// router.get("/all", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ➜ GET SINGLE STUDENT
// router.get("/single/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json(student);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ➜ UPDATE STUDENT
// router.put("/update/:id", async (req, res) => {
//   try {
//     const updated = await Student.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({
//       success: true,
//       message: "Updated successfully",
//       data: updated
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // ➜ DELETE STUDENT
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const deleted = await Student.findByIdAndDelete(req.params.id);

//     if (!deleted) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.json({
//       success: true,
//       message: "Deleted successfully"
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // 💰 ➜ FEES PAYMENT ROUTE (FIXED - MAIN ISSUE)
// router.post("/fees", async (req, res) => {
//   try {
//     const { studentId, amount } = req.body;

//     const student = await Student.findById(studentId);

//     if (!student) {
//       return res.json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     // safe init
//     if (!student.installments) {
//       student.installments = [];
//     }

//     student.installments.push({
//       amount: Number(amount),
//       status: "Paid",
//       date: new Date(),
//     });

//     student.paidFees = (student.paidFees || 0) + Number(amount);

//     student.remainingFees = Math.max(
//       0,
//       (student.totalFees || 0) - student.paidFees
//     );

//     await student.save();

//     res.json({
//       success: true,
//       message: "Payment successful",
//     });

//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// module.exports = router;