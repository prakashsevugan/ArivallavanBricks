import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
function WorkerTableRight() {

  const [workers, setWorkers] = useState([]);

  const navigate = useNavigate();
  // axios
  // .get("http://localhost:3001/workers")
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/workers`)
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching worker data:", error);
      });
  }, []);
  

const handleView = (empId) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  axios
    .get(`${apiUrl}/workers/${empId}`) // fetch by EmpId
    .then((response) => {
      navigate("/viewworker", { state: { worker: response.data } });
    })
    .catch((error) => {
      console.error("Error fetching worker details:", error);
    });
};



  // const handleView = (finNo) => {
  //   const apiUrl = import.meta.env.VITE_API_URL;
  //   axios
  //     .get(`${apiUrl}/workers/${finNo}`)
  //     .then((response) => {
  //       navigate("/viewworker", { state: { worker: response.data } });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching worker details:", error);
  //     });
  // };

  // filter empid
  const [empIdFilter, setEmpIdFilter] = useState("");
  const [formData, setFormData] = useState({ EmpPosition: "" });
  const [empNameFilter, setEmpNameFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");


  const filteredWorkers = workers.filter((worker) => {

    // const matchesPosition =
    //   formData.EmpPosition === "" ||
    //   worker.EmpPosition.toLowerCase() === formData.EmpPosition.toLowerCase();

    const matchesEmpId =
      empIdFilter === "" || worker.EmpId.toLowerCase().includes(empIdFilter.toLowerCase());

    const fullName = `${worker.FirstName} ${worker.LastName}`.toLowerCase();
    const matchesName =
      empNameFilter === "" || fullName.includes(empNameFilter.toLowerCase());

    const matchesGender =
      genderFilter === "" || worker.Gender === genderFilter;

    return matchesEmpId && matchesName && matchesGender;
  });



  useEffect(() => {
    console.log("Selected Position:", formData.EmpPosition);
  }, [formData.EmpPosition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return (
    <>
      {/* <!-- Begin page --> */}
      <div id="layout-wrapper">
        <div class="main-content">

          <div class="page-content">
            <div class="container-fluid">

              {/* <!-- start page title --> */}
              <div class="row">
                <div class="col-12">
                  <div class="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                    <h4 class="mb-sm-0">Workers Data</h4>

                    <div class="page-title-right">
                      <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Workers</a></li>
                        <li class="breadcrumb-item active">Data</li>
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
                        <div class="col-xxl-2 col-md-6">
                          <div>
                            {/* <label for="exampleInputrounded" class="form-label">Filter Input</label>
                                                    <input type="text" class="form-control rounded-pill" id="exampleInputrounded" placeholder="Enter your name" /> */}
                            <label className="form-label" htmlFor="exampleInputrounded">Filter by Emp ID</label>
                            <input type="text" class="form-control rounded-pill" id="exampleInputrounded" placeholder="Emp ID" value={empIdFilter} onChange={(e) => setEmpIdFilter(e.target.value)} />

                          </div>
                        </div>
                        <div class="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Filter by Emp Name</label>
                            <input
                              type="text"
                              className="form-control rounded-pill"
                              placeholder="Emp Name"
                              value={empNameFilter}
                              onChange={(e) => setEmpNameFilter(e.target.value)}
                            />
                          </div>
                        </div>
                       


                        <div class="col-xxl-2 col-md-6 my-auto">
                          <div className="">
                          <button class="btn btn-danger material-shadow-none"  onClick={() => {
    setFormData((prev) => ({ ...prev, EmpPosition: "" }));
    setEmpIdFilter("");
    setEmpNameFilter(""); // assuming you have this state
    setGenderFilter("");
  }}><i class="ri-filter-2-line me-1 align-bottom"></i>Clear Filters</button>
                          </div>
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
                                      Total Workers
                                    </p>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                      <span className="counter-value" data-target={36894}>
                                      {filteredWorkers.length}
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


              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header">
                                            <h5 className="card-title mb-0">Workers Data</h5>
                                        </div> */}
                    <div className="card-body">
                      <table
                        id="example"
                        className="table table-bordered dt-responsive nowrap table-striped align-middle"
                        style={{ width: "100%" }}
                      >
                        <thead className="bg-light">
                          <tr>
                            <th data-ordering="false">No.</th>
                            <th data-ordering="false">Emp ID</th>
                            {/* <th data-ordering="false">Emp Position</th> */}
                            <th data-ordering="false">Name</th>
                            {/* <th data-ordering="false">FIN No</th> */}
                            <th data-ordering="false">View</th>
                            {/* <th>Assigned To</th>
                                                        <th>Created By</th>
                                                        <th>Create Date</th>
                                                        <th>Status</th>
                                                        <th>Priority</th>
                                                        <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredWorkers.length === 0 ? (
                            <tr>
                              <td colSpan="9" className="text-center py-3">
                                <Icon icon="mdi:account-off-outline" className="fs-48px text-muted" /><br></br>
                                No Employee Record
                              </td>
                            </tr>
                          ) : (
                            filteredWorkers.map((worker, index) => (
                              <tr key={worker.Id}>
                                <td>{index + 1}</td>
                                <td>{worker.EmpId}</td>
                                {/* <td>{worker.EmpPosition}</td> */}
                                <td>
                                  {worker.FirstName} {worker.LastName}
                                </td>
                                {/* <td>{worker.ContNum}</td> */}
                                {/* <td>{worker.FinNo}</td> */}
                                {/* <td>{worker.SelectFeilds}</td> */}
                                {/* <td>{worker.Gender}</td> */}
                                {/* <td> <span
                        className="btn btn-sm border p-0 px-3"
                        onClick={() => handleView(worker.FinNo)}
                        style={{ cursor: "pointer" }}
                      >
                        View
                      </span></td> */}
                                <td>
<span
  className="badge bg-info-subtle text-info"
  onClick={() => handleView(worker.EmpId)} // use EmpId
  style={{ cursor: "pointer" }}
>
  <i className="ri-eye-fill align-bottom me-2" />
  View
</span>


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
    </>

  )
}
export default WorkerTableRight;

{/* <tr>

<td>14</td>
<td>VLZ-467</td>
<td>VLZ1400090324</td>
<td>
    <a href="#!">Make a creating an account profile</a>
</td>
<td>Edwin</td>
<td>Admin</td>
<td>Edwin</td>
<td>05 April, 2022</td>
<td>
    <span className="badge bg-warning-subtle text-warning">
        Inprogress
    </span>
</td>
<td>
    <span className="badge bg-success">Low</span>
</td>
<td>
    <span className="badge bg-info-subtle text-info">
        <i className="ri-eye-fill align-bottom me-2" />
        View
    </span>
</td>
</tr> */}