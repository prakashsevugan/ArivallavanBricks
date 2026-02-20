import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function AttananceRecordsRight() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [empIdFilter, setEmpIdFilter] = useState("");
  const [empNameFilter, setEmpNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(moment().format("YYYY-MM-DD"));
  const [statusFilter, setStatusFilter] = useState("ShowAll");
  const [editRecordId, setEditRecordId] = useState(null);
  const [editValues, setEditValues] = useState({ Shift: "", Remarks: "", Status: "" });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:3001/workerAttendance");
      setAttendanceData(res.data);
    } catch (err) {
      console.error("Error fetching attendance data:", err);
    }
  };

  const clearFilters = () => {
    setEmpIdFilter("");
    setEmpNameFilter("");
    setDateFilter(moment().format("YYYY-MM-DD"));
    setStatusFilter("ShowAll");
  };

  const handleEditClick = (record) => {
    setEditRecordId(record.id);
    setEditValues({
      Shift: record.Shift,
      Remarks: record.Remarks,
      Status: record.Status,
    });
  };

  const handleSaveClick = async (id) => {
    try {
      await axios.put(`http://localhost:3001/workerAttendance/${id}`, editValues);
      fetchAttendance();
      setEditRecordId(null);
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const handleCancelClick = () => {
    setEditRecordId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const filteredData = attendanceData.filter((item) => {
    const matchesEmpId = item.EmpId.toLowerCase().includes(empIdFilter.toLowerCase());
    const matchesName = item.WorkerName.toLowerCase().includes(empNameFilter.toLowerCase());
    const matchesDate =
      item.AttendanceDate === dateFilter ||
      item.AttendanceDate === moment(dateFilter).format("DD-MM-YYYY");
    const matchesStatus =
      statusFilter === "ShowAll" ? true : item.Status === statusFilter;

    return matchesEmpId && matchesName && matchesDate && matchesStatus;
  });

  return (
    // <div className="container-fluid mt-4">
    //   <h4 className="mb-4">🧾 Worker Attendance Records</h4>






    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">










            {/* Page Title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                  <h4 className="mb-sm-0">Attanance Records</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="#">Attanance</a></li>
                      <li className="breadcrumb-item active">Data</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card card-animate overflow-hidden">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empIdInput" className="form-label">Enter Date</label>
          <input
            type="date"
            className="form-control rounded-pill"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
             style={{ cursor: "pointer" }}
          />
                      </div>
                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empIdInput" className="form-label">Filter by Emp Id</label>
             <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Filter by Emp ID"
            value={empIdFilter}
            onChange={(e) => setEmpIdFilter(e.target.value)}
          />
                      </div>

                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empNameInput" className="form-label">Filter by Emp Name</label>

             <input
            type="text"
             className="form-control rounded-pill"
            placeholder="Enter Worker Name"
            value={empNameFilter}
            onChange={(e) => setEmpNameFilter(e.target.value)}
          />
                      </div>



        {/* Status Radio */}
        {/* <div className="col-xxl-2 col-md-6 d-flex gap-2"> */}
            <div class="col-xxl-2 col-md-6 d-flex gap-2 my-auto">
          <div>
            <input
              type="radio"
              id="showAll"
              name="statusFilter"
              value="ShowAll"
              checked={statusFilter === "ShowAll"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <label htmlFor="showAll" className="ms-1">All</label>
          </div>
          <div>
            <input
              type="radio"
              id="present"
              name="statusFilter"
              value="Present"
              checked={statusFilter === "Present"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <label htmlFor="present" className="ms-1 text-success">Present</label>
          </div>
          <div>
            <input
              type="radio"
              id="absent"
              name="statusFilter"
              value="Absent"
              checked={statusFilter === "Absent"}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <label htmlFor="absent" className="ms-1 text-danger">Absent</label>
          </div>
        </div>

        <div class="col-xxl-2 col-md-6 my-auto">
          <button className="btn btn-danger material-shadow-none" onClick={clearFilters}>
            <i className="ri-filter-2-line me-1 align-bottom"></i>
            Clear Filters
          </button>

        </div>

                                            {/* <div className="col-xxl-2 col-md-6">


                      </div> */}

                        {/* <div class="col-xxl-1 col-md-6">
                          <div className="">

                          </div>
                          </div> */}

                      <div className="col-xxl-2 col-md-6">
                        <div className="card card-animate overflow-hidden m-0 border">
                          <div className="position-absolute start-0" style={{ zIndex: 0 }}>
                            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width={200} height={120}>
                              <style>{`.s0 {opacity:.11; fill: var(--vz-success)}`}</style>
                              <path className="s0" d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z" />
                            </svg>
                          </div>
                          <div className="card-body" style={{ zIndex: 1 }}>
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-3">Total Workers</p>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-0">{filteredData.length}</h4>
                              </div>
                              <div className="flex-shrink-0">
                                <div id="total_jobs" className="apex-charts" dir="ltr"></div>
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



      {/* Table */}
      <div className="card">
        <div className="card-body">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>Emp ID</th>
                <th>Worker Name</th>
                <th>Shift</th>
                <th>Attendance Date</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((worker, index) => (
                  <tr
                    key={worker.id}
                    style={{
                      backgroundColor:
                        worker.Status === "Present"
                          ? "#d4edda"
                          : worker.Status === "Absent"
                          ? "#f8d7da"
                          : "",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{worker.EmpId}</td>
                    <td>{worker.WorkerName}</td>
                    <td>
                      {editRecordId === worker.id ? (
                        <input
                          type="text"
                          name="Shift"
                          value={editValues.Shift}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        worker.Shift
                      )}
                    </td>
                    <td>{worker.AttendanceDate}</td>
                    <td>
                      {editRecordId === worker.id ? (
                        <input
                          type="text"
                          name="Remarks"
                          value={editValues.Remarks}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        worker.Remarks
                      )}
                    </td>
                    <td>
                      {editRecordId === worker.id ? (
                        <select
                          name="Status"
                          value={editValues.Status}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Leave">Leave</option>
                        </select>
                      ) : (
                        <span
                          className={
                            worker.Status === "Present"
                              ? "badge bg-success"
                              : worker.Status === "Absent"
                              ? "badge bg-danger"
                              : "badge bg-secondary"
                          }
                        >
                          {worker.Status}
                        </span>
                      )}
                    </td>
                    <td>
                      {editRecordId === worker.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-1"
                            onClick={() => handleSaveClick(worker.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditClick(worker)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default AttananceRecordsRight;
