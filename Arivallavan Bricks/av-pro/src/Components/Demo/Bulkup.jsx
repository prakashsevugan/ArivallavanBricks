import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskAssignRight() {

  const [tasks, setTasks] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const [empFinNoFilter, setEmpFinNoFilter] = useState('');
  const [empNameFilter, setEmpNameFilter] = useState('');
  const [selectedSite, setSelectedSite] = useState('');

const [selectedTaskKeys, setSelectedTaskKeys] = useState([]); // Each key is `${FinNo}_${TaskId}`



  useEffect(() => {
    axios.get('http://localhost:3001/assigned-taskslist')
      .then(res => {
        console.log("API response:", res.data);
        setTasks(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const showPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage("");
      setPopupType("");
    }, 3000);
  };

  const filteredTasks = tasks.filter(task =>
    (selectedSite === '' || task.Site === selectedSite) &&
    (empFinNoFilter === '' || task.FinNo.toLowerCase().includes(empFinNoFilter.toLowerCase())) &&
    (empNameFilter === '' || `${task.FirstName} ${task.LastName}`.toLowerCase().includes(empNameFilter.toLowerCase()))
  );

  const handleApprove = async (task) => {
     const remarkKey = `${task.FinNo}_${task.TaskId}`;
    const payload = {      
   FinNo: task.FinNo, // ✅ Add this line
    TaskId: task.TaskId,
    TaskDate: task.TaskDate,
    Site: task.Site,
    TaskTitle: task.TaskTitle,
    TaskStatus: 'Approve',
    // Remark: remarks[task.TaskId] || '', 
     Remark: remarks[remarkKey] || '',
    };
    try {
      await axios.post('http://localhost:3001/taskstatusdetails/fromassigned', payload);
      showPopup('Task approved successfully!', 'success');
    } catch (error) {
      console.error('Error approving task:', error);
      showPopup('Error approving task.', 'error');
    }
  };

  const handleReject = async (task) => {
    const payload = {
      TaskId: task.TaskId,
      TaskDate: task.TaskDate,
      Site: task.Site,
      TaskTitle: task.TaskTitle,
      TaskStatus: 'Reject',
      Remark: remarks[task.TaskId] || '',
    };
    try {
      await axios.post('http://localhost:3001/taskstatusdetails/fromassigned', payload);
      showPopup('Task rejected successfully!', 'success');
    } catch (error) {
      console.error('Error rejecting task:', error);
      showPopup('Error rejecting task.', 'error');
    }
  };





   const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [remarks, setRemarks] = useState({});

const handleBulkApprove = async () => {
  if (selectedTaskKeys.length === 0) {
    showPopup('No tasks selected for approval.', 'error');
    return;
  }

  const selectedTasksData = filteredTasks
  .filter(task => selectedTaskKeys.includes(`${task.FinNo}_${task.TaskId}`))
  .map(task => ({
    FinNo: task.FinNo,
    TaskId: task.TaskId,
    TaskDate: task.TaskDate,
    Department: task.Department,
    Site: task.Site,
    TaskTitle: task.TaskTitle,
    TaskDescription: task.TaskDescription,
    TaskStatus: 'Approve',
    Remark: remarks[`${task.FinNo}_${task.TaskId}`] || ''
  }));

console.log('Selected tasks data:', selectedTasksData);


  try {
    await axios.post('http://localhost:3001/bulk', {
      tasks: selectedTasksData
    });

    showPopup('Selected tasks approved successfully!', 'success');
    setSelectedTaskKeys([]); // clear selection
  } catch (error) {
    console.error("Bulk approval error:", error);
    showPopup('Error approving selected tasks.', 'error');
  }
};



  return (
    <>
     {/* Popup message at very top */}
    {popupMessage && (
      <div style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: popupType === "success" ? "#28a745" : "#DD3C3C",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        zIndex: 9999, // Make sure it's above everything
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
      }}>
        {popupMessage}
      </div>
    )}



    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">

            {/* Page Title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                  <h4 className="mb-sm-0">Task Approval</h4>
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="#">Task</a></li>
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
                        <label htmlFor="empIdInput" className="form-label">Filter by Emp FinNo</label>
                        <input
  type="text"
  className="form-control rounded-pill"
  id="EmpFinNo"
  placeholder="Emp FinNo"
  value={empFinNoFilter}
  onChange={(e) => setEmpFinNoFilter(e.target.value)}
/>
                      </div>

                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empNameInput" className="form-label">Filter by Emp Name</label>
                        <input
  type="text"
  className="form-control rounded-pill"
  id="empNameInput"
  placeholder="Emp Name"
  value={empNameFilter}
  onChange={(e) => setEmpNameFilter(e.target.value)}
/>
                      </div>

                      <div className="col-xxl-2 col-md-6">
                        <label htmlFor="empPositionSelect" className="form-label">Filter by Site</label>
                      <select
  className="form-select rounded-pill"
  id="empPositionSelect"
  value={selectedSite}
  onChange={(e) => setSelectedSite(e.target.value)}
>
  <option value="">Select Site</option>
  <option value="Site 1">Site 1</option>
  <option value="Site 2">Site 2</option>
</select>

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
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-3">Assigned Workers</p>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-0">{filteredTasks.length}</h4>
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
                    <h4 className="card-title mb-0 flex-grow-1">Task Details ...</h4>

                    <div className="flex-shrink-0">
                    
                        <div className="bg-primary-subtle p-2 rounded">
                          selected Worker's :<strong> {selectedTaskIds.length}</strong>
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
    filteredTasks.length > 0 &&
    selectedTaskKeys.length === filteredTasks.length
  }
  onChange={(e) => {
    if (e.target.checked) {
      setSelectedTaskKeys(filteredTasks.map(task => `${task.FinNo}_${task.TaskId}`));
    } else {
      setSelectedTaskKeys([]);
    }
  }}
/>


        </th>
    <th>No.</th>
    <th>Emp FinNo</th>
    <th>Task Title</th>
    <th>Site</th>
    <th>Task Date</th>
    <th>Worker Name</th>
    <th>Action</th>
    <th>Remarks</th>
  </tr>
</thead>
<tbody>
   {filteredTasks.map((task, index) => (
      <tr key={`${task.FinNo}-${task.TaskId}`}>

             
          <td>
        <input
  type="checkbox"
  checked={selectedTaskKeys.includes(`${task.FinNo}_${task.TaskId}`)}
  onChange={() => {
    const key = `${task.FinNo}_${task.TaskId}`;
    setSelectedTaskKeys(prev => {
      return prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key];
    });
  }}
/>


        </td>
 

      <td>{index + 1}</td>
      <td>{task.FinNo}</td>
      <td>{task.TaskTitle}</td>
      <td>{task.Site}</td>
      <td>{task.TaskDate}</td>
      <td>{task.FirstName} {task.LastName}</td>
  
<td>
  <button
    className="btn btn-success btn-sm me-2"
    onClick={() => handleApprove(task)}
  >
    Approve
  </button>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleReject(task)}
  >
    Reject
  </button>
</td>


   
      <td>
      
<input
  type="text"
  className="form-control rounded-pill p-1 px-2"
  placeholder="Remarks"
  value={remarks[`${task.FinNo}_${task.TaskId}`] || ""}
  onChange={(e) =>
    setRemarks({ ...remarks, [`${task.FinNo}_${task.TaskId}`]: e.target.value })
  }
/>


      </td>
    </tr>
  ))}
</tbody>

                    </table>
                    <div className=" text-end">
                
        <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleBulkApprove}>
  Multiple Selected
</button>

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

export default TaskAssignRight;
