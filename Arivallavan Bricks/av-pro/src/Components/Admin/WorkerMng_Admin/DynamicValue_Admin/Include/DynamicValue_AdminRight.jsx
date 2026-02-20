import React, { useEffect, useState } from "react";
import { useLocation,Link } from "react-router-dom";
import axios from "axios";
import ComLogo from '../../../../../../public/assets/img/Logo/Clogo.jpeg'
// import '../../../../../../public/assets/css/owncss/SignupLogin.css'
// import '../../../../../../public/assets/css/owncss/Admin/ViewWorkerForm.css'

// import { User } from 'lucide-react';
// import { FaIdBadge } from 'react-icons/fa';
// import { FaUserTie } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
// import { FaVenusMars } from "react-icons/fa";
// import { FaRegCalendarAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import DymanicValue_Admin from "../DynamicValue_Admin";
// import { FaFolder } from 'react-icons/fa';

function DymanicValue_AdminRight(){

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL;


  const [fields, setFields] = useState([]); // Stores table data
  const [newField, setNewField] = useState(""); // Input value

  // Fetch fields from database
  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.get(`${apiUrl}/feilds`); // Replace with your API URL
      setFields(response.data);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };

  // Add new field
  const handleAddField = async () => {
    if (newField.trim() === "") return; // Prevent empty values
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${apiUrl}/feilds`, {
        Feilds: newField,
      });

      setFields([...fields, response.data]); // Add new field to state
      setNewField(""); // Clear input
    } catch (error) {
      console.error("Error adding field:", error);
    }
  };

  // Delete field
  const handleDeleteField = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/feilds/${id}`);
      setFields(fields.filter((field) => field.id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };





// roles

  // const [roles, setRoles] = useState([]); // Store roles from DB
  // const [newRole, setNewRole] = useState(""); // Input value

  // useEffect(() => {
  //   fetchRoles(); // Fetch roles on component load
  // }, []);

  // Fetch roles from the database
  // const fetchRoles = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3001/roles"); // Replace with your API URL
  //     setRoles(response.data);
  //   } catch (error) {
  //     console.error("Error fetching roles:", error);
  //   }
  // };

  // Add a new role
  // const handleAddRole = async () => {
  //   if (!newRole.trim()) return alert("Please enter a role!");
  //   try {
  //     await axios.post("http://localhost:3001/roles", { Roles: newRole });
  //     setNewRole(""); // Clear input field
  //     fetchRoles(); // Refresh roles list
  //   } catch (error) {
  //     console.error("Error adding role:", error);
  //   }
  // };

  // Delete a role
  // const handleDeleteRole = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:3001/roles/${id}`);
  //     fetchRoles(); // Refresh roles list
  //   } catch (error) {
  //     console.error("Error deleting role:", error);
  //   }
  // };





//   add department

const [departments, setDepartments] = useState([]); // Stores department data
const [newDepartment, setNewDepartment] = useState(""); // Stores new department input

useEffect(() => {
  fetchDepartments(); // Fetch departments on component load
}, []);

// Fetch department data from backend
const fetchDepartments = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/departments`);
    setDepartments(response.data);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

// Add new department
const handleAddDepartment = async () => {
  if (!newDepartment.trim()) return; // Prevent empty input submission
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.post(`${apiUrl}/departments`, {
      Department: newDepartment,
    });
    setNewDepartment(""); // Clear input field
    fetchDepartments(); // Refresh table
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

// Delete department
const handleDeleteDepartment = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${apiUrl}/departments/${id}`);
    fetchDepartments(); // Refresh table
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};




// certificate
const [certificateName, setCertificateName] = useState("");
const [certificateList, setCertificateList] = useState([]);

// Fetch the certificate list from the database
useEffect(() => {
  fetchCertificates();
}, []);

const fetchCertificates = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(`${apiUrl}/getcertificates`);
    setCertificateList(response.data);
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }
};

// Add a new certificate
// const handleAddCertificate = async () => {
//   if (!certificateName.trim()) {
//     alert("Certificate name cannot be empty");
//     return;
//   }

//   try {
//     await axios.post("http://localhost:3001/postcertificates", {
//       CertificateList: certificateName, // Match backend column name
//     });
//     setCertificateName(""); // Clear input field after adding
//     fetchCertificates(); // Refresh list
//   } catch (error) {
//     console.error("Error adding certificate:", error);
//   }
// };


const handleAddCertificate = async () => {
  const trimmedName = certificateName.trim(); // Trim spaces

  if (!trimmedName) {
    alert("Certificate name cannot be empty or just spaces!");
    return;
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.post(`${apiUrl}/postcertificates`, {
      CertificateList: trimmedName, // Send trimmed value
    });
    setCertificateName(""); // Clear input field after adding
    fetchCertificates(); // Refresh list
  } catch (error) {
    console.error("Error adding certificate:", error);
  }
};


// Delete a certificate
const handleDeleteCertificate = async (id) => {
  if (!id) {
    console.error("Error: Invalid certificate ID");
    return;
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    await axios.delete(`${apiUrl}/dropcertificates/${id}`);
    fetchCertificates(); // Refresh the list
  } catch (error) {
    console.error("Error deleting certificate:", error);
  }
};







const [companyName, setCompanyName] = useState("");
const [companies, setCompanies] = useState([]);

// Fetch existing companies
useEffect(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  axios.get(`${apiUrl}/getCompanies`)
    .then((res) => setCompanies(res.data))
    .catch((err) => console.error(err));
}, []);

// Handle input change
const handleInputChange = (e) => {
  setCompanyName(e.target.value);
};

// Handle add company
const handleAddCompany = () => {
  if (!companyName.trim()) return;
  const apiUrl = import.meta.env.VITE_API_URL;
  axios.post(`${apiUrl}/addCompany`, { companyName })
    .then((res) => {
      setCompanies([...companies, res.data]); // Add new row to UI
      setCompanyName(""); // Clear input
    })
    .catch((err) => console.error(err));
};





const handleDelete = (id) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  axios
    .delete(`${apiUrl}/deleteCompany/${id}`)
    .then(() => {
      setCompanies(companies.filter((company) => company.id !== id));
    })
    .catch((err) => console.error(err));
};






// supervisor name add
const [supervisorName, setSupervisorName] = useState("");
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.get(`${apiUrl}/supervisors`);
    setSupervisors(response.data);
  };

  const addSupervisor = async () => {
    if (!supervisorName.trim()) return;
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.post(`${apiUrl}/supervisors`, {
      SupName: supervisorName,
    });

    setSupervisorName("");
    fetchSupervisors();
  };

  const deleteSupervisor = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    await axios.delete(`${apiUrl}/supervisors/${id}`);
    fetchSupervisors();
  };

    return(
<>
<div id="layout-wrapper">
  <div className="main-content">
    <div className="page-content">
      <div className="container-fluid">
        <div className="profile-foreground position-relative mx-n4 mt-n4">
          <div className="profile-wid-bg">
            <img
              src="assets/images/profile-bg.jpg"
              alt=""
              className="profile-wid-img"
            />
          </div>
        </div>
        <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
         
          {/*end row*/}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div className="d-flex profile-wrapper">
                {/* Nav tabs */}
                <ul
                  className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link fs-14 active"
                      data-bs-toggle="tab"
                      href="#Fields"
                      role="tab"
                    >
                      <i className="ri-airplay-fill d-inline-block d-md-none" />{" "}
                      <span className="d-none d-md-inline-block p-1">Fields</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#Department"
                      role="tab"
                    >
                      <i className="ri-list-unordered d-inline-block d-md-none" />{" "}
                      <span className="d-none d-md-inline-block p-1">
                      Department
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#Certificates"
                      role="tab"
                    >
                      <i className="ri-price-tag-line d-inline-block d-md-none" />{" "}
                      <span className="d-none d-md-inline-block p-1">Certificates</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#Company"
                      role="tab"
                    >
                      <i className="ri-folder-4-line d-inline-block d-md-none" />{" "}
                      <span className="d-none d-md-inline-block p-1">
                      Company
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link fs-14"
                      data-bs-toggle="tab"
                      href="#Supervisor"
                      role="tab"
                    >
                      <i className="ri-folder-4-line d-inline-block d-md-none" />{" "}
                      <span className="d-none d-md-inline-block p-1">
                      Supervisors
                      </span>
                    </a>
                  </li>
  
                </ul>

              </div>
              {/* Tab panes */}
              <div className="tab-content pt-4 text-muted">
                <div
                  className="tab-pane active"
                  id="Fields"
                  role="tabpanel"
                >
                 
                  <div
                  className="tab-pane"
                  id="Fields"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-xxl-12">
                     
                      <div className="card">
                        <div className="card-body">
                <span class="badge bg-success-subtle text-success align-middle card-title fs-6 mb-3" >Fields</span>


                <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden bg-dark-subtle">
              
                    <div className="card-body">
                      <div className="row">
                      
                <div class="col-xxl-3 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Enter Fields</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add Fields"
                              value={newField}
                onChange={(e) => setNewField(e.target.value)}             
                            />
                          </div>
                        </div>
                        <div class="col-xxl-3 col-md-6 my-auto">
                        <button
                      className="btn btn-success btn-sm px-3 py-1" onClick={handleAddField}>
                      + ADD
                    </button>
                        </div>

                        <div class="col-xxl-3 col-md-6">
                        
                        </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            
                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 200 120"
                                  width={200}
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
                                      Total
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {fields.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
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




                <div className="card card-animate overflow-hidden m-0 adddynamictablefeilds">
                              
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
              {/* Table */}
              <div className="table-responsive ">
          <table className="table table-striped text-nowrap mb-0 fs-11px">
            <thead className="text-uppercase bg-light">
              <tr className="">
                <th className="fw-bold text-dark">No.</th>
                <th className="fw-bold text-dark w-50">Fields</th>
                <th className="fw-bold text-dark">Action</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="">
                  <td>{index + 1}</td>
                  <td className="">{field.Feilds}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm px-3 py-1"
                      onClick={() => handleDeleteField(field.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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



                </div>

   




              








                <div
                  className="tab-pane fade"
                  id="Department"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-xxl-12">
                     
                      <div className="card">
                        <div className="card-body">
                <span class="badge bg-warning-subtle text-warning align-middle card-title fs-6 mb-3" >Department</span>


                <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden bg-dark-subtle">
              
                    <div className="card-body">
                      <div className="row">
                      
                <div class="col-xxl-3 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Enter Department</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add Department"
                              value={newDepartment}
                              onChange={(e) => setNewDepartment(e.target.value)}           
                            />
                          </div>
                        </div>
                        <div class="col-xxl-3 col-md-6 my-auto">
                        <button
                      className="btn btn-success btn-sm px-3 py-1" onClick={handleAddDepartment}>
                      + ADD
                    </button>
                        </div>

                        <div class="col-xxl-3 col-md-6">
                        
                        </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            
                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 200 120"
                                  width={200}
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
                                      Total
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {departments.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
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




                <div className="card card-animate overflow-hidden m-0 adddynamictablefeilds">
                              
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
              {/* Table */}
              <div className="table-responsive">
        <table className="table table-striped text-nowrap mb-0 fs-11px">
          <thead className="text-uppercase bg-light">
            <tr>
              <th className="fw-bold text-dark">No.</th>
              <th className="fw-bold text-dark">Department</th>
              <th className="fw-bold text-dark">Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={department.id}>
                <td>{index + 1}</td>
                <td>{department.Department}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm px-3 py-1"
                    onClick={() => handleDeleteDepartment(department.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

                          {/* Certificates */}
                <div
                  className="tab-pane fade"
                  id="Certificates"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-xxl-12">
                     
                      <div className="card">
                        <div className="card-body">
                <span class="badge bg-primary-subtle text-primary align-middle card-title fs-6 mb-3" >Certificates</span>


                <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden bg-dark-subtle">
              
                    <div className="card-body">
                      <div className="row">
                      
                <div class="col-xxl-3 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Enter Certificate</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add Certificate"
                              value={certificateName}
                              onChange={(e) => setCertificateName(e.target.value.replace(/^\s+/, ""))} // Prevent leading spaces          
                            />
                          </div>
                        </div>
                        <div class="col-xxl-3 col-md-6 my-auto">
                        <button
                      className="btn btn-success btn-sm px-3 py-1"  onClick={handleAddCertificate}>
                      + ADD
                    </button>
                        </div>

                        <div class="col-xxl-3 col-md-6">
                        
                        </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            
                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 200 120"
                                  width={200}
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
                                      Total
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {certificateList.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
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




                <div className="card card-animate overflow-hidden m-0 adddynamictablefeilds">
                              
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
              {/* Table */}
              <div className="table-responsive">
        <table className="table table-striped text-nowrap mb-0 fs-11px">
          <thead className="text-uppercase bg-light">
            <tr>
              <th className="fw-bold text-dark">No.</th>
              <th className="fw-bold text-dark">Certificates</th>
              <th className="fw-bold text-dark">Action</th>
            </tr>
          </thead>
          <tbody>
          {certificateList.map((cert, index) => (
              <tr key={cert.id}>
                <td>{index + 1}</td>
                <td>{cert.CertificateList}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCertificate(cert.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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




                          {/*Company*/}
                <div
                  className="tab-pane fade"
                  id="Company"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-xxl-12">
                     
                      <div className="card">
                        <div className="card-body">
                <span class="badge bg-info-subtle text-info align-middle card-title fs-6 mb-3" >Company</span>


                <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden bg-dark-subtle">
              
                    <div className="card-body">
                      <div className="row">
                      
                <div class="col-xxl-3 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Enter Company</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add Company"
                              value={companyName}
                              onChange={handleInputChange}     
                            />
                          </div>
                        </div>
                        <div class="col-xxl-3 col-md-6 my-auto">
                        <button
                      className="btn btn-success btn-sm px-3 py-1" onClick={handleAddCompany}>
                      + ADD
                    </button>
                        </div>

                        <div class="col-xxl-3 col-md-6">
                        
                        </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            
                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 200 120"
                                  width={200}
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
                                      Total
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {companies.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
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




                <div className="card card-animate overflow-hidden m-0 adddynamictablefeilds">
                              
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
              {/* Table */}
              <div className="table-responsive">
  <table className="table table-striped text-nowrap mb-0 fs-11px">
    <thead className="text-uppercase bg-light">
      <tr>
        <th className="fw-bold text-dark">No.</th>
        <th className="fw-bold text-dark">Company</th>
        <th className="fw-bold text-dark">Action</th>
      </tr>
    </thead>
    <tbody>
      {companies.map((company, index) => (
        <tr key={company.id}>
          <td>{index + 1}</td>
          <td>{company.CompanyList}</td>
          <td>
  <button
    className="btn btn-sm btn-danger"
    onClick={() => handleDelete(company.id)}
  >
    Delete
  </button>
</td>

        </tr>
      ))}
    </tbody>
  </table>
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


                          {/*Supervisor*/}
                <div
                  className="tab-pane fade"
                  id="Supervisor"
                  role="tabpanel"
                >
                  <div className="row">
                    <div className="col-xxl-12">
                     
                      <div className="card">
                        <div className="card-body">
                <span class="badge bg-info-subtle text-info align-middle card-title fs-6 mb-3" >Supervisors</span>


                <div className="row">
                <div className="col-lg-12">
                  <div className="card card-animate overflow-hidden bg-dark-subtle">
              
                    <div className="card-body">
                      <div className="row">
                      
                <div class="col-xxl-3 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Enter Supervisor Name</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Add Supervisor"  
                              value={supervisorName}
            onChange={(e) => setSupervisorName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div class="col-xxl-3 col-md-6 my-auto">
                        <button
                      className="btn btn-success btn-sm px-3 py-1"  onClick={addSupervisor}>
                      + ADD
                    </button>
                        </div>

                        <div class="col-xxl-3 col-md-6">
                        
                        </div>

                        <div class="col-xxl-3 col-md-6">
                          <div>
                            
                            <div className="card card-animate overflow-hidden m-0 border">
                              <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                                <svg
                                  version="1.2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 200 120"
                                  width={200}
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
                                      Total
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {supervisors.length}
                                      </span>
                                    </h4>
                                  </div>
                                  <div className="flex-shrink-0">
                                    <div
                                      id="total_jobs"
                                      data-colors='["--vz-success"]'
                                      className="apex-charts"
                                      dir="ltr"
                                    />
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




                <div className="card card-animate overflow-hidden m-0 adddynamictablefeilds">
                              
                              <div className="card-body" style={{ zIndex: 1 }}>
                                <div className="d-flex align-items-center">
                                  <div className="flex-grow-1 overflow-hidden">
              {/* Table */}
              <div className="table-responsive">
              <table className="table table-striped text-nowrap mb-0 fs-11px">
              <thead className="text-uppercase bg-light">
          <tr>
            <th>No.</th>
            <th>Supervisor Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map((sup, index) => (
            <tr key={sup.id}>
              <td>{index + 1}</td>
              <td>{sup.SupName}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSupervisor(sup.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
  </table>
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









              </div>
              {/*end tab-content*/}
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
      {/* container-fluid */}
    </div>
    {/* End Page-content */}
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">© CGR.</div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
            century.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  </div>
  {/* end main content*/}
  {/* END layout-wrapper */}
</>

    )
}
export default DymanicValue_AdminRight;