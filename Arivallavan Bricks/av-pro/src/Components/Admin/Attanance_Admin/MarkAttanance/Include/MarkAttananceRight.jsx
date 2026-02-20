import React, { useState, useEffect, useRef} from "react";
import axios from "axios";

function MarkAttananceRight() {
  const [workers, setWorkers] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [empFinNoFilter, setEmpFinNoFilter] = useState("");
  const [empNameFilter, setEmpNameFilter] = useState("");
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [popups, setPopups] = useState([]);

  // Fetch workers and attendance
  useEffect(() => {
    fetchWorkers();
    fetchAttendance();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/workers");
      setWorkers(res.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:3001/worker-attendance");
      setAttendanceData(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  // Convert Date to dd-mm-yyyy
  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Check if worker is already marked
  // const isWorkerMarked = (empId) => {
  //   if (!attendanceDate) return false;
  //   return attendanceData.some(
  //     (a) =>
  //       a.EmpId === empId &&
  //       a.AttendanceDate === formatDateToDDMMYYYY(attendanceDate)
  //   );
  // };

  // Filter workers
  const filteredWorkers = workers.filter(
    (worker) =>
      worker.EmpId.toLowerCase().includes(empFinNoFilter.toLowerCase()) &&
      `${worker.FirstName} ${worker.LastName}`
        .toLowerCase()
        .includes(empNameFilter.toLowerCase())
  );

  // Checkbox select
  const handleCheckboxChange = (empId) => {
    if (!attendanceDate) {
      showPopup("Please select a date first.", "error");
      return;
    }

    if (isWorkerMarked(empId)) {
      showPopup(
        `Attendance for ${formatDateToDDMMYYYY(
          attendanceDate
        )} has already been marked for this worker!`,
        "error"
      );
      return;
    }

    const alreadySelected = selectedWorkers.some((w) => w.EmpId === empId);
    setSelectedWorkers((prev) => {
      if (alreadySelected) {
        return prev.filter((w) => w.EmpId !== empId);
      } else {
        const worker = workers.find((w) => w.EmpId === empId);
        return [...prev, { ...worker, Shift: "", Remarks: "", Status: "Present" }];
      }
    });
  };

  // Input change for shift and remarks
  const handleInputChange = (empId, field, value) => {
    setSelectedWorkers((prev) =>
      prev.map((w) => (w.EmpId === empId ? { ...w, [field]: value } : w))
    );
  };

  // Popup message
  const showPopup = (message, type) => {
    const id = Date.now();
    setPopups((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 3000);
  };

  // Select all
  const handleSelectAll = (checked) => {
    if (!attendanceDate) {
      showPopup("Please select a date first.", "error");
      return;
    }

    if (checked) {
      const newSelected = filteredWorkers
        .filter((w) => !isWorkerMarked(w.EmpId))
        .map((w) => ({ ...w, Shift: "", Remarks: "", Status: "Present" }));
      setSelectedWorkers(newSelected);
    } else {
      setSelectedWorkers([]);
    }
  };

  // Submit attendance
const handleSubmit = async () => {
  if (!attendanceDate) {
    showPopup("Please select a date first.", "error");
    return;
  }

  if (selectedWorkers.length === 0) {
    showPopup("Please select at least one worker.", "error");
    return;
  }

  // Check shift for all selected workers
  const missingShift = selectedWorkers.some((w) => !w.Shift);
  if (missingShift) {
    showPopup("Please select shift for all selected workers.", "error");
    return;
  }

  // Optional: check for duplicate selection in UI
  const hasDuplicateInSelection = () => {
    const empIds = selectedWorkers.map((w) => w.EmpId);
    return new Set(empIds).size !== empIds.length;
  };
  if (hasDuplicateInSelection()) {
    showPopup("You have selected the same worker multiple times!", "error");
    return;
  }

  // Format date to dd-mm-yyyy for backend
  const formattedDate = formatDateToDDMMYYYY(attendanceDate);

  const attendanceDataToPost = selectedWorkers.map((w) => ({
    EmpId: w.EmpId,
    WorkerName: `${w.FirstName} ${w.LastName}`,
    Shift: w.Shift,
    AttendanceDate: formattedDate,
    Remarks: w.Remarks || "",
    Status: w.Status,
  }));

  try {
    // Send to backend
    const res = await axios.post("http://localhost:3001/worker-attendance", {
      attendanceData: attendanceDataToPost,
    });

    const { markedWorkers, duplicateWorkers } = res.data;

    // Show success for newly marked workers
    if (markedWorkers.length > 0) {
      showPopup(
        `Attendance marked successfully for: ${markedWorkers.join(", ")}`,
        "success"
      );
    }

    // Show error for already marked workers
    if (duplicateWorkers.length > 0) {
      showPopup(
        `Already marked for: ${duplicateWorkers.join(", ")}`,
        "error"
      );
    }

    // Reset selection and refresh attendance table
    setSelectedWorkers([]);
    fetchAttendance();
  } catch (err) {
    console.error("Error saving attendance:", err);
    showPopup("Error saving attendance.", "error");
  }
};



  // Check if worker is already marked
const isWorkerMarked = (empId) => {
  if (!attendanceDate) return false;

  // Format selected date as yyyy-mm-dd for comparison
  const selectedDate = new Date(attendanceDate).toISOString().split("T")[0];

  return attendanceData.some(
    (a) =>
      a.EmpId === empId &&
      new Date(a.AttendanceDate).toISOString().split("T")[0] === selectedDate
  );
};



  // const [attendanceDate, setAttendanceDate] = useState("");
  const dateInputRef = useRef(null);

  // Set default date to current date when the component loads
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setAttendanceDate(today);
  }, []);

  // Function to open the date picker when input is clicked anywhere
  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // supported in modern browsers
    }
  };

  return (
    <>


      {/* Popups */}
      {popups.map((popup) => (
        <div
          key={popup.id}
          style={{
            position: "fixed",
            top: `${20 + popups.indexOf(popup) * 50}px`,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: popup.type === "success" ? "#28a745" : "#DD3C3C",
            color: "white",
            padding: "10px 20px",
            borderRadius: "6px",
            zIndex: 9999,
          }}
        >
          {popup.message}
        </div>
      ))}


    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">

            {/* Page Title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                  <h4 className="mb-sm-0">Mark Attanance</h4>
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
                        {<div onClick={handleClick}>
      <input
        type="date"
        ref={dateInputRef}
        className="form-control rounded-pill"
        value={attendanceDate}
        onChange={(e) => setAttendanceDate(e.target.value)}
        style={{ cursor: "pointer" }}
      />
    </div>}
                      </div>
                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empIdInput" className="form-label">Filter by Emp Id</label>
                        <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Filter by Emp ID"
              value={empFinNoFilter}
              onChange={(e) => setEmpFinNoFilter(e.target.value)}
            />
                      </div>

                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empNameInput" className="form-label">Filter by Emp Name</label>
                       <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Filter by Name"
              value={empNameFilter}
              onChange={(e) => setEmpNameFilter(e.target.value)}
            />
                      </div>



                       <div class="col-xxl-2 col-md-6 my-auto">
                          <div className="">
                        <button
  className="btn btn-danger material-shadow-none"
  onClick={() => {
    setEmpFinNoFilter('');
    setEmpNameFilter('');
    setSelectedSite('');
  }}
>
  <i className="ri-filter-2-line me-1 align-bottom"></i>
  Clear Filters
</button>
                      </div>
                      </div>

                                            {/* <div className="col-xxl-2 col-md-6">


                      </div> */}

                        <div class="col-xxl-1 col-md-6">
                          <div className="">

                          </div>
                          </div>

                      <div className="col-xxl-3 col-md-6">
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
                                <h4 className="fs-22 fw-semibold ff-secondary mb-0">{filteredWorkers.length}</h4>
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">

                     <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Emp Details ...</h4>

                    <div className="flex-shrink-0">
                    
                        <div className="bg-primary-subtle p-2 rounded">
                          {/* selected Worker's :<strong> {selectedTaskKeys.length}</strong> */}
                                                 <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedWorkers.length === 0}
          >
            Mark Attendance
          </button>
                        </div>
                   
                    </div>
                  </div>
                    <div className="card-body">
                      <table className="table table-bordered dt-responsive nowrap table-striped align-middle" style={{ width: "100%" }}>
                        <thead className="bg-light">
                          <tr>

                            <th>
                               <input
                  type="checkbox"
                  checked={
                    filteredWorkers.length > 0 &&
                    filteredWorkers.every(
                      (w) =>
                        selectedWorkers.some((sw) => sw.EmpId === w.EmpId) ||
                        isWorkerMarked(w.EmpId)
                    )
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                            </th>
                           <th>No.</th>
              <th>Emp ID</th>
              <th>Worker Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Shift</th>
              <th>Remarks</th>
              <th>Status</th>
                          </tr>
                        </thead>
                      <tbody>
            {filteredWorkers.map((worker, index) => {
              const marked = isWorkerMarked(worker.EmpId);
              const selected = selectedWorkers.some(
                (w) => w.EmpId === worker.EmpId
              );
              const selectedData = selectedWorkers.find(
                (w) => w.EmpId === worker.EmpId
              );

              return (
             <tr
  key={worker.id}
  style={{
    backgroundColor: (() => {
      // 1️⃣ Get the selected status (before submit)
      const selectedStatus = selectedData?.Status?.toLowerCase();

      // 2️⃣ Get the submitted status (after submit)
      const submittedStatus = attendanceData.find(
        (a) =>
          a.EmpId === worker.EmpId &&
          new Date(a.AttendanceDate).toISOString().split("T")[0] ===
            new Date(attendanceDate).toISOString().split("T")[0]
      )?.Status?.toLowerCase();

      // 3️⃣ Priority: selected > submitted > none
      const status = selectedStatus || submittedStatus;

      if (status === "absent") return "#f8d7da"; // light red
      if (status === "present") return "#d4edda"; // light green
      return "transparent";
    })(),
    color: (() => {
      const selectedStatus = selectedData?.Status?.toLowerCase();
      const submittedStatus = attendanceData.find(
        (a) =>
          a.EmpId === worker.EmpId &&
          new Date(a.AttendanceDate).toISOString().split("T")[0] ===
            new Date(attendanceDate).toISOString().split("T")[0]
      )?.Status?.toLowerCase();

      const status = selectedStatus || submittedStatus;

      if (status === "absent") return "#721c24";
      if (status === "present") return "#155724";
      return "black";
    })(),
  }}
>



                  <td>
                    <input
                      type="checkbox"
                      disabled={marked}
                      checked={selected || marked}
                      onChange={() => handleCheckboxChange(worker.EmpId)}
                    />
                  </td>

                  <td>{index + 1}</td>
                  <td>{worker.EmpId}</td>
                  <td>{worker.FirstName} {worker.LastName}</td>
                  <td>{worker.Gender}</td>
                  <td>{worker.DOB}</td>
                  <td>
                   {selected ? (
                      <select
                        className="form-select form-select-sm"
                        value={selectedData?.Shift || ""}
                        onChange={(e) =>
                          handleInputChange(worker.EmpId, "Shift", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Morning">Morning</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                      </select>
                    ) : marked ? (
    // If already marked, get the shift from attendanceData
    attendanceData.find(
      (a) =>
        a.EmpId === worker.EmpId &&
        new Date(a.AttendanceDate).toISOString().split("T")[0] ===
          new Date(attendanceDate).toISOString().split("T")[0]
    )?.Shift || "-"
  ) : (
                      "-"
                    )}

                  </td>
                  <td>
                    {selected ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Remarks"
                        value={selectedData?.Remarks || ""}
                        onChange={(e) =>
                          handleInputChange(worker.EmpId, "Remarks", e.target.value)
                        }
                      />
                    ) : (
                      "-"
                    )}
                  </td>







<td
  style={{
    backgroundColor: (() => {
      // Check current selected status
      const selectedStatus = selectedData?.Status?.toLowerCase();

      // Check submitted (saved) status from attendanceData
      const submittedStatus = attendanceData.find(
        (a) =>
          a.EmpId === worker.EmpId &&
          new Date(a.AttendanceDate).toISOString().split("T")[0] ===
            new Date(attendanceDate).toISOString().split("T")[0]
      )?.Status?.toLowerCase();

      const status = selectedStatus || submittedStatus;

      if (status === "absent") return "#f8d7da"; // light red
      if (status === "present") return "#d4edda"; // light green
      return "transparent";
    })(),
    color: (() => {
      const selectedStatus = selectedData?.Status?.toLowerCase();
      const submittedStatus = attendanceData.find(
        (a) =>
          a.EmpId === worker.EmpId &&
          new Date(a.AttendanceDate).toISOString().split("T")[0] ===
            new Date(attendanceDate).toISOString().split("T")[0]
      )?.Status?.toLowerCase();

      const status = selectedStatus || submittedStatus;

      if (status === "absent") return "#721c24";
      if (status === "present") return "#155724";
      return "black";
    })(),
    fontWeight: "bold",
  }}
>
                   {selected ? (
                      <select
                        className="form-select form-select-sm"
                        value={selectedData?.Status || ""}
                        onChange={(e) =>
                          handleInputChange(worker.EmpId, "Status", e.target.value)
                        }
                      >
                        <option value="">Select</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
                      </select>
                    ) : marked ? (
    // If already marked, get the shift from attendanceData
    attendanceData.find(
      (a) =>
        a.EmpId === worker.EmpId &&
        new Date(a.AttendanceDate).toISOString().split("T")[0] ===
          new Date(attendanceDate).toISOString().split("T")[0]
    )?.Status || "-"
  ) : (
                      "-"
                    )}

                  </td>



                </tr>
              );
            })}
          </tbody>

                      </table>
                      <div className=" text-end">

                        <div className="d-flex justify-content-end">
                       {/* <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedWorkers.length === 0}
          >
            Mark Attendance
          </button> */}
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
    </>
  );
}

export default MarkAttananceRight;
