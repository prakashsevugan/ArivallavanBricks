import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
function AddWorkerTwoRight() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FinNo: "",
    DOA: "",  
    DOB: "",
    DOI: "",
    DOE: "",
    DO_ThumbPrint: "",
    DO_Onboard: "",
    DO_Renewal: "",
    WP_No: "",
    WP_Expiry: "",
    PP_No: "",
    PP_Expiry: "",
    IPA: "",
    Passport: "",
    Bond: "",
    Onboard: "",
    Medical: "",
    Issuance: "",
    MOMThumbPrint: "",
    IC: "",
    Contract: "",
  });


  const [files, setFiles] = useState({});
 const [selectedFile, setSelectedFile] = useState(null);
 const fileInputRef = useRef(null); // Reference for file input
 const [selectedInputNames, setSelectedInputNames] = useState([]); // Store selected input names

  // Load selected input names from localStorage when the component is mounted
  useEffect(() => {
    const storedInputNames = JSON.parse(localStorage.getItem("selectedInputNames"));
    if (storedInputNames) {
      setSelectedInputNames(storedInputNames); // Set the state with the stored names
    }
  }, []);


  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0]; // Get the selected file
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
    }));
    setSelectedFile(e.target.files[0]);
    setSelectedFile(file);

    if (file) {
      // Store input name if a file is selected
      const inputName = e.target.name;
      setSelectedInputNames((prevNames) => {
        const updatedNames = [...prevNames, inputName];
        localStorage.setItem("selectedInputNames", JSON.stringify(updatedNames)); 
        return updatedNames;
      });
    }
  };

  const formDataToSend = new FormData();
Object.keys(formData).forEach((key) => {
  if (formData[key]) formDataToSend.append(key, formData[key]);
});

Object.keys(files).forEach((key) => {
  if (files[key]) formDataToSend.append(key, files[key]);
});




// const handleSubmit = () => {
//   if (!selectedFile) {
//     alert("Please select a file before uploading.");
//     return;
//   }
//   console.log("Uploading:", selectedFile);
//   // Handle upload logic here
// };



const [topAlert, setTopAlert] = useState({ show: false, message: "" });

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!formData.FinNo.trim()) {
        alert("Please enter FinNo.");
        return;
      }
      if (!selectedFile) {
        alert("Please select a file before uploading.");
        return;
      }
 
      const formDataToSend = new FormData();
      formDataToSend.append("FinNo", formData.FinNo); // Include FinNo
  
      Object.keys(files).forEach((key) => {
          formDataToSend.append(key, files[key]); // Append files
      });
  
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
          const response = await axios.post(
              `${apiUrl}/workerreportfiles`,
              formDataToSend,
              { headers: { "Content-Type": "multipart/form-data" } }
          );
  
          console.log("Data saved:", response.data);
          // alert("Worker Report Files Uploaded Successfully");
          setTopAlert({ show: true, message: "Worker Report Files Uploaded Successfully" });
          setTimeout(() => setTopAlert({ show: false, message: "" }), 2000);
  
          // Store in localStorage
          localStorage.setItem("workerData", JSON.stringify(response.data));
          
                // Reset input fields
      setSelectedFile(null);
      
   
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears file input field
    }
      } catch (error) {
          console.error("Error submitting form:", error);
      }
  };
  

  // const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // Excluding 'I' and 'O'

  // Function to generate Fin No
  // const generateFinNo = () => {
  //   const firstLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  //   const numbers = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
  //   const lastLetter = letters.charAt(Math.floor(Math.random() * letters.length));
  //   return `${firstLetter}${numbers}${lastLetter}`;
  // };




  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("workerData")) || {};
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    setFormData((prevData) => ({
      ...prevData,
      ...storedData,
      // FinNo: storedData.FinNo || generateFinNo(), // Set FinNo only if not already stored
    }));
  }, []);


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  



  const handleNext = () => {
    // Auto-generate FinNo if it's empty
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerthree");
  };
  
  const handlePre = () => {
    // Auto-generate FinNo if it's empty
    // if (!formData.FinNo) {
    //   formData.FinNo = generateFinNo();
    // }
    localStorage.setItem("workerData", JSON.stringify(formData));
    navigate("/addworkerone");
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
                                            <li className="breadcrumb-item active">Page 2</li>
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
                                            check
                                        </div>
                                    </div>
                                    {/* end card header */}
                                    <div className="card-body">
                                        <div className="live-preview">
                                            <div className="row gy-4">
                                                {/* col-1 */}

                                            <div class="col-xxl-6 col-md-6">
                                            <div className="row gy-4">
                                            <div className="col-xxl-6 col-md-6">
                                                    <div>            
                                                        <label className="form-label" htmlFor="exampleFormControlInput1">FIN No</label>
                                                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="FIN No" name="FinNo" value={formData.FinNo} onChange={handleChange} required/>
                                                    </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">D.O.E</label>
                                                <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.E" onFocus={(e) => e.target.showPicker()} name="DOE" value={formData.DOE} onChange={handleChange}/>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                    <div>
                                                    <label className="form-label" htmlFor="exampleFormControlInput1">D.O.A</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.A" onFocus={(e) => e.target.showPicker()}  name="DOA" value={formData.DOA} onChange={handleChange}/>
                      </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">D.O.B</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.B" onFocus={(e) => e.target.showPicker()} name="DOB" value={formData.DOB} onChange={handleChange} required/>
                      </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                    <div>
                                                    <label className="form-label" htmlFor="exampleFormControlInput1">D.O.I</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.I" onFocus={(e) => e.target.showPicker()} name="DOI" value={formData.DOI} onChange={handleChange}/>
                     </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">D.O.Thumb Print</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.Thumb Print" onFocus={(e) => e.target.showPicker()} name="DO_ThumbPrint" value={formData.DO_ThumbPrint} onChange={handleChange}/>
                      </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">D.O.onboard</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.onboard" onFocus={(e) => e.target.showPicker()} name="DO_Onboard" value={formData.DO_Onboard} onChange={handleChange}/>
                     </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">D.O.Renewal</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="D.O.Renewal" onFocus={(e) => e.target.showPicker()} name="DO_Renewal" value={formData.DO_Renewal} onChange={handleChange}/>
                       </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">WP No</label>
                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="WP No" name="WP_No" value={formData.WP_No} onChange={handleChange} />
                      </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">WP EXPIRY</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="WP EXPIRY" onFocus={(e) => e.target.showPicker()} name="WP_Expiry" value={formData.WP_Expiry} onChange={handleChange}/>
                      </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">PP No</label>
                        <input type="text" className="form-control input" id="exampleFormControlInput1" placeholder="PP No" name="PP_No" value={formData.PP_No} onChange={handleChange}/>
                      </div>
                                                </div>
                                                <div class="col-xxl-6 col-md-6">
                                                <div>
                                                <label className="form-label" htmlFor="exampleFormControlInput1">PP EXPIRY</label>
                        <input type="date" className="form-control input" id="exampleFormControlInput1" placeholder="PP EXPIRY" onFocus={(e) => e.target.showPicker()} name="PP_Expiry" value={formData.PP_Expiry} onChange={handleChange}/>
                       </div>
                                                </div>
                                            </div>
                                            </div>

                                             {/* col-2 */}
                                            <div class="col-xxl-6 col-md-6">
                                            <div className="row gy-4">
                                            <div className="col-xxl-6 col-md-6">
                                               
                                                    <label className="form-label">IPA File</label>
                                                    
                                                    <div className="input-group">
                      <input type="file" className="form-control input" id="inputGroupFile02" accept="*/*" name="IPA" onChange={handleFileChange} ref={fileInputRef}/>
                     
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                    <label className="form-label">Passport File</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="Passport" onChange={handleFileChange} ref={fileInputRef}/>

    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                  
                                                    <label className="form-label">Bond File</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="Bond" onChange={handleFileChange} ref={fileInputRef}/>
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                    
                                                    <label className="form-label">Onboard File</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="Onboard" onChange={handleFileChange} ref={fileInputRef}/>
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                   
                                                    <label className="form-label">Medical Report</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="Medical" onChange={handleFileChange} ref={fileInputRef}/>
    
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                   
                                                    <label className="form-label">Issuance File</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="Issuance" onChange={handleFileChange} ref={fileInputRef}/>
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                
                                                    <label className="form-label">MOM Thumb Print Form</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="MOMThumbPrint" onChange={handleFileChange} ref={fileInputRef}/>

    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                    <label className="form-label">IC Copy</label>
                      <div className="input-group">
                      <input type="file" id="inputGroupFile02" className="form-control input  " accept="*/*" name="IC" onChange={handleFileChange}  ref={fileInputRef}/>
    </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-6">
                                                  
                                                    <label className="form-label">Contract File</label>
                      <div className="input-group">
      <input
        type="file"
        id="inputGroupFile02"
        className="form-control input  "
        accept="*/*"
        name="Contract"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

    </div>
                                            </div>

                                            <div class="hstack gap-2 justify-content-center">
                                            <button type="button" class="btn btn-info text-white" onClick={handleSubmit} disabled={!formData.FinNo.trim() || !selectedFile}>Update</button>
                                                </div>



                    
 {/* Display all selected input names */}
 {selectedInputNames.length > 0 && (
        <p className="mt-2 text-success">
          <strong className="">Selected Inputs:</strong>
          <ol style={{ display: 'flex', flexWrap: 'wrap', listStyleType: 'none', padding: 0 }}>
  {selectedInputNames.map((name, index) => (
    <li
      key={index} 
      className="text-dark"
      style={{
        marginRight: '10px',  // Space between items
        marginTop:'5px',
        marginBottom: '5px',  // Space below items
        backgroundColor: '#f0f0f0', // Optional background color
        padding: '5px 10px', // Optional padding for better spacing
        borderRadius: '5px', // Optional rounded corners
      }}
    >
      {name}
    </li>
  ))}
</ol>

        </p>
      )}                            

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

{/* top alart message */}
{topAlert.show && (
  <div className="top-alert">
    <span>{topAlert.message}</span>
  </div>
)}


                <footer className="foote">

                    <div class="d-flex justify-content-center gap-2 mb-2">
                       
                        <div class="slider-button-prev" onClick={handlePre}>
                            <div class="avatar-title fs-18 rounded px-3 material-shadow">
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                        </div>
                        
                        <div class="slider-button-next" onClick={handleNext}>
                            <div class="avatar-title fs-18 rounded px-3 material-shadow">
                                <i class="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        
                    </div>
                    {/* <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© CGR.</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design &amp; Develop by 
            </div>
          </div>
        </div>
      </div> */}
                </footer>

            </div>

        </>
    )
}
export default AddWorkerTwoRight;