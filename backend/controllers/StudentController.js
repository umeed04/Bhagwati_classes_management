const Student = require("../Model/Student");

// ADD
exports.addStudent = async (req, res) => {
  try {
    const totalFees = Number(req.body.totalFees);
    const plan = Number(req.body.installmentPlan);

    let installments = [];

    if (totalFees && plan) {
      const installmentAmount = totalFees / plan;

      for (let i = 1; i <= plan; i++) {
        installments.push({
          installmentNo: i,
          amount: installmentAmount,
          status: "Pending"
        });
      }
    }

    const student = new Student({
      name: req.body.name,
      className: req.body.className,
      board: req.body.board,
      gender: req.body.gender,
      contact: req.body.contact,
      address: req.body.address,
      image: req.file ? req.file.filename : "",

      fees: {
        totalFees,
        installmentPlan: plan,
        installments,
        paidAmount: 0,
        remainingAmount: totalFees
      }
    });

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 📥 GET ALL
exports.getStudents = async (req, res) => {
  const data = await Student.find();
  res.json(data);
};

// GET ONE
exports.getStudent = async (req, res) => {
  const data = await Student.findById(req.params.id);
  res.json(data);
};

//  UPDATE
exports.updateStudent = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      className: req.body.className,
      board: req.body.board,
      gender: req.body.gender,
      contact: req.body.contact,
      address: req.body.address,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

//  PAY INSTALLMENT (NEW)
exports.payInstallment = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    const inst = student.fees.installments.find(
      i => i.installmentNo == req.params.instNo
    );

    if (!inst) {
      return res.json({ message: "Installment not found" });
    }

    if (inst.status === "Paid") {
      return res.json({ message: "Already Paid" });
    }

    inst.status = "Paid";
    inst.paidDate = new Date();

    student.fees.paidAmount += inst.amount;
    student.fees.remainingAmount =
      student.fees.totalFees - student.fees.paidAmount;

    await student.save();

    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};