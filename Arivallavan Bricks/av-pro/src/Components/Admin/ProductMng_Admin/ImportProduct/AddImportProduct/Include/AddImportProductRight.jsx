import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../../../../../../../public/assets/css/Admin/Admin.css";

function AddImportProductRight() {

  const initialState = {
    ImportId: "",
    ImportDate: moment().format("YYYY-MM-DD"),
    ImportAddress: "",
    VehicleNumber: "",
    MaterialType: "",
    MaterialSize: "",
    MaterialSizeWithUnit: "",
    MaterialPrice: "",
    MaterialTotalPrice: 0,
    WagesAmount: "",
    MiscellaneousAmount: "",
    GSTAmount: "",
    FinalTotalAmount: 0,
    PaidAmount: "",
    BalanceAmount: 0,
    PaymentStatus: "",
    Notequery: ""
  };
  

  const [formData, setFormData] = useState(initialState);
  const [showInvoice, setShowInvoice] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


    const handlePaidAmountChange = (e) => {

  let value = e.target.value;

  // Prevent negative sign
  if (value.includes("-")) {
    value = value.replace("-", "");
  }

  let numericValue = parseFloat(value) || 0;
  let maxValue = parseFloat(formData.FinalTotalAmount) || 0;

  // Prevent over payment
  if (numericValue > maxValue) {
    numericValue = maxValue;
  }

  setFormData(prev => ({
    ...prev,
    PaidAmount: numericValue
  }));
};

const generateImportId = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/import/last-id");

    let newId = "IMP-0001";

    if (res.data.lastId) {
      const numberPart = parseInt(res.data.lastId.split("-")[1]) || 0;
      const nextNumber = numberPart + 1;
      newId = "IMP-" + String(nextNumber).padStart(4, "0");
    }

    setFormData(prev => ({
      ...prev,
      ImportId: newId
    }));

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  generateImportId();
}, []);

  /* =========================
     AUTO CALCULATION
  ========================= */

useEffect(() => {

  const size = Math.max(0, parseFloat(formData.MaterialSize) || 0);
  const price = Math.max(0, parseFloat(formData.MaterialPrice) || 0);
  const wages = Math.max(0, parseFloat(formData.WagesAmount) || 0);
  const misc = Math.max(0, parseFloat(formData.MiscellaneousAmount) || 0);
  const gst = Math.max(0, parseFloat(formData.GSTAmount) || 0);
  let paid = Math.max(0, parseFloat(formData.PaidAmount) || 0);

  // 🔹 Material Total
  const materialTotal = size * price;

  // 🔹 Final Total
  const finalTotal = materialTotal + wages + misc + gst;

  // 🔹 Prevent PaidAmount greater than FinalTotal
  if (paid > finalTotal) {
    paid = finalTotal;
  }

  const balance = finalTotal - paid;

  // 🔹 Payment Status
  let status = "Unpaid";

  if (paid > 0 && paid < finalTotal) {
    status = "Pending";
  }

  if (paid >= finalTotal && finalTotal > 0) {
    status = "Paid";
  }

  setFormData(prev => ({
    ...prev,
    MaterialTotalPrice: materialTotal,
    FinalTotalAmount: finalTotal,
    BalanceAmount: balance,
    PaidAmount: paid,
    PaymentStatus: status
  }));

}, [
  formData.MaterialSize,
  formData.MaterialPrice,
  formData.WagesAmount,
  formData.MiscellaneousAmount,
  formData.GSTAmount,
  formData.PaidAmount
]);


const getUnit = (type) => {
  if (
    ["M-Sand","P-Sand","Dust","Chips","WhiteFlyAsh","BlackFlyAsh","WhiteLime","BrownLime"]
      .includes(type)
  ) return "Unit";

  if (type === "CementBag") return "Count";

  if (type === "Chemical") return "Litre";

  return "";
};

  /* =========================
     SUBMIT
  ========================= */

const handleSubmit = async () => {
  try {

    const payload = {
      ...formData,
      SizeType: getUnit(formData.MaterialType) // ✅ send SizeType
    };
    

    await axios.post(
      "http://localhost:3001/api/import/add",
      payload
    );

    alert("Import Added Successfully");

    // Reset form
    setFormData(initialState);

    // Generate next ImportId
    generateImportId();

  } catch (err) {
    console.log(err);
  }
};


    const getStatusColor = () => {
    if (formData.PaymentStatus === "Paid") return "success";
    if (formData.PaymentStatus === "Pending") return "warning";
    return "danger";
  };

  const isUnlocked =
  formData.MaterialType !== "" &&
  formData.MaterialSize !== "";


  
    return (
        <div className="main-content">
            <div className="page-content pb-2">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="card-title mb-0">Import Product Entry</h4>
                        </div>
                        <div className="card-body">
                            <div className="row gy-3">
                                {/* Product ID */}
                                <div className="col-md-4">
                                    <label className="form-label">Import ID</label>
<input
  type="text"
  className="form-control"
  name="ImportId"
  value={formData.ImportId}
    style={{ backgroundColor: "#f1f3f4" }}
  readOnly
/>
                                    {/* Payment Status Button */}
      {formData.PaymentStatus && (
        <button className={`btn btn-${getStatusColor()} mb-3`}>
          {formData.PaymentStatus}
        </button>
      )}
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Import Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="ImportDate"
                                        value={formData.ImportDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                     <div className="col-md-4">
                                    <label className="form-label">Import Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ImportAddress"
                                        placeholder="Enter Import Address"
                                         value={formData.ImportAddress}
        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Vehicle Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="VehicleNumber"
                                        placeholder="Enter Vehicle Number"
                                         value={formData.VehicleNumber}
        onChange={handleChange}
                                    />
                                </div>

                    

                                <div className="col-md-4">
                                    <label className="form-label">Material Type</label>
                                    <select
                                        className="form-select"
                                        name="MaterialType"
        value={formData.MaterialType}
        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
        <option value="M-Sand">M-Sand</option>
        <option value="P-Sand">P-Sand</option>
        <option value="Dust">Dust</option>
        <option value="Chips">Chips</option>
        <option value="WhiteFlyAsh">White FlyAsh</option>
        <option value="BlackFlyAsh">Black FlyAsh</option>
        <option value="WhiteLime">White Lime</option>
        <option value="BrownLime">Brown Lime</option>
        <option value="CementBag">Cement Bag</option>
        <option value="Chemical">Chemical</option>
                                    </select>
                                </div>



<div className="col-md-4">
  <label className="form-label">Material Size</label>

  <div style={{ position: "relative" }}>
    <input
      type="number"
      min="0"
      className="form-control"
      name="MaterialSize"
      value={formData.MaterialSize}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e") {
          e.preventDefault();
        }
      }}
      style={{ paddingRight: "80px" }}
    />

    <span
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#6c757d",
        fontWeight: "500"
      }}
    >
      {getUnit(formData.MaterialType)}
    </span>
  </div>
</div>

                                <div className="col-md-4">
                                    <label className="form-label">Material Price(Single)</label>
                                    <input
                                        type="text"

                                        name="MaterialPrice"
                                        placeholder="Material Price"
                                        value={formData.MaterialPrice}
                                        onChange={handleChange}
                                        className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Material Total Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.MaterialTotalPrice}
        readOnly
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Wages Amount</label>
                                    <input
                                        type="number"

                                        name="WagesAmount"
                                        placeholder="Wages"
                                          value={formData.WagesAmount}
        onChange={handleChange}
        className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Miscellaneous Amount</label>
                                    <input
                                        type="number"
                                        name="MiscellaneousAmount"
                                        placeholder="Enter Miscellaneous Amount"
                                         value={formData.MiscellaneousAmount}
        onChange={handleChange}
        className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">GST Amount</label>
                                    <input
                                        type="number"
                                        name="GSTAmount"
                                       placeholder="GST"
        value={formData.GSTAmount}
        onChange={handleChange}
        className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Final Total Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                         value={formData.FinalTotalAmount}
        readOnly
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Paid Amount</label>
                                    {/* <input
                                        type="number"
                                        className="form-control"
                                        name="PaidAmount"
                                        placeholder="Paid Amount"
        value={formData.PaidAmount}
        onChange={handleChange}
                                    /> */}
<input
  type="number"
  name="PaidAmount"
  min="0"
  value={formData.PaidAmount}
  onKeyDown={(e) => {
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  }}
  onChange={handlePaidAmountChange}
  className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
/>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Balance Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
 value={formData.BalanceAmount}
        readOnly
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Payment Status</label>
                                    <input
                                        type="number"
                                        className="form-control"
value={formData.PaymentStatus}
        readOnly
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Note query</label>
                                    <input
                                        type="text"
           
                                        name="Notequery"
                                        placeholder="Enter Note query"
                                        value={formData.Notequery}
        onChange={handleChange}
        className={`form-control ${!isUnlocked ? "bg-light" : ""}`}
  disabled={!isUnlocked}
                                    />
                                </div>

                           

                                {/* Buttons */}



 <div className="d-flex justify-content-end mt-3">

        <button
          className="btn btn-info me-2"
          onClick={() => setShowInvoice(true)}
        >
          Payment Detail
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Add Import +
        </button>

      </div>

      {/* ======================
         INVOICE PREVIEW
      ====================== */}

      {showInvoice && (
        <div className="card mt-4 p-4 shadow">
          <h5 className="text-center mb-3">Invoice Preview</h5>
          <hr />

          <p><strong>Import ID:</strong> {formData.ImportId}</p>
          <p><strong>Material:</strong> {formData.MaterialType}</p>
          <p>
  <strong>Size:</strong>{" "}
  {formData.MaterialSize
    ? `${formData.MaterialSize} ${formData.SizeType || getUnit(formData.MaterialType)}`
    : "-"}
</p>
          <p><strong>Material Total:</strong> ₹{formData.MaterialTotalPrice}</p>
          <p><strong>Wages:</strong> ₹{formData.WagesAmount}</p>
          <p><strong>Misc:</strong> ₹{formData.MiscellaneousAmount}</p>
          <p><strong>GST:</strong> ₹{formData.GSTAmount}</p>

          <hr />
          <h5>Total: ₹{formData.FinalTotalAmount}</h5>
          <p>Paid: ₹{formData.PaidAmount}</p>
          <p>Balance: ₹{formData.BalanceAmount}</p>
          <p>Status: {formData.PaymentStatus}</p>

          <div className="text-end">
            <button
              className="btn btn-secondary"
              onClick={() => setShowInvoice(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}




                                {/* <div className="col-12 d-flex justify-content-end mt-3">
                                    <button className="btn btn-primary me-2" onClick={handleSubmit}>
                                        Add Import +
                                    </button>

                                </div> */}
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </div>




    );
}

export default AddImportProductRight;
