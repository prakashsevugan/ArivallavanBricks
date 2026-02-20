import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // 👈 you forgot to import this
import { AiOutlineWarning } from "react-icons/ai";
import '../../../../../../../public/assets/css/Admin/Admin.css'

function AddMakingProductRight() {
  const [formData, setFormData] = useState({
  ProductDate: "",
  ProductType: "Flyash Bricks",
  Quantity: "",
  QuantityType: "",
  CementType: "",
  SessionType: "Full Day"  // 👈 added
});

  // ✅ Generate unique ProductId
  const generateProductId = () => {
    const datePart = moment().format("YYYYMMDD");
    const randomPart = Math.floor(100 + Math.random() * 900); // 3-digit random number
    return `PROD-${datePart}-${randomPart}`;
  };

  // ✅ Set default ProductId and Date on first render
  useEffect(() => {
    const uniqueId = generateProductId();
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      ProductId: uniqueId,
      ProductDate: today,
    }));
  }, []);


const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  // Local submit (no backend)


  const handleSubmit = async () => {
    try {
      // If no ProductId yet, generate one
      const ProductId = formData.ProductId || generateProductId();

      // Map formData to backend payload
      const payload = {
        ProductId,
        ProductDate: formData.ProductDate,
        ProductType: formData.ProductType,
        Quantity:
          formData.ProductType === "Flyash Bricks"
            ? Number(formData.Palat)
            : Number(formData.PieceCount),
        QuantityType:
          formData.ProductType === "Flyash Bricks" ? "Palat" : "PieceCount",
        CementType: formData.CementUsed,
        SessionType: formData.SessionType,
      };

      // POST to backend
      const res = await axios.post("http://localhost:3001/makingproduct", payload);
      alert(`✅ Product Added Successfully! ProductId: ${ProductId}`);

      // Reset form after success
      setFormData({
        ProductId: generateProductId(),
        ProductDate: new Date().toISOString().split("T")[0],
        ProductType: "Flyash Bricks",
        Palat: "",
        PieceCount: "",
        CementUsed: "",
        SessionType: "Full Day",
      });
    } catch (error) {
      console.error("❌ Error adding product:", error.response || error);
      alert("❌ Failed to add product. Check console for details.");
    }
  };



  return (
    <>
      <div className="main-content">
        <div className="page-content pb-2">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                  <h4 className="mb-sm-0">WORKERS  MANAGEMENT</h4>
                  <div className="page-title-right">
                  <nav>
  <button
    type="button"
    className="btn btn-link breadcrumb m-0"
    onClick={() => navigate(-1)}
  >
    ← Back
  </button>
</nav>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Workers Details ...</h4>
                    {/* <div className="flex-shrink-0">
                                            {previewImg && (
                                                <img src={previewImg} alt="Preview" width={50} height={50} className="rounded-5 " />)}
                                        </div> */}
                  </div>
                  {/* end card header */}
                  <div className="card-body">
                    <div className="live-preview">
                      <div className="row gy-4">
                        <div className="col-xxl-4 col-md-6">
                          <div>
                            <label className="form-label">Product ID</label>


                            <input
                              type="text"
                              className="form-control"
                              name="ProductId"
                              value={formData.ProductId}
                              readOnly
                              style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}
                            />

                          </div>





                        </div>

                        <div className="col-xxl-4 col-md-6">
                          
                          
                              <div>
                                <label className="form-label">Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="ProductDate"
                                  value={formData.ProductDate}
                                  onChange={handleChange}
                                />
                              </div>


                       

 

                        </div>

 <div className="col-xxl-4 col-md-6">

                         
                                   
                              <div>
                               <label className="form-label">Session Type</label>
<select
  className="form-select"
  name="SessionType"
  value={formData.SessionType}
  onChange={handleChange}
>
  <option value="">Select Session Type</option>
  <option value="Full Day">Full Day</option>
  <option value="Morning">Morning</option>
  <option value="Afternoon">Afternoon</option>
</select>

                          
                            </div>
 </div>











                      </div>

 <div className="row gy-4 py-3">
                                                     <div className="col-xxl-4 col-md-6">
                              <div>
                                <label className="form-label">Product Type</label>
                                <select
                                  className="form-select"
                                  name="ProductType"
                                  value={formData.ProductType}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Product Type</option>
                                  <option value="Flyash Bricks">Flyash Bricks</option>
                                  <option value="Hallo Block">Hallo Block</option>
                                </select>
                              </div>
                            </div>


                            
                        {/* Conditional Palat / Piece Count */}
                        {formData.ProductType === "Flyash Bricks" && (
                          <div className="col-xxl-4 col-md-6">
                            <div>
                              <label className="form-label">Palat Count</label>
                              <input
                                type="number"
                                className="form-control"
                                name="Palat"
                                placeholder="Enter Palat Count"
                                value={formData.Palat}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        )}

                        {formData.ProductType === "Hallo Block" && (
                          <div class="col-xxl-4 col-md-6">
                            <div>
                              <label className="form-label">Piece Count</label>
                              <input
                                type="number"
                                className="form-control"
                                name="PieceCount"
                                placeholder="Enter Piece Count"
                                value={formData.PieceCount}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        )}


                        <div className="col-xxl-4 col-md-6">
                          <div>

                            <label className="form-label d-block">Cement Used (in bags)</label>

                            <input
                              type="number"
                              className="form-control"
                              name="CementUsed"
                              value={formData.CementUsed}
                              onChange={handleChange}
                              min={0} // optional: no negative numbers
                              placeholder="Enter number of cement bags"
                            />
                          </div>
                        </div>

 </div>



                    </div>
                    {/* --- Submit Button --- */}
                    <div className="pt-3 text-center">
                      <button
                        type="button"
                        className="btn btn-success btn-label w-25 text-white"
                        onClick={handleSubmit}
                      >
                        <i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i>
                        Submit
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>



          </div>


        </div>



        <footer className="footer pt-1">



          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© ARIVALLAVAN.</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design &amp; Develop by PRAKASH
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>

      {/* --- Popup Success Modal --- */}
      {/* {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content professional-modal p-4 text-center">
            <div className="modal-image mb-4">
              <img src={ComLogo} alt="Worker Added" className="worker-img" />
            </div>
            <h2 className="modal-title mb-2">✅ Worker Added Successfully! 🎉</h2>
            <p className="modal-text">
              The worker’s information has been securely stored in the system.
            </p>
            <button
              className="modal-button"
            
            >
              Got It
            </button>
          </div>
        </div>
      )} */}

      {/* --- Alert Modal --- */}
      {/* {alertModal.show && (
        <div className="modal-overlay">
          <div className="modal-content custom-modal p-4 rounded shadow-lg text-center">
            <div className="mb-3 text-danger">
              <AiOutlineWarning size={60} />
            </div>
            <h4 className="text-danger fw-bold mb-2">Oops!</h4>
            <p className="text-dark fw-bold">{alertModal.message}</p>
            <button
              className="btn btn-danger mt-3 px-4 fw-bold"
              onClick={() => setAlertModal({ show: false, message: "" })}
            >
              OK
            </button>
          </div>
        </div>
      )} */}

      {/* --- Top Alert --- */}
      {/* {topAlert.show && (
        <div className="top-alert">
          <span>{topAlert.message}</span>
        </div>
      )} */}




    </>
  )
}
export default AddMakingProductRight;