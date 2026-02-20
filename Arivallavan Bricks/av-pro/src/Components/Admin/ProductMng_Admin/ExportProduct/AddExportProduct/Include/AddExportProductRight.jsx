import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import "../../../../../../../public/assets/css/Admin/Admin.css";

function AddExportProductRight() {
  const generateProductId = () => {
    const datePart = moment().format("YYYYMMDD");
    const randomPart = Math.floor(100 + Math.random() * 900);
    return `PROD-${datePart}-${randomPart}`;
  };
  const [finalTotalAmount, setFinalTotalAmount] = useState(0);
const [isProductTableOpen, setIsProductTableOpen] = useState(false);


const [showSuccessModal, setShowSuccessModal] = useState(false);
const [alertModal, setAlertModal] = useState({ show: false, message: "" });
const [topAlert, setTopAlert] = useState({ show: false, message: "" });
const [submittedStatus, setSubmittedStatus] = useState("");

const [paidAmount, setPaidAmount] = useState(0);
const [balanceAmount, setBalanceAmount] = useState(finalTotalAmount);


const handleToggleProductTable = () => {
  setIsProductTableOpen(!isProductTableOpen);
};


const generateExportId = () => {
  return "EXP-" + Date.now(); // unique
};
const [exportId, setExportId] = useState(generateExportId());




React.useEffect(() => {
  const paid = parseFloat(paidAmount) || 0;
  const balance = parseFloat(finalTotalAmount) - paid;
  setBalanceAmount(balance >= 0 ? balance.toFixed(2) : 0);
}, [paidAmount, finalTotalAmount]);



const [formData, setFormData] = useState({
  ProductId: generateProductId(),
  CusName: "",
  CusAddress: "",
  CusNumber: "",
  ProductType: "",
  ProductCount: "",
  SinglePiecePrice: "",
  UnitCount: "",
  SingleUnitPrice: "",
  TotalAmount: "",
  PaymentStatus: "",
  PaidAmount: "",
  BalanceAmount: "",
  TransportMode: "",
  DriverName: "",
  VehicleNumber: "",
  EmpCount: "",
  TripStartingKM: "",
  TripEndKM: "",
  TotalKM: "",   // ✅ Add this new field
  VechOutTime: "",
  VechInTime: "",
  TotalTripTime: "",
});


  const [productList, setProductList] = useState([]);

  // handle input change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => {
    const updated = { ...prev, [name]: value };

    // 🔹 Calculate TotalKM (difference between start and end KM)
    if (name === "TripStartingKM" || name === "TripEndKM") {
      const start = parseFloat(updated.TripStartingKM);
      const end = parseFloat(updated.TripEndKM);
      if (!isNaN(start) && !isNaN(end)) {
        updated.TotalKM = end - start;
      } else {
        updated.TotalKM = "";
      }
    }

    // 🔹 Calculate TotalTripTime (duration between Out & In Time)
    if (updated.VechOutTime && updated.VechInTime) {
      const start = new Date(`1970-01-01T${updated.VechOutTime}:00`);
      const end = new Date(`1970-01-01T${updated.VechInTime}:00`);

      let diffMs = end - start;
      if (diffMs < 0) {
        // Handle overnight trips (e.g., 22:00 → 02:00)
        diffMs += 24 * 60 * 60 * 1000;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      updated.TotalTripTime = `${hours}h ${minutes}m`;
    } else {
      updated.TotalTripTime = "";
    }

    return updated;
  });
};



const handlePaidChange = (e) => {
  const paid = parseFloat(e.target.value) || 0;
  const total = parseFloat(finalTotalAmount) || 0;

  // ❌ Validation: paid > total
  if (paid > total) {
    alert("❌ Paid amount cannot be greater than Final Total Amount");
    return;
  }

  const balance = total - paid;

  // ✅ Update states
  setPaidAmount(paid);
  setBalanceAmount(balance.toFixed(2));

  // ✅ Update formData for submit
  setFormData((prev) => ({
    ...prev,
    PaidAmount: paid,
    BalanceAmount: balance.toFixed(2),
  }));
};



  // handle Add button
const handleAdd = () => {
  if (!formData.ProductType) {
    alert("Please select a product type before adding.");
    return;
  }

  // Include PaidAmount and BalanceAmount in each product
  const newProduct = {
    ...formData,
    PaidAmount: parseFloat(paidAmount) || 0,
    BalanceAmount: parseFloat(balanceAmount) || 0,
    TotalAmount: parseFloat(formData.TotalAmount) || 0,
  };

  setProductList((prev) => [...prev, newProduct]);

  // Reset form but keep global PaidAmount/BalanceAmount for next product
  setFormData({
    ...formData,
    ExportId: exportId,
    ProductId: generateProductId(),
    ProductType: "",
    ProductCount: "",
    SinglePiecePrice: "",
    UnitCount: "",
    SingleUnitPrice: "",
    TotalAmount: "",
  });
};




  // handle Submit button
const handleSubmit = async () => {
  if (productList.length === 0) {
    setAlertModal({
      show: true,
      message: "Please add at least one product before submitting.",
    });
    return;
  }
    if (paidAmount > finalTotalAmount) {
    alert("❌ Invalid payment amount");
    return;
  }

  // Convert to numbers safely
  const total = parseFloat(finalTotalAmount) || 0;
  const paid = parseFloat(paidAmount) || 0;
  const balance = parseFloat(balanceAmount) || 0;

  // Determine PaymentStatus
  let paymentStatus = "";
  if (total === balance) {
    paymentStatus = "UnPaid";
  } else if (total === paid) {
    paymentStatus = "Paid";
  } else if (paid < total) {
    paymentStatus = "Pending";
  }

  try {
    await axios.post("http://localhost:3001/exportproduct", {
      ExportId: exportId,
      products: productList,
      FinalTotalAmount: total,
      PaidAmount: paid,
      BalanceAmount: balance,
      PaymentStatus: paymentStatus, // ✅ auto-set status
    });

 // ✅ Replace alert() with your Success Modal
 setSubmittedStatus(paymentStatus);
    setShowSuccessModal(true);

    // Optional: set a message in top alert if you want a toast-style message
    setTopAlert({
      show: true,
      message: `Export product submitted successfully! Status: ${paymentStatus}`,
    });

    // Hide top alert automatically after a few seconds
    setTimeout(() => {
      setTopAlert({ show: false, message: "" });
    }, 4000);


    // Reset after submit
    setProductList([]);
    setExportId(generateExportId()); // ✅ NEW ExportId for next entry
    setFormData({
      ProductId: generateProductId(),
      CusName: "",
      CusAddress: "",
      CusNumber: "",
      ProductType: "",
      ProductCount: "",
      SinglePiecePrice: "",
      UnitCount: "",
      SingleUnitPrice: "",
      TotalAmount: "",
      PaymentStatus: "",
      PaidAmount: "",
      BalanceAmount: "",
      TransportMode: "",
      DriverName: "",
      VehicleNumber: "",
      EmpCount: "",
      VechOutTime: "",
      VechInTime: "",
    });
    setPaidAmount(0);
    setBalanceAmount(0);
    setFinalTotalAmount(0);
  } catch (err) {
    console.error(err);
     setAlertModal({
      show: true,
      message: "Error submitting data! Please try again.",
    });
  }
};


  // Auto calculate total and balance
React.useEffect(() => {
  let total = 0;

  // 🔹 For FlyAsh, Halo Block, Cement
  if (
    formData.ProductType === "FlyAsh Bricks" ||
    formData.ProductType === "Halo Block" ||
    formData.ProductType === "Cement"
  ) {
    const count = parseFloat(formData.ProductCount) || 0;
    const price = parseFloat(formData.SinglePiecePrice) || 0;
    total = count * price;
  }

  // 🔹 For M-Sand
  if (formData.ProductType === "M-Sand") {
    const unit = parseFloat(formData.UnitCount) || 0;
    const unitPrice = parseFloat(formData.SingleUnitPrice) || 0;
    total = unit * unitPrice;
  }

  // Update TotalAmount automatically
  setFormData((prev) => ({
    ...prev,
    TotalAmount: total.toFixed(2),
  }));
}, [
  formData.ProductCount,
  formData.SinglePiecePrice,
  formData.UnitCount,
  formData.SingleUnitPrice,
  formData.ProductType,
]);

React.useEffect(() => {
  const total = productList.reduce(
    (sum, prod) => sum + parseFloat(prod.TotalAmount || 0),
    0
  );
  setFinalTotalAmount(total);
}, [productList]);


React.useEffect(() => {
  const total = parseFloat(finalTotalAmount) || 0;
  const paid = parseFloat(paidAmount) || 0;
  const balance = parseFloat(balanceAmount) || 0;

  let status = "";
  if (total === balance) {
    status = "UnPaid";
  } else if (total === paid) {
    status = "Paid";
  } else if (paid < total) {
    status = "Pending";
  }

  setFormData((prev) => ({
    ...prev,
    PaymentStatus: status,
  }));
}, [finalTotalAmount, paidAmount, balanceAmount]);

// Dynamic color style
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-warning"; // Bootstrap yellow
      case "Paid":
        return "text-success"; // Bootstrap green
      case "UnPaid":
        return "text-danger"; // Bootstrap red
      default:
        return "";
    }
  };

  return (
    <div className="main-content">
      <div className="page-content pb-2">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Export Product Entry</h4>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                {/* Product ID */}
                <div className="col-md-4">
                  <label className="form-label">Product ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ProductId"
                    value={formData.ProductId}
                    readOnly
                    style={{ backgroundColor: "#f1f3f4" }}
                  />
                </div>

                {/* Customer Info */}
                <div className="col-md-4">
                  <label className="form-label">Customer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="CusName"
                    value={formData.CusName}
                    onChange={handleChange}
                    placeholder="Enter Customer Name"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Customer Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="CusAddress"
                    value={formData.CusAddress}
                    onChange={handleChange}
                    placeholder="Enter Address"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Customer Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="CusNumber"
                    value={formData.CusNumber}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                  />
                </div>

                {/* Product Type Dropdown */}
                <div className="col-md-4">
                  <label className="form-label">Product Type</label>
                  <select
                    className="form-select"
                    name="ProductType"
                    value={formData.ProductType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="FlyAsh Bricks">FlyAsh Bricks</option>
                    <option value="Halo Block">Halo Block</option>
                    <option value="Cement">Cement</option>
                    <option value="M-Sand">M-Sand</option>
                  </select>
                </div>

                {/* Conditional Product Inputs */}
                {(formData.ProductType === "FlyAsh Bricks" ||
                  formData.ProductType === "Halo Block" ||
                  formData.ProductType === "Cement") && (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Count</label>
                      <input
                        type="number"
                        className="form-control"
                        name="ProductCount"
                        value={formData.ProductCount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Single Piece Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="SinglePiecePrice"
                        value={formData.SinglePiecePrice}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {formData.ProductType === "M-Sand" && (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Unit Count</label>
                      <input
                        type="number"
                        className="form-control"
                        name="UnitCount"
                        value={formData.UnitCount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Single Unit Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="SingleUnitPrice"
                        value={formData.SingleUnitPrice}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {/* Total Amount */}
                <div className="col-md-4">
                  <label className="form-label">Total Amount</label>
                  <input
  type="number"
  className="form-control"
  name="TotalAmount"
  value={formData.TotalAmount}
  readOnly
  style={{ backgroundColor: "#f1f3f4" }}
/>

                </div>

                

                {/* Transport Mode */}
                <div className="col-md-4">
                  <label className="form-label">Transport Mode</label>
                  <select
                    className="form-select"
                    name="TransportMode"
                    value={formData.TransportMode}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Com Transport">Com Transport</option>
                    <option value="Own Transport">Own Transport</option>
                  </select>
                </div>

                {/* Conditional Transport Details */}
                {formData.TransportMode && (
                  <>
                    <div className="col-md-4">
                      <label className="form-label">Driver Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="DriverName"
                        value={formData.DriverName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Vehicle Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="VehicleNumber"
                        value={formData.VehicleNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}


                {formData.TransportMode === "Com Transport" && (
  <>
    <div className="col-md-4">
      <label className="form-label">Employee Count</label>
      <input
        type="number"
        className="form-control"
        name="EmpCount"
        value={formData.EmpCount}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Trip Starting KM</label>
      <input
        type="number"
        className="form-control"
        name="TripStartingKM"
        value={formData.TripStartingKM}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Trip End KM</label>
      <input
        type="number"
        className="form-control"
        name="TripEndKM"
        value={formData.TripEndKM}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Total KM</label>
      <input
        type="number"
        className="form-control"
        name="TotalKM"
        value={
          formData.TripStartingKM && formData.TripEndKM
            ? formData.TripEndKM - formData.TripStartingKM
            : ""
        }
        readOnly
      />
    </div>
  </>
)}


                {formData.TransportMode && (
  <>
    <div className="col-md-4">
      <label className="form-label">Vehicle Out Time</label>
      <input
        type="time"
        className="form-control"
        name="VechOutTime"
        value={formData.VechOutTime}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Vehicle In Time</label>
      <input
        type="time"
        className="form-control"
        name="VechInTime"
        value={formData.VechInTime}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Total Trip Time</label>
      <input
        type="text"
        className="form-control"
        name="TotalTripTime"
        value={formData.TotalTripTime}
        readOnly
        style={{ backgroundColor: "#f1f3f4" }}
      />
    </div>
  </>
)}


                {/* Buttons */}
                <div className="col-12 d-flex justify-content-end mt-3">
                  <button className="btn btn-primary me-2" onClick={handleAdd}>
                    Add Product +
                  </button>
         
                </div>
              </div>

</div>

<div className="card bg-success">

            <div className="row my-3">
                <div className="col-lg-12">
                  <div className="car card-animate overflow-hidden">
              
                    <div className="card-body">
                      <div className="row">
                        <div class="col-xxl-2 col-md-6">
                         <button class="btn btn-danger material-shadow-none" onClick={handleToggleProductTable} >
    <i class="ri-filter-2-line me-1 align-bottom"></i>{isProductTableOpen ? "Hide Products" : "Show Products"}</button>

                        </div>
                        <div class="col-xxl-2 col-md-6">
                         
                        </div>
                       


                        <div class="col-xxl-2 col-md-6 my-auto">
                          
                          </div>
                           <div class="col-xxl-2 col-md-6">
                  {/* empty */}
                        </div>
                        <div class="col-xxl-1 col-md-6">
                          <div className="">

                          </div>
                          </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            {/* <label for="exampleInputrounded" class="form-label">Filter Input</label>
                                                    <input type="text" class="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter your name" /> */}

                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 250 120"
                                  width={185}
                                  height={120}
                                  className=""
                                >
                                  <style
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        "\n.s0 {\n  opacity:.11;\n fill: var(--vz-success)\n  }\n  "
                                    
                                    }}
                                  />
                                  <path
                                    id="Shape 8"
                                    className="s0"
                                    d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                                  />
                                </svg>
                              </div>
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                                      {" "}
                                      Total Products
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {productList.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    
                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                                      {" "}
                                     PaymentStatus
                                    </p>
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
                                    
                                    
                                    <h4 className="fs-15 fw-semibold ff-secondary mb-0">
                                           <span className={getStatusColor(formData.PaymentStatus)}>
          {formData.PaymentStatus || "N/A"}
        </span>

                                    </h4>
                                  </div>
                                </div>
                              </div>
                              {/* end card body */}
                            </div>
                            {/* end card */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>


{showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-content professional-modal p-4 text-center">
      <h2 className="modal-title mb-2">✅ Export Product Submitted! 🎉</h2>
      <p className="modal-text">
        Payment Status:{" "}
        <span
          style={{
            color:
              submittedStatus === "Paid"
                ? "green"
                : submittedStatus === "Pending"
                ? "orange"
                : "red",
          }}
        >
          {submittedStatus || "N/A"}
        </span>
      </p>
      <button
        className="modal-button"
        onClick={() => setShowSuccessModal(false)}
      >
        Got It
      </button>
    </div>
  </div>
)}


                      
            
              {/* Product List Table */}
{productList.length > 0 && (
<div className="card-body">
    {isProductTableOpen && (
    <table
                        id="example"
                        className="table table-bordered dt-responsive nowrap table-striped align-middle"
                        style={{ width: "100%" }}
                      >
      <thead className="bg-light">
        <tr>
          <th>S.No</th>
          <th>Product ID</th>
          <th>Customer</th>
          <th>Product Type</th>
          <th>Total Amount</th>
          {/* <th>Payment</th> */}
          {/* <th>Transport</th> */}
        </tr>
      </thead>
      <tbody>
        {productList.map((prod, index) => (
          <tr key={index}>
            <td>{index + 1}</td> {/* Row Number */}
            <td>{prod.ProductId}</td>
            <td>{prod.CusName}</td>
            <td>{prod.ProductType}</td>
            <td>{prod.TotalAmount}</td>
            {/* <td>{prod.PaymentStatus}</td> */}
            {/* <td>{prod.TransportMode}</td> */}
          </tr>
        ))}
 <tr className="">
  <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}></td>
 </tr>
        {/* Final Total Row */}
        <tr className="bg-light">
          <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
            Final Total Amount
          </td>
          <td>
            <input
      type="number"
      className="form-control fw-bold text-success"
      value={finalTotalAmount}
      readOnly
      style={{ backgroundColor: "#f1f3f4" }}
    />
          </td>
          {/* <td colSpan={2}></td> */}
        </tr>

        {/* Paid Amount & Balance (if Paid) */}
{isProductTableOpen && (
  <>
    <tr>
      <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
        Paid Amount
      </td>
      <td>
        <input
  type="number"
  className="form-control fw-bold text-secondary"
  value={paidAmount}
  min="0"
  max={finalTotalAmount}
  onChange={handlePaidChange}
/>

      </td>
      {/* <td colSpan={2}></td> */}
    </tr>

    <tr>



      <td colSpan={4} style={{ textAlign: "right", fontWeight: "bold" }}>
        Balance Amount
      </td>
      <td>
        <input
          type="number"
          className="form-control fw-bold text-danger"
          value={balanceAmount}
          readOnly
          style={{ backgroundColor: "#f1f3f4" }}
        />
      </td>
      {/* <td colSpan={2}></td> */}
    </tr>
  </>
)}


      </tbody>
    </table>
    )}
    {/* <div className="col-md-4">
  <label className="form-label">Payment Status</label>
  <input
    type="text"
    className="form-control"
    value={formData.PaymentStatus || ""}
    readOnly
    style={{ backgroundColor: "#f1f3f4", fontWeight: "bold" }}
  />
</div> */}
<div className="col-12 d-flex justify-content-end mt-3">
         <button className="btn btn-success" onClick={handleSubmit}>
                    Submit
                  </button>
                  </div>
  </div>
)}








            </div>
      
        </div>
      </div>
    </div>




  );
}

export default AddExportProductRight;
