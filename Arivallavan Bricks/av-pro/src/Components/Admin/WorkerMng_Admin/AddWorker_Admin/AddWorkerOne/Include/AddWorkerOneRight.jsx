import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineWarning } from "react-icons/ai";
import '../../../../../../../public/assets/css/Admin/Admin.css'
function AddWorkerOneRight() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    EmpId: "",
    FirstName: "",
    LastName: "",
    Age: "",
    DOB: "",
    Gender: "Male",
    ContNum: "",
    EmergencyContNum: "",
    JoiningDate: "",
    EmpAddress: "",
  });

  const [profileFile, setProfileFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // Popups / Alerts
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ show: false, message: "" });
  const [topAlert, setTopAlert] = useState({ show: false, message: "" });

  // 👉 Input Handlers
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };





  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) setDocumentFile(file);
  };
  // 👉 Submit Button Handler
const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedFormData = { ...formData, [name]: value };

  // Only generate EmpId for the first time
  if ((name === "FirstName" || name === "DOB") && !formData.EmpId) {
    const firstNamePart = (updatedFormData.FirstName || "").substring(0, 4).toUpperCase();
    const dobYear = updatedFormData.DOB ? new Date(updatedFormData.DOB).getFullYear() : "";
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Unique 4-digit
    if (firstNamePart && dobYear) {
      updatedFormData.EmpId = `${firstNamePart}${dobYear}AV${randomNum}`;
    }
  }

  setFormData(updatedFormData);
};

// Submit handler updates only the unique 4-digit part
const handleSubmit = async () => {
  if (formData.EmpId) {
    const firstPart = formData.EmpId.slice(0, formData.EmpId.indexOf("AV") + 2); // Up to 'AV'
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, EmpId: `${firstPart}${randomNum}` }));
  }

  if (!formData.EmpId || !formData.FirstName || !profileFile) {
    setAlertModal({ show: true, message: "Please fill all required fields and upload a profile image." });
    return;
  }

  const formDataToSend = new FormData();
  Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
  if (profileFile) formDataToSend.append("ProfileImg", profileFile);
  if (documentFile) formDataToSend.append("EmpDoc", documentFile);
const apiUrl = import.meta.env.VITE_API_URL; // your base API URL from .env
  try {
    await axios.post(`${apiUrl}/workers`, formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setShowSuccessModal(true);
    setTopAlert({ show: true, message: "Worker added successfully!" });
    setTimeout(() => setTopAlert({ show: false, message: "" }), 3000);
  } catch (error) {
    console.error("Error saving worker:", error);
    setAlertModal({ show: true, message: "Failed to save worker details. Try again." });
  }
};



  const handleNext = () => {
    navigate("/addworkertwo"); // 👈 update this route if needed
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
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Forms</a>
                                            </li>
                                            <li className="breadcrumb-item active">Page 1</li>
                                        </ol>
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
                                        <div className="flex-shrink-0">
                                            {previewImg && (
                                                <img src={previewImg} alt="Preview" width={50} height={50} className="rounded-5 " />)}
                                        </div>
                                    </div>
                                    {/* end card header */}
                                    <div className="card-body">
                                        <div className="live-preview">
                                            <div className="row gy-4">
                                                <div className="col-xxl-4 col-md-6">
<div>
  <label className="form-label">Employee ID</label>

  <div
    className="form-control d-flex align-items-center"
    style={{ backgroundColor: "#f8f9fa" }}
  >
    {/* First part */}
    <span>{formData.EmpId.slice(0, formData.EmpId.indexOf("AV"))}</span>

    {/* AV in red */}
    <span style={{ color: "red", fontWeight: "bold" }}>AV</span>

    {/* Last 4 digits in red */}
    <span style={{ color: "red", fontWeight: "bold" }}>
      {formData.EmpId.slice(-4)}
    </span>
  </div>

  <input type="hidden" name="EmpId" value={formData.EmpId} readOnly />
</div>





                                                </div>

                                                <div className="col-xxl-4 col-md-6">
                                                    <div className="row">
                                                        <div className="col-xxl-6 col-md-6">
                                                            <div>
                                                                <label className="form-label" htmlFor="exampleFormControlInput1"> First Name</label>
                                                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="First Name" name="FirstName" onChange={handleChange} value={formData.FirstName} required />

                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-6 col-md-6">
                                                            <div>
                                                                <label className="form-label" htmlFor="exampleFormControlInput1"> Last Name</label>
                                                                <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Last Name" name="LastName" onChange={handleChange} value={formData.LastName} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label className="form-label" htmlFor="exampleFormControlInput1">Age</label>
                                                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Age" name="Age" onChange={handleChange} value={formData.Age} required />
                                                    </div>
                                                </div>
                                                <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label className="form-label" htmlFor="exampleFormControlInput1">D.O.B</label>
                                                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.B" onFocus={(e) => e.target.showPicker()} name="DOB" value={formData.DOB} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label className="form-label" htmlFor="exampleFormControlSelect1">Gender</label>
                                                        <select className="form-select selectinput" id="exampleFormControlSelect1" name="Gender" onChange={handleChange} value={formData.Gender} >
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                </div>




                                                <div className="col-xxl-4 col-md-6">
                                                    <label className="form-label" htmlFor="exampleFormControlInput1">Contact Number</label>
                                                    <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Contact Number" name="ContNum" onChange={handleChange} value={formData.ContNum} />

                                                </div>
                                                <div className="col-xxl-4 col-md-6">
                                                    <label className="form-label" htmlFor="exampleFormControlInput1">Emergency Contact Number</label>
                                                    <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="Emergency Contact Number" name="EmergencyContNum" onChange={handleChange} value={formData.EmergencyContNum} />

                                                </div>
                                                  <div class="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label className="form-label" htmlFor="exampleFormControlInput1">Joining Date</label>
                                                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="Joining Date" onFocus={(e) => e.target.showPicker()} name="JoiningDate" value={formData.JoiningDate} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-xxl-4 col-md-6">
                                                    <div>
                                                        <label className="form-label" htmlFor="exampleFormControlInput1">Employee Address</label>
                                                        <input type="text" className="form-control input" name="EmpAddress" id="exampleFormControlInput1" placeholder="Employee Address" onChange={handleChange} value={formData.EmpAddress} required />

                                                    </div>
                                                </div>

                                                <div class="col-xxl-4 col-md-6">
                                                    <label className="form-label" htmlFor="placeholderInput">Profile</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="file"
                                                            className="form-control input"
                                                            id="inputGroupFile02"
                                                            accept="image/*"
                                                            name="ProfileImg"
                                                            ref={fileInputRef}
                                                            onChange={handleFileChange}
                                                        />


                                                    </div>
                                                </div>
                                                        <div class="col-xxl-4 col-md-6">
                                               
                                                    <label className="form-label">Employee Document</label>
                                                    
                                                    <div className="input-group">
                      <input type="file" className="form-control input" id="inputGroupFile02" accept="*/*" name="EmpDoc" onChange={handleDocChange} ref={fileInputRef}/>
                     
    </div>
                                            </div>





                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>



                    </div>


                </div>

                

                <footer className="foote pt-1">

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
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content professional-modal p-4 text-center">
            <div className="modal-image mb-4">
              {/* <img src={ComLogo} alt="Worker Added" className="worker-img" /> */}
            </div>
            <h2 className="modal-title mb-2">✅ Worker Added Successfully! 🎉</h2>
            <p className="modal-text">
              The worker’s information has been securely stored in the system.
            </p>
            <button
              className="modal-button"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/workertable");
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* --- Alert Modal --- */}
      {alertModal.show && (
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
      )}

      {/* --- Top Alert --- */}
      {topAlert.show && (
        <div className="top-alert">
          <span>{topAlert.message}</span>
        </div>
      )}




        </>
    )
}
export default AddWorkerOneRight;