const express = require('express');
const mysql = require('mysql'); // Standard 'mysql' package
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const util = require("util");

const app = express();
const port = 3001; 

// --- Configuration ---
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Serve files from the 'uploads' directory
// app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL user
    password: 'Mysql-prakashs', // Your MySQL password
    database: 'ArivallavanBricks', // Your database name
});



db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Configure file storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure you have an 'uploads' directory in your server root
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Naming the file: timestamp-originalfilename
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// ----------------------------------------------------------------

// --- POST Route for Adding Worker ---
// This route expects a multipart form-data submission from your final React form.
app.post('/workers', upload.fields([
    { name: 'ProfileImg', maxCount: 1 },
    { name: 'EmpDoc', maxCount: 1 }
]), (req, res) => {
    
    // 1. Get Text Data from req.body
    const {
        EmpId, FirstName, LastName, Age, DOB, Gender, ContNum,
        EmergencyContNum, JoiningDate, EmpAddress
    } = req.body;

    // 2. Get File Paths from req.files
    // The path is where Multer saved the file on your server
    const profileImgPath = req.files.ProfileImg ? req.files.ProfileImg[0].path : null;
    const empDocPath = req.files.EmpDoc ? req.files.EmpDoc[0].path : null;

    // 3. Prepare SQL Query
    const sql = `
        INSERT INTO Workers 
        (EmpId, FirstName, LastName, Age, DOB, Gender, ContNum, EmergencyContNum, 
         JoiningDate, EmpAddress, ProfileImgPath, EmpDocPath) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        EmpId, FirstName, LastName, Age, DOB, Gender, ContNum, EmergencyContNum,
        JoiningDate, EmpAddress, profileImgPath, empDocPath
    ];

    // 4. Execute Query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Insertion Error:', err);
            // In case of an error, you might want to delete the uploaded files
            // (omitted for brevity)
            return res.status(500).json({ 
                error: 'Failed to add worker', 
                details: err.message 
            });
        }

        console.log('Worker inserted successfully with ID:', result.insertId);
        res.status(201).json({ 
            message: 'Worker added successfully!', 
            id: result.insertId 
        });
    });
});




// worker table view
// GET all workers
app.get("/workers", (req, res) => {
  const sql = `
    SELECT id, EmpId, FirstName, LastName, Age, DOB, Gender, ContNum, EmergencyContNum, JoiningDate, EmpAddress, ProfileImgPath, EmpDocPath
    FROM Workers
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


// get particular wrk data
// GET /workers/:empId
app.get("/workers/:empId", (req, res) => {
  const empId = req.params.empId;
  const sql = "SELECT * FROM Workers WHERE EmpId = ?";
  db.query(sql, [empId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.json(results[0]);
  });
});

// get particular EmpDocPath
app.get("/workerreportfiles/:empId", (req, res) => {
  const empId = req.params.empId;
  const sql = "SELECT EmpDocPath FROM Workers WHERE EmpId = ?";
  db.query(sql, [empId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "No document found" });
    res.json(results[0]);
  });
});



// get worker data
// Get all workers
app.get("/workers", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Workers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// Convert db.query to return a promise
const query = util.promisify(db.query).bind(db);

// app.post("/worker-attendance", async (req, res) => {
//   try {
//     const { attendanceData } = req.body;

//     if (!Array.isArray(attendanceData) || attendanceData.length === 0) {
//       return res.status(400).json({ message: "No attendance data provided" });
//     }

//     const duplicateWorkers = [];
//     const markedWorkers = [];

//     for (const record of attendanceData) {
//       const { EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status } = record;

//       const existing = await query(
//         "SELECT * FROM WorkerAttendance WHERE EmpId = ? AND DATE(AttendanceDate) = ?",
//         [EmpId, AttendanceDate]
//       );

//       if (existing.length === 0) {
//         await query(
//           "INSERT INTO WorkerAttendance (EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status) VALUES (?, ?, ?, ?, ?, ?)",
//           [EmpId, WorkerName, Shift, AttendanceDate, Remarks || "", Status || "Present"]
//         );
//         markedWorkers.push(WorkerName);
//       } else {
//         duplicateWorkers.push(WorkerName);
//       }
//     }

//     res.json({
//       message: "Attendance processed",
//       markedWorkers,
//       duplicateWorkers,
//     });
//   } catch (err) {
//     console.error("Error saving attendance:", err);
//     res.status(500).json({ message: "Error saving attendance" });
//   }
// });


// POST attendance
// app.post("/worker-attendance", (req, res) => {
//   const { attendanceData } = req.body;

//   const formattedData = attendanceData.map((item) => {
//     const [day, month, year] = item.AttendanceDate.split("-");

//     // Store in MySQL DATE format (yyyy-mm-dd)
//     const mysqlDate = `${year}-${month}-${day}`;

//     return [
//       item.EmpId,
//       item.WorkerName,
//       item.Shift,
//       mysqlDate,
//       item.Remarks,
//       item.Status,
//     ];
//   });

//   const sql =
//     "INSERT INTO WorkerAttendance (EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status) VALUES ?";

//   db.query(sql, [formattedData], (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       return res.status(500).send("Error saving attendance");
//     }
//     res.send("Attendance saved successfully");
//   });
// });


app.post("/worker-attendance", async (req, res) => {
  try {
    const { attendanceData } = req.body;
    const markedWorkers = [];
    const duplicateWorkers = [];

    for (const item of attendanceData) {
      const [day, month, year] = item.AttendanceDate.split("-");
      const mysqlDate = `${year}-${month}-${day}`; // YYYY-MM-DD

      // Check if attendance already exists
      const existing = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM WorkerAttendance WHERE EmpId = ? AND AttendanceDate = ?",
          [item.EmpId, mysqlDate],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });

      if (existing.length === 0) {
        // Insert new attendance
        await new Promise((resolve, reject) => {
          db.query(
            "INSERT INTO WorkerAttendance (EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status) VALUES (?, ?, ?, ?, ?, ?)",
            [
              item.EmpId,
              item.WorkerName,
              item.Shift || "",
              mysqlDate,
              item.Remarks || "",
              item.Status || "",
            ],
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });

        markedWorkers.push(item.WorkerName);
      } else {
        duplicateWorkers.push(item.WorkerName);
      }
    }

    res.json({
      message: "Attendance processed",
      markedWorkers,
      duplicateWorkers,
    });
  } catch (err) {
    console.error("Error saving attendance:", err);
    res.status(500).json({ message: "Error saving attendance" });
  }
});


// GET attendance
app.get("/worker-attendance", (req, res) => {
  const sql = "SELECT * FROM WorkerAttendance ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).send("Error fetching attendance");
    }

    // Convert to dd-mm-yyyy for frontend display
    const formattedResults = results.map((row) => {
      const date = new Date(row.AttendanceDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return {
        ...row,
        displayDate: `${day}-${month}-${year}`, // For showing in table
      };
    });

    res.json(formattedResults);
  });
});




// ✅ GET — Fetch all attendance records (with filters)
app.get("/workerAttendance", (req, res) => {
  const { EmpId, WorkerName, AttendanceDate, Status } = req.query;
  let sql = "SELECT * FROM WorkerAttendance WHERE 1=1";
  const params = [];

  if (EmpId) {
    sql += " AND EmpId LIKE ?";
    params.push(`%${EmpId}%`);
  }

  if (WorkerName) {
    sql += " AND WorkerName LIKE ?";
    params.push(`%${WorkerName}%`);
  }

  if (AttendanceDate) {
    sql += " AND AttendanceDate = ?";
    params.push(AttendanceDate);
  }

  if (Status && Status !== "ShowAll") {
    sql += " AND Status = ?";
    params.push(Status);
  }

  sql += " ORDER BY id DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching attendance:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});


// ✅ POST — Add new attendance record
// app.post("/workerAttendance", (req, res) => {
//   const { EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status } = req.body;

//   if (!EmpId || !WorkerName || !AttendanceDate) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const sql = `
//     INSERT INTO WorkerAttendance (EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;
//   const values = [EmpId, WorkerName, Shift, AttendanceDate, Remarks, Status];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("❌ Error inserting attendance:", err);
//       res.status(500).json({ error: "Insert failed" });
//     } else {
//       res.json({ message: "✅ Attendance added successfully", id: result.insertId });
//     }
//   });
// });


// ✅ PUT — Update attendance record
app.put("/workerAttendance/:id", (req, res) => {
  const { id } = req.params;
  const { Shift, Remarks, Status } = req.body;

  const sql = `
    UPDATE WorkerAttendance
    SET Shift = ?, Remarks = ?, Status = ?
    WHERE id = ?
  `;
  db.query(sql, [Shift, Remarks, Status, id], (err, result) => {
    if (err) {
      console.error("❌ Error updating record:", err);
      res.status(500).json({ error: "Update failed" });
    } else {
      res.json({ message: "✅ Attendance updated successfully" });
    }
  });
});


// ✅ DELETE — Remove attendance record
app.delete("/workerAttendance/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM WorkerAttendance WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting record:", err);
      res.status(500).json({ error: "Delete failed" });
    } else {
      res.json({ message: "🗑️ Record deleted successfully" });
    }
  });
});


// ✅ GET — Today's attendance only
app.get("/workerAttendance/today", (req, res) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB").split("/").join("-"); // e.g., 26-10-2025

  const sql = "SELECT * FROM WorkerAttendance WHERE AttendanceDate = ?";
  db.query(sql, [formattedDate], (err, results) => {
    if (err) {
      console.error("❌ Error fetching today’s attendance:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});














// making product 

// POST API — Insert Product
app.post("/makingproduct", (req, res) => {
  const {
    ProductId, // 👈 now coming from frontend
    ProductDate,
    ProductType,
    Quantity,
    QuantityType,
    CementType,
    SessionType,
  } = req.body;

  if (
    !ProductId ||
    !ProductDate ||
    !ProductType ||
    !Quantity ||
    !QuantityType ||
    !CementType ||
    !SessionType
  ) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const sql = `
    INSERT INTO MakingProduct 
      (ProductId, ProductDate, ProductType, Quantity, QuantityType, CementType, SessionType)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    ProductId,
    ProductDate,
    ProductType,
    Quantity,
    QuantityType,
    CementType,
    SessionType,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting product:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.status(200).json({ message: "Product added successfully", ProductId });
  });
});





/* ================= GET MAKING PRODUCT ================= */
app.get("/making-products", (req, res) => {
  const { ProductType, ProductDate, SessionType } = req.query;

  let sql = "SELECT * FROM MakingProduct WHERE 1=1";
  let params = [];

  if (ProductType) {
    sql += " AND ProductType = ?";
    params.push(ProductType);
  }

  if (ProductDate) {
    sql += " AND ProductDate = ?";
    params.push(ProductDate);
  }

  if (SessionType) {
    sql += " AND SessionType = ?";
    params.push(SessionType);
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});





// GET API — Fetch all Products
app.get("/makingproduct", (req, res) => {
  const sql = "SELECT * FROM MakingProduct ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Fetch error:", err);
      return res.status(500).json({ error: "Database fetch failed" });
    }
    res.status(200).json(results);
  });
});





app.put("/making-products/:id", (req, res) => {
  const { id } = req.params;
  const {
    ProductDate,
    ProductType,
    SessionType,
    Quantity,
    QuantityType,
    CementType
  } = req.body;

  const sql = `
    UPDATE MakingProduct 
    SET 
      ProductDate = ?,
      ProductType = ?,
      SessionType = ?,
      Quantity = ?,
      QuantityType = ?,
      CementType = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      ProductDate,
      ProductType,
      SessionType,
      Quantity,
      QuantityType,
      CementType,
      id
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated successfully" });
    }
  );
});





// POST: Add Export Product
// ✅ POST API to insert export products

// app.post("/exportproduct", (req, res) => {
//   const { products } = req.body;

//   if (!Array.isArray(products) || products.length === 0) {
//     return res.status(400).json({ message: "No products received" });
//   }

//   // ✅ Calculate Final Total Amount (sum of all TotalAmount)
//   const finalTotalAmount = products.reduce(
//     (sum, item) => sum + (parseFloat(item.TotalAmount) || 0),
//     0
//   );

//   const query = `
//     INSERT INTO exportproduct
//     (
//       ProductId, CusName, CusAddress, CusNumber, ProductType,
//       ProductCount, SinglePiecePrice, UnitCount, SingleUnitPrice,
//       TotalAmount, FinalTotalAmount, PaidAmount, BalanceAmount,
//       TransportMode, DriverName, VehicleNumber, EmpCount,
//       TripStartingKM, TripEndKM, TotalKM, TotalTripTime,
//       VechOutTime, VechInTime
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const promises = products.map((prod) => {
//     // ✅ Auto calculate total KM
//     const startKM = parseFloat(prod.TripStartingKM) || 0;
//     const endKM = parseFloat(prod.TripEndKM) || 0;
//     const totalKM = endKM - startKM;

//     // ✅ Auto calculate total trip time (hours + minutes)
//     let totalTripTime = null;
//     if (prod.VechOutTime && prod.VechInTime) {
//       const start = new Date(prod.VechOutTime);
//       const end = new Date(prod.VechInTime);
//       const diffMs = Math.abs(end - start);
//       const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//       const diffMin = Math.floor((diffMs / (1000 * 60)) % 60);
//       totalTripTime = `${diffHrs} hrs ${diffMin} mins`;
//     }

//     return new Promise((resolve, reject) => {
//       db.query(
//         query,
//         [
//           prod.ProductId,
//           prod.CusName,
//           prod.CusAddress,
//           prod.CusNumber,
//           prod.ProductType,
//           prod.ProductCount || 0,
//           prod.SinglePiecePrice || 0,
//           prod.UnitCount || 0,
//           prod.SingleUnitPrice || 0,
//           prod.TotalAmount || 0,
//           finalTotalAmount || 0, // ✅ same value for all products in this batch
//           prod.PaidAmount || 0,
//           prod.BalanceAmount || 0,
//           prod.TransportMode,
//           prod.DriverName,
//           prod.VehicleNumber,
//           prod.EmpCount || 0,
//           startKM,
//           endKM,
//           totalKM,
//           totalTripTime,
//           prod.VechOutTime || null,
//           prod.VechInTime || null,
//         ],
//         (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         }
//       );
//     });
//   });

//   Promise.all(promises)
//     .then(() =>
//       res.status(200).json({
//         message: "✅ Export products inserted successfully",
//         FinalTotalAmount: finalTotalAmount,
//       })
//     )
//     .catch((err) => {
//       console.error("❌ Insert Error:", err);
//       res.status(500).json({ message: "Error inserting products", error: err });
//     });
// });

// // ✅ GET API to fetch all export products
// app.get("/exportproduct", (req, res) => {
//   db.query("SELECT * FROM exportproduct ORDER BY id DESC", (err, results) => {
//     if (err) {
//       console.error("❌ Fetch Error:", err);
//       return res.status(500).json({ message: "Database fetch error" });
//     }
//     res.json(results);
//   });
// });




// POST: Add export products
// app.post("/exportproduct", (req, res) => {
//   const { products, PaidAmount, BalanceAmount } = req.body;

//   if (!Array.isArray(products) || products.length === 0) {
//     return res.status(400).json({ message: "No products received" });
//   }

//   // ✅ Calculate Final Total Amount (sum of all TotalAmount)
//   const finalTotalAmount = products.reduce(
//     (sum, item) => sum + (parseFloat(item.TotalAmount) || 0),
//     0
//   );

//   const query = `
//     INSERT INTO exportproduct
//     (
//       ProductId, CusName, CusAddress, CusNumber, ProductType,
//       ProductCount, SinglePiecePrice, UnitCount, SingleUnitPrice,
//       TotalAmount, FinalTotalAmount, PaidAmount, BalanceAmount,
//       TransportMode, DriverName, VehicleNumber, EmpCount,
//       TripStartingKM, TripEndKM, TotalKM, TotalTripTime,
//       VechOutTime, VechInTime
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const promises = products.map((prod) => {
//     const startKM = parseFloat(prod.TripStartingKM) || 0;
//     const endKM = parseFloat(prod.TripEndKM) || 0;
//     const totalKM = endKM - startKM;

//     // Calculate total trip time in hours + minutes
//     let totalTripTime = null;
//     if (prod.VechOutTime && prod.VechInTime) {
//       const start = new Date(`1970-01-01T${prod.VechOutTime}`);
//       const end = new Date(`1970-01-01T${prod.VechInTime}`);
//       let diffMs = end - start;
//       if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000; // handle overnight trips
//       const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//       const diffMin = Math.floor((diffMs / (1000 * 60)) % 60);
//       totalTripTime = `${diffHrs} hrs ${diffMin} mins`;
//     }

//     return new Promise((resolve, reject) => {
//       db.query(
//         query,
//         [
//           prod.ProductId,
//           prod.CusName,
//           prod.CusAddress,
//           prod.CusNumber,
//           prod.ProductType,
//           prod.ProductCount || 0,
//           prod.SinglePiecePrice || 0,
//           prod.UnitCount || 0,
//           prod.SingleUnitPrice || 0,
//           prod.TotalAmount || 0,
//           finalTotalAmount || 0,  // same for all products
//           parseFloat(PaidAmount) || 0,
//           parseFloat(BalanceAmount) || 0,
//           prod.TransportMode || null,
//           prod.DriverName || null,
//           prod.VehicleNumber || null,
//           prod.EmpCount || 0,
//           startKM,
//           endKM,
//           totalKM,
//           totalTripTime,
//           prod.VechOutTime || null,
//           prod.VechInTime || null,
//         ],
//         (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         }
//       );
//     });
//   });

//   Promise.all(promises)
//     .then(() =>
//       res.status(200).json({
//         message: "✅ Export products inserted successfully",
//         FinalTotalAmount: finalTotalAmount,
//       })
//     )
//     .catch((err) => {
//       console.error("❌ Insert Error:", err);
//       res.status(500).json({ message: "Error inserting products", error: err });
//     });
// });




app.post("/exportproduct", (req, res) => {
  const { ExportId, products, PaidAmount = 0 } = req.body;

  if (!ExportId) {
    return res.status(400).json({ message: "ExportId missing" });
  }

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products received" });
  }

  /* =========================
     1️⃣ CALCULATE TOTAL
  ========================== */
  const finalTotalAmount = products.reduce(
    (sum, item) => sum + (Number(item.TotalAmount) || 0),
    0
  );

  const paid = Number(PaidAmount) || 0;
  let balance = finalTotalAmount - paid;
  if (balance < 0) balance = 0;

  /* =========================
     2️⃣ PAYMENT STATUS
  ========================== */
  let paymentStatus = "Pending";
  if (paid === 0) paymentStatus = "UnPaid";
  else if (paid >= finalTotalAmount) paymentStatus = "Paid";

  /* =========================
     3️⃣ INSERT QUERY (FIXED ✅)
  ========================== */
  const exportQuery = `
    INSERT INTO exportproduct (
      ExportId, ProductId, CusName, CusAddress, CusNumber, ProductType,
      ProductCount, SinglePiecePrice, UnitCount, SingleUnitPrice,
      TotalAmount, FinalTotalAmount, PaymentStatus, PaidAmount, BalanceAmount,
      TransportMode, TripStartingKM, TripEndKM, TotalKM, TotalTripTime,
      DriverName, VehicleNumber, EmpCount, VechOutTime, VechInTime,
      CurrentDate, CurrentTime
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
      CURDATE(), CURTIME()
    )
  `;

  db.beginTransaction((txErr) => {
    if (txErr) return res.status(500).json(txErr);

    const promises = products.map((prod) => {
      const startKM = Number(prod.TripStartingKM) || 0;
      const endKM = Number(prod.TripEndKM) || 0;
      const totalKM = endKM - startKM;

      /* Trip Time */
      let totalTripTime = null;
      if (prod.VechOutTime && prod.VechInTime) {
        const start = new Date(`1970-01-01T${prod.VechOutTime}`);
        const end = new Date(`1970-01-01T${prod.VechInTime}`);
        let diff = end - start;
        if (diff < 0) diff += 24 * 60 * 60 * 1000;

        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        totalTripTime = `${hrs} hrs ${mins} mins`;
      }

      return new Promise((resolve, reject) => {
        db.query(
          exportQuery,
          [
            ExportId,
            prod.ProductId,
            prod.CusName,
            prod.CusAddress,
            prod.CusNumber,
            prod.ProductType,
            prod.ProductCount || 0,
            prod.SinglePiecePrice || 0,
            prod.UnitCount || 0,
            prod.SingleUnitPrice || 0,
            prod.TotalAmount || 0,
            finalTotalAmount,
            paymentStatus,
            paid,
            balance,
            prod.TransportMode || null,
            startKM,
            endKM,
            totalKM,
            totalTripTime,
            prod.DriverName || null,
            prod.VehicleNumber || null,
            prod.EmpCount || 0,
            prod.VechOutTime || null,
            prod.VechInTime || null,
          ],
          (err) => (err ? reject(err) : resolve())
        );
      });
    });

    /* =========================
       4️⃣ EXECUTE ALL
    ========================== */
    Promise.all(promises)
      .then(() => {
        /* 🔥 AUTO INSERT FIRST PAYMENT */
        if (paid > 0) {
          db.query(
            `INSERT INTO payment_history
             (ExportId, PaidAmount, PaymentDate, PaymentTime)
             VALUES (?, ?, CURDATE(), CURTIME())`,
            [ExportId, paid],
            (err) => {
              if (err) {
                return db.rollback(() =>
                  res.status(500).json({ message: "Payment insert failed", err })
                );
              }
              db.commit(() =>
                res.json({
                  message: "✅ Export + initial payment saved",
                  FinalTotalAmount: finalTotalAmount,
                  PaidAmount: paid,
                  BalanceAmount: balance,
                  PaymentStatus: paymentStatus,
                })
              );
            }
          );
        } else {
          db.commit(() =>
            res.json({
              message: "✅ Export saved",
              FinalTotalAmount: finalTotalAmount,
              PaidAmount: paid,
              BalanceAmount: balance,
              PaymentStatus: paymentStatus,
            })
          );
        }
      })
      .catch((err) => {
        db.rollback(() => {
          console.error(err);
          res.status(500).json({ message: "Insert failed", err });
        });
      });
  });
});





app.get("/exportproduct", (req, res) => {
  const query = `
    SELECT 
      ExportId,
      MIN(CusName) AS CusName,
      MIN(CusNumber) AS CusNumber,
      MIN(CusAddress) AS CusAddress,
      MAX(FinalTotalAmount) AS FinalTotalAmount,
      MAX(PaidAmount) AS PaidAmount,
      MAX(BalanceAmount) AS BalanceAmount,
      MAX(PaymentStatus) AS PaymentStatus,
      MIN(TransportMode) AS TransportMode,
      DATE(MAX(CurrentDate)) AS CurrentDate
    FROM exportproduct
    GROUP BY ExportId
    ORDER BY ExportId DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.get("/exportproduct/:exportId/header", (req, res) => {
  const { exportId } = req.params;

  const query = `
    SELECT 
      ExportId,
      CusName,
      CusNumber,
      CusAddress,
      FinalTotalAmount,
      PaidAmount,
      BalanceAmount,
      PaymentStatus,
      TransportMode,
      DATE(CurrentDate) AS CurrentDate
    FROM exportproduct
    WHERE ExportId = ?
    LIMIT 1
  `;

  db.query(query, [exportId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});


app.get("/exportproduct/:exportId/products", (req, res) => {
  const { exportId } = req.params;

  db.query(
    `SELECT 
      ProductId,
      ProductType,
      ProductCount,
      SinglePiecePrice,
      UnitCount,
      SingleUnitPrice,
      TotalAmount
     FROM exportproduct
     WHERE ExportId = ?`,
    [exportId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});






app.get("/exportproduct/:exportId", (req, res) => {
  const { exportId } = req.params;

  db.query(
    "SELECT * FROM exportproduct WHERE ExportId = ?",
    [exportId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});



// GET: Fetch all export products
app.get("/exportproduct", (req, res) => {
  db.query("SELECT * FROM exportproduct ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("❌ Fetch Error:", err);
      return res.status(500).json({ message: "Database fetch error" });
    }
    res.json(results);
  });
});





// app.put("/exportproduct/:exportId", (req, res) => {
//   const { exportId } = req.params;
//   const data = req.body;

//   const query = `
//     UPDATE exportproduct SET
//       CusName = ?,
//       CusNumber = ?,
//       CusAddress = ?,
//       PaymentStatus = ?,
//       TransportMode = ?
//     WHERE ExportId = ?
//   `;

//   db.query(
//     query,
//     [
//       data.CusName,
//       data.CusNumber,
//       data.CusAddress,
//       data.PaymentStatus,
//       data.TransportMode,
//       exportId
//     ],
//     (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Export updated successfully" });
//     }
//   );
// });


app.put("/exportproduct/:exportId", (req, res) => {
  const { exportId } = req.params;

  const {
    CusName,
    CusNumber,
    CusAddress,
    PaymentStatus,
    BalanceAmount,
    TransportMode
  } = req.body;

  const sql = `
    UPDATE exportproduct 
    SET 
      CusName = ?,
      CusNumber = ?,
      CusAddress = ?,
      BalanceAmount = ?,
      PaymentStatus = ?,
      TransportMode = ?
    WHERE ExportId = ?
  `;

  db.query(
    sql,
    [
      CusName,
      CusNumber,
      CusAddress,
      BalanceAmount,
      PaymentStatus,
      TransportMode,
      exportId
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
      }
      res.json({ message: "Updated successfully" });
    }
  );
});




app.delete("/exportproduct/:exportId", (req, res) => {
  const { exportId } = req.params;

  const query = "DELETE FROM exportproduct WHERE ExportId = ?";

  db.query(query, [exportId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({
      message: "Export deleted successfully",
      affectedRows: result.affectedRows
    });
  });
});




app.post("/exportproduct/add-payment", (req, res) => {
  const { ExportId, amount } = req.body;

  if (!ExportId || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid payment data" });
  }

  const paidAmount = Number(amount);

  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    /* 1️⃣ Get current totals */
    db.query(
      `SELECT FinalTotalAmount, PaidAmount
       FROM exportproduct
       WHERE ExportId = ?
       LIMIT 1`,
      [ExportId],
      (err, rows) => {
        if (err || rows.length === 0) {
          return db.rollback(() =>
            res.status(404).json({ message: "Export not found" })
          );
        }

        const finalTotal = Number(rows[0].FinalTotalAmount);
        const oldPaid = Number(rows[0].PaidAmount);

        const newPaid = oldPaid + paidAmount;
        let balance = finalTotal - newPaid;
        if (balance < 0) balance = 0;

        let status = "Pending";
        if (newPaid === 0) status = "UnPaid";
        else if (newPaid >= finalTotal) status = "Paid";

        /* 2️⃣ Insert payment history WITH date & time ✅ */
        db.query(
          `INSERT INTO payment_history
           (ExportId, PaidAmount, PaymentDate, PaymentTime)
           VALUES (?, ?, CURDATE(), CURTIME())`,
          [ExportId, paidAmount],
          (err) => {
            if (err) {
              return db.rollback(() =>
                res.status(500).json({ message: "Payment history insert failed", err })
              );
            }

            /* 3️⃣ Update exportproduct totals */
            db.query(
              `UPDATE exportproduct
               SET PaidAmount = ?, BalanceAmount = ?, PaymentStatus = ?
               WHERE ExportId = ?`,
              [newPaid, balance, status, ExportId],
              (err) => {
                if (err) {
                  return db.rollback(() =>
                    res.status(500).json({ message: "Export update failed", err })
                  );
                }

                db.commit(() =>
                  res.json({
                    message: "✅ Payment added successfully",
                    PaidAmount: newPaid,
                    BalanceAmount: balance,
                    PaymentStatus: status,
                  })
                );
              }
            );
          }
        );
      }
    );
  });
});




app.get("/exportproduct/payment-history/:exportId", (req, res) => {
  const { exportId } = req.params;

  db.query(
    "SELECT * FROM payment_history WHERE ExportId = ? ORDER BY CreatedAt DESC",
    [exportId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Error" });
      res.json(rows);
    }
  );
});





app.post("/api/import/add", (req, res) => {

  const data = req.body;

  const allowedStatus = ["Paid", "Unpaid", "Pending"];
  const paymentStatus = allowedStatus.includes(data.PaymentStatus)
    ? data.PaymentStatus
    : "Unpaid";

  const insertQuery = `
    INSERT INTO ImportProducts (
      ImportId, ImportDate, ImportAddress, VehicleNumber,
      MaterialType, MaterialSize, SizeType, MaterialPrice,
      MaterialTotalPrice, WagesAmount, MiscellaneousAmount,
      GSTAmount, FinalTotalAmount, PaidAmount,
      BalanceAmount, PaymentStatus, Notequery
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.ImportId,
    data.ImportDate,
    data.ImportAddress,
    data.VehicleNumber,
    data.MaterialType,
    parseFloat(data.MaterialSize) || 0,  // ✅ numeric only
    data.SizeType || "",                 // ✅ NEW COLUMN
    parseFloat(data.MaterialPrice) || 0,
    parseFloat(data.MaterialTotalPrice) || 0,
    parseFloat(data.WagesAmount) || 0,
    parseFloat(data.MiscellaneousAmount) || 0,
    parseFloat(data.GSTAmount) || 0,
    parseFloat(data.FinalTotalAmount) || 0,
    parseFloat(data.PaidAmount) || 0,
    parseFloat(data.BalanceAmount) || 0,
    paymentStatus,
    data.Notequery
  ];

  db.query(insertQuery, values, (err) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json({
      message: "Import Product Added Successfully"
    });

  });

});



app.get("/api/import/last-id", (req, res) => {

  const query = `
    SELECT ImportId FROM ImportProducts
    ORDER BY id DESC LIMIT 1
  `;

  db.query(query, (err, result) => {

    if (err) return res.status(500).json({ error: err });

    if (result.length === 0) {
      return res.json({ lastId: null });
    }

    res.json({ lastId: result[0].ImportId });

  });

});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});