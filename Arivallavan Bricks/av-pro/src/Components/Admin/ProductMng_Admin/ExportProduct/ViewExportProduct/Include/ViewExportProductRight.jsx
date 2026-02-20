import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

function ViewExportProductRight() {

  const navigate = useNavigate();

 /* ===================== STATE ===================== */
  const [exports, setExports] = useState([]);
  const [editExportId, setEditExportId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState([]);
  const [payAmount, setPayAmount] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);

  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

const [invoiceHeader, setInvoiceHeader] = useState({});



const fetchExports = async () => {
  const res = await axios.get("http://localhost:3001/exportproduct");
  setExports(res.data);
};



useEffect(() => {
  fetchExports();
}, []);




const loadPaymentHistory = async (exportId) => {
  const res = await axios.get(
    `http://localhost:3001/exportproduct/payment-history/${exportId}`
  );
  setPaymentHistory(res.data);
};


const invoiceTotal = modalData.reduce(
  (sum, p) => sum + Number(p.TotalAmount || 0),
  0
);

useEffect(() => {
  axios.get("http://localhost:3001/exportproduct")
    .then(res => setExports(res.data));
}, []);




const handleView = async (item) => {
  const res = await axios.get(
    `http://localhost:3001/exportproduct/${item.ExportId}`
  );

  setModalData(res.data);

  // 🔥 THIS IS IMPORTANT
setEditData({
  ExportId: item.ExportId,
  CusName: item.CusName,
  CusNumber: item.CusNumber,
  CusAddress: item.CusAddress,

  FinalTotalAmount: Number(item.FinalTotalAmount) || 0,
  PaidAmount: Number(item.PaidAmount) || 0,
  BalanceAmount: Number(item.BalanceAmount) || 0,

  PaymentStatus: item.PaymentStatus,
  TransportMode: item.TransportMode,
  CurrentDate: item.CurrentDate
});


  setShowModal(true);
  loadPaymentHistory(item.ExportId);

};






const handleAddPayment = async () => {
  const balance = Number(editData.BalanceAmount || 0);
  const pay = Number(payAmount || 0);

  // ❌ Validation
  if (pay <= 0) {
    alert("⚠️ Please enter a valid payment amount");
    return;
  }

  if (pay > balance) {
    alert("❌ Payment exceeds balance amount");
    return;
  }

  try {
    // ✅ SAFE TO POST
    const res = await axios.post(
      "http://localhost:3001/exportproduct/add-payment",
      {
        ExportId: editData.ExportId,
        amount: pay
      }
    );

    // ✅ Update UI with backend values
    setEditData((prev) => ({
      ...prev,
      PaidAmount: res.data.PaidAmount,
      BalanceAmount: res.data.BalanceAmount,
      PaymentStatus: res.data.PaymentStatus
    }));

    // ✅ Reset UI
    setPayAmount("");
    setShowPaymentInput(false);
    setShowHistory(true);
    loadPaymentHistory(editData.ExportId);
    fetchExports();

  } catch (error) {
    alert("❌ Failed to add payment. Please try again.");
    console.error(error);
  }
};





const handleEdit = (item) => {
  setEditExportId(item.ExportId);

  setEditData({
    ExportId: item.ExportId,
    CusName: item.CusName,
    CusNumber: item.CusNumber,
    CusAddress: item.CusAddress,

    FinalTotalAmount: Number(item.FinalTotalAmount) || 0,
    PaidAmount: Number(item.PaidAmount) || 0,
    BalanceAmount: Number(item.BalanceAmount) || 0,

    PaymentStatus: item.PaymentStatus,
    TransportMode: item.TransportMode,
    CurrentDate: item.CurrentDate
  });
};


const handleCancel = () => {
  setEditExportId(null);
};

const handleSave = async () => {
  await axios.put(
    `http://localhost:3001/exportproduct/${editExportId}`,
    editData
  );
  setEditExportId(null);

  // refresh
  const res = await axios.get("http://localhost:3001/exportproduct");
  setExports(res.data);
  fetchExports();
};



const handleDelete = async (exportId) => {
  if (!window.confirm("Are you sure you want to delete this export?")) return;

  try {
    await axios.delete(
      `http://localhost:3001/exportproduct/${exportId}`
    );

    // Remove row instantly from UI
    setExports(prev =>
      prev.filter(item => item.ExportId !== exportId)
    );
  } catch (err) {
    console.error(err);
    alert("Delete failed");
  }
  fetchExports();
};


const handlePayAmountChange = (e) => {
  const value = Number(e.target.value || 0);
  const balance = Number(editData.BalanceAmount || 0);

  if (value > balance) {
    alert("❌ Payment amount cannot be greater than Balance Amount");
    return; // STOP input
  }

  setPayAmount(value);
};



const handlePaidChange = (e) => {
  const paid = Number(e.target.value) || 0;
  const finalTotal = Number(editData.FinalTotalAmount) || 0;

  let balance = finalTotal - paid;
  if (balance < 0) balance = 0;

  let status = "Pending";
  if (paid === 0) status = "Unpaid";
  else if (paid >= finalTotal) status = "Paid";

  setEditData((prev) => ({
    ...prev,
    PaidAmount: paid,
    BalanceAmount: balance.toFixed(2),
    PaymentStatus: status
  }));
};



const showPiecePrice = modalData.some(p => Number(p.SinglePiecePrice) !== 0);
const showUnitCount = modalData.some(p => Number(p.UnitCount) !== 0);
const showSingleUnitPrice = modalData.some(p => Number(p.SingleUnitPrice) !== 0);





const isBalanceZero = Number(editData.BalanceAmount) === 0;

  /* ===================== FILTER STATE ===================== */
  const [filters, setFilters] = useState({
    ExportId: "",
    CusName: "",
    CusNumber: "",
    PaymentStatus: "",
  });


const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

const clearFilters = () => {
  setFilters({
    ExportId: "",
    CusName: "",
    CusNumber: "",
    PaymentStatus: "",
  });
};





 /* ===================== FILTER LOGIC ===================== */
  const filteredExports = exports.filter((item) => {
    return (
      (filters.ExportId === "" ||
        item.ExportId?.toString().toLowerCase().includes(filters.ExportId.toLowerCase())) &&
      (filters.CusName === "" ||
        item.CusName?.toLowerCase().includes(filters.CusName.toLowerCase())) &&
      (filters.CusNumber === "" ||
        item.CusNumber?.toString().includes(filters.CusNumber)) &&
      (filters.PaymentStatus === "" ||
        item.PaymentStatus === filters.PaymentStatus)
    );
  });

  return (
    <>
      {/* <!-- Begin page --> */}
      <div id="layout-wrapper">
        <div className="main-content">

          <div className="page-content">
            <div className="container-fluid">

              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                    <h4 className="mb-sm-0">Workers Data</h4>

                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Workers</a></li>
                        <li className="breadcrumb-item active">Data</li>
                      </ol>
                    </div>

                  </div>
                </div>
              </div>



              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden">
              
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xxl-2 col-md-6">
                          <div>
                            {/* <label for="exampleInputrounded" className="form-label">Filter Input</label>
                                                    <input type="text" className="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter your name" /> */}
                            <label className="form-label" htmlFor="exampleInputrounded">ExportId</label>
                          <input
  type="text"
  className="form-control rounded-pill"
  placeholder="Search ExportId"
  name="ExportId"
  value={filters.ExportId}
  onChange={handleFilterChange}
/>

                          </div>
                        </div>
                        <div className="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">CusName</label>
                            
                           <input
  type="text"
  className="form-control rounded-pill"
  placeholder="Search Name"
  name="CusName"
  value={filters.CusName}
  onChange={handleFilterChange}
/>

                          </div>
                        </div>

                        <div className="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">CusNumber</label>
                            <input
  type="text"
  className="form-control rounded-pill"
  placeholder="Search Number"
  name="CusNumber"
  value={filters.CusNumber}
  onChange={handleFilterChange}
/>

                         
                          </div>
                        </div>
                        <div className="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">PaymentStatus</label>
                             <select className="form-select rounded-pill"
            name="PaymentStatus" value={filters.PaymentStatus}
            onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Unpaid">Unpaid</option>
          </select>
                         
                          </div>
                        </div>
                       


                        <div className="col-xxl-1 col-md-6 my-auto">
                          <div className="">
                          <button className="btn btn-danger material-shadow-none"  onClick={() => clearFilters()}>
                            <i className="ri-filter-2-line me-1 align-bottom"></i>Clear</button>
                          </div>
                          </div>
                       
                        {/* <div className="col-xxl-1 col-md-6">
                          <div className="">

                          </div>
                          </div> */}

                        <div className="col-xxl-3 col-md-6">
                          <div>

<button
  type="button"
  className="card card-animate overflow-hidden m-0 border text-start w-100"
  style={{
    background: "#fff",
    cursor: "pointer",
    padding: 0,
    borderRadius: "12px"
  }}
>
  <div className="position-absolute start-0" style={{ zIndex: 0 }}>
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      width={200}
      height={120}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .s0 {
              opacity: .11;
              fill: var(--vz-success);
            }
          `
        }}
      />
      <path
        className="s0"
        d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4
           0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3
           -57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
      />
    </svg>
  </div>

  <div className="card-body position-relative" style={{ zIndex: 1 }}>
    <div className="d-flex align-items-center">
      <div className="flex-grow-1 overflow-hidden">
        <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
          Total Workers
        </p>
        <h4 className="fs-22 fw-semibold ff-secondary mb-0">
          {filteredExports.length}
        </h4>
      </div>

      <div className="flex-shrink-0 text-center">
        <p className="fw-semibold text-success mb-0" onClick={() => navigate("/AddExportProduct")}>
         + Add<br /> Product
        </p>
      </div>




    </div>
  </div>
</button>

                            {/* end card */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header">
                                            <h5 className="card-title mb-0">Workers Data</h5>
                                        </div> */}
                    <div className="card-body">
                      <table
                        id="example"
                        className="table table-bordered table-striped text-center"
                      >
                        <thead className="bg-light">
  <tr>
    <th>No</th>
    <th>ExportId</th>
    <th>CusName</th>
    <th>CusNumber</th>
    <th>CusAddress</th>
    <th>FinalTotalAmount</th>
    <th>PaidAmount</th>
    <th>BalanceAmount</th>
    <th>PaymentStatus</th>
    {/* <th>TransportMode</th> */}
    <th>CurrentDate</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  
  {filteredExports.length === 0 ? (
    <tr>
      <td colSpan="10" className="text-center">
        No Records Found
      </td>
    </tr>
  ) : (
    filteredExports.map((item, index) => (
      <tr key={item.ExportId}>
        <td>{index + 1}</td>

        <td>{item.ExportId}</td>

        <td>
          {editExportId === item.ExportId ? (
            <input
              className="form-control form-control-sm"
              value={editData.CusName || ""}
              onChange={(e) =>
                setEditData({ ...editData, CusName: e.target.value })
              }
            />
          ) : (
            item.CusName
          )}
        </td>

        <td>
          {editExportId === item.ExportId ? (
            <input
              className="form-control form-control-sm"
              value={editData.CusNumber || ""}
              onChange={(e) =>
                setEditData({ ...editData, CusNumber: e.target.value })
              }
            />
          ) : (
            item.CusNumber
          )}
        </td>

        <td>
          {editExportId === item.ExportId ? (
            <input
              className="form-control form-control-sm"
              value={editData.CusAddress || ""}
              onChange={(e) =>
                setEditData({ ...editData, CusAddress: e.target.value })
              }
            />
          ) : (
            item.CusAddress
          )}
        </td>

        <td>{item.FinalTotalAmount}</td>
<td>
  {editExportId === item.ExportId ? (
    <span className="fw-semibold text-primary">
  ₹ {item.PaidAmount}
</span>

  ) : (
    <span className="fw-semibold text-primary">
      ₹ {item.PaidAmount}
    </span>
  )}
</td>
<td>
  {editExportId === item.ExportId ? (
    <span className="fw-bold text-danger">
      ₹ {editData.BalanceAmount}
    </span>
  ) : (
    <span className="fw-bold text-danger">
      ₹ {item.BalanceAmount}
    </span>
  )}
</td>



<td>
  <span
    className={`badge ${
      (editExportId === item.ExportId
        ? editData.PaymentStatus
        : item.PaymentStatus) === "Paid"
        ? "bg-success"
        : (editExportId === item.ExportId
            ? editData.PaymentStatus
            : item.PaymentStatus) === "Pending"
        ? "bg-warning"
        : "bg-danger"
    }`}
  >
    {editExportId === item.ExportId
      ? editData.PaymentStatus
      : item.PaymentStatus}
  </span>
</td>



        {/* <td>{item.TransportMode}</td> */}
        <td>{item.CurrentDate}</td>

<td>
  {editExportId === item.ExportId ? (
    <div className="d-flex gap-1 justify-content-center">
      <button
        className="btn btn-success btn-sm"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="btn btn-secondary btn-sm"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div className="d-flex gap-1 justify-content-center">
      <button
  className="btn btn-info btn-sm"
  onClick={() => handleView(item)}
>
  View
</button>


      <button
        className="btn btn-primary btn-sm"
        onClick={() => handleEdit(item)}
      >
        Edit
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(item.ExportId)}
      >
        Delete
      </button>
    </div>
  )}
</td>

      </tr>
    ))
  )}
</tbody>

                      </table>










                    </div>
                  </div>
                </div>
                {/*end col*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*end row*/}


{showModal && (
  <div
    className="d-block bg-dark bg-opacity-50 position-fixed top-0 start-0 w-100 h-100"
    style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}
  >
    {/* Centered Popup Container */}
    <div className="position-absolute top-50 start-50 translate-middle bg-white shadow-lg rounded-3 d-flex flex-column"
         style={{ width: "90%", height: "90%", maxWidth: "1200px", maxHeight: "90vh", overflow: "hidden" }}
    >

      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center p-3 bg-primary text-white rounded-top">
        <div>
          <h4 className="mb-0 fw-bold text-warning">Export Invoice</h4>
          <small>Invoice ID: {editData.ExportId}</small>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => setShowModal(false)}>
          Close ✕
        </button>
      </div>

      {/* ===== BODY ===== */}
      <div className="flex-grow-1 overflow-auto p-3">

        {/* Top Info */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h6 className="fw-bold">Billed To</h6>
            <p className="mb-1">{editData.CusName}</p>
            <p className="mb-1">{editData.CusNumber}</p>
            <p className="mb-0">{editData.CusAddress}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1"><strong>Date:</strong> {editData.CurrentDate}</p>
            <p className="mb-1"><strong>Transport:</strong> {editData.TransportMode}</p>
            <span className={`badge fs-6 ${
              editData.PaymentStatus === "Paid"
                ? "bg-success"
                : editData.PaymentStatus === "Pending"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}>
              {editData.PaymentStatus}
            </span>
          </div>
        </div>

        <hr />

        {/* Product Table */}
        <div className="table-responsive mb-4">
  <table className="table table-bordered align-middle text-center mb-0 table-hover table-striped border-primary">
    <thead className="table-primary">
      <tr>
        <th>#</th>
        <th>Product</th>
        <th>Qty</th>

        {showPiecePrice && <th>Piece ₹</th>}
        {showUnitCount && <th>UnitCount</th>}
        {showSingleUnitPrice && <th>SingleUnit ₹</th>}

        <th>Total ₹</th>
      </tr>
    </thead>

    <tbody>
      {modalData.map((p, i) => (
        <tr key={i}>
          <td>{i + 1}</td>

          <td>
            <strong>{p.ProductType}</strong>
            <div className="text-muted small">{p.ProductId}</div>
          </td>

          <td>{p.ProductCount}</td>

          {showPiecePrice && <td>{p.SinglePiecePrice}</td>}
          {showUnitCount && <td>{p.UnitCount}</td>}
          {showSingleUnitPrice && <td>{p.SingleUnitPrice}</td>}

          <td className="fw-bold text-success">₹ {p.TotalAmount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        <hr />

        {/* Total Summary */}
        <div className="row justify-content-end mb-4 bg-light border border-4">
          <div className="col-md-4">
            <table className="table text-end mb-0">
              <tbody>
                <tr style={{ borderBottom: "1px dashed #999" }}>

                  <th>Total</th>
                  <td className="fw-bold">₹ {invoiceTotal}</td>
                </tr>
                <tr style={{ borderBottom: "1px dashed #999" }}>
                  <th>Paid</th>
                  <td className="fw-bold text-success">₹ {editData.PaidAmount}</td>
                </tr>
                <tr>
                  <th>Balance</th>
                  <td className={`fw-bold ${isBalanceZero ? "text-success" : "text-danger"}`}>
  ₹ {editData.BalanceAmount}
</td>

                </tr>
              </tbody>
            </table>
            
          </div>
        </div>


<div className="d-flex justify-content-between align-items-center mb-3">

  {/* LEFT SIDE - Payment History Button */}
  <button
    className="btn btn-primary "
    onClick={() => setShowHistory(!showHistory)}
  >
    📜 Payment History
  </button>

  {/* RIGHT SIDE - Payment Input + Add Payment */}
  <div className="d-flex align-items-center gap-2">

    {showPaymentInput && !isBalanceZero && (
      <>
        <input
  type="number"
  className="form-control"
  style={{ width: "140px" }}
  placeholder="Amount"
  value={payAmount}
  min="0"
  max={editData.BalanceAmount}
  onChange={handlePayAmountChange}
/>


        <button
          className="btn btn-primary"
          onClick={handleAddPayment}
        >
          Save
        </button>
      </>
    )}

    <button
      className="btn btn-success"
      disabled={isBalanceZero}
      onClick={() => setShowPaymentInput(!showPaymentInput)}
    >
      + Add Payment
    </button>

  </div>
</div>


{showHistory && (
  <>
    <h6 className="fw-bold mt-4">Payment History</h6>

    <table className="table table-bordered text-center table-hover table-striped table-light">
      <thead className="table-primary">
        <tr>
          <th>#</th>
          <th>Paid ₹</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {paymentHistory.length === 0 ? (
          <tr>
            <td colSpan="4">No payments yet</td>
          </tr>
        ) : (
          paymentHistory.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td className="text-success fw-bold">₹ {p.PaidAmount}</td>
              <td>{p.PaymentDate}</td>
              <td>{p.PaymentTime}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </>
)}




      </div>

      {/* ===== FOOTER ===== */}
      <div className="text-center p-3 bg-primary border-top">
        <small className="text-muted">Thank you for your business 🙏</small>
      </div>

    </div>
  </div>
)}


    </>

  )
}
export default ViewExportProductRight;

