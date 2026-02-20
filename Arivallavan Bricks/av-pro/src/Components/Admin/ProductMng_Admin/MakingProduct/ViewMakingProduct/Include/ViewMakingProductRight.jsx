import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

function ViewMakingProductRight() {

  const navigate = useNavigate();
  const [makingProducts, setMakingProducts] = useState([]);
  const [filteredMakingProducts, setFilteredMakingProducts] = useState([]);

  const [productType, setProductType] = useState("");
  const [productDate, setProductDate] = useState("");
  const [sessionType, setSessionType] = useState("");

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

const handleEdit = (item) => {
  setEditRowId(item.id);
  setEditData({
    ...item,
    ProductDate: item.ProductDate?.slice(0, 10) // FIX DATE FORMAT
  });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditData(prev => ({ ...prev, [name]: value }));
};


const handleUpdate = async () => {
  try {
    const updatedRow = {
      ...editData,
      id: editRowId
    };

    await axios.put(
      `http://localhost:3001/making-products/${editRowId}`,
      updatedRow
    );

    setMakingProducts(prev =>
      prev.map(item =>
        item.id === editRowId ? updatedRow : item
      )
    );

    setFilteredMakingProducts(prev =>
      prev.map(item =>
        item.id === editRowId ? updatedRow : item
      )
    );

    setEditRowId(null);
    setEditData({});
  } catch (err) {
    console.error(err);
  }
};



const handleCancel = () => {
  setEditRowId(null);
};



  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios.get("http://localhost:3001/making-products")
      .then(res => {
        setMakingProducts(res.data);
        setFilteredMakingProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  /* ================= FILTER ================= */
useEffect(() => {
  let data = makingProducts;

  if (productType) {
    data = data.filter(i => i.ProductType === productType);
  }

  if (productDate) {
    data = data.filter(i =>
      i.ProductDate?.slice(0, 10) === productDate
    );
  }

  if (sessionType) {
    data = data.filter(i => i.SessionType === sessionType);
  }

  setFilteredMakingProducts(data);
}, [productType, productDate, sessionType, makingProducts]);


const clearFilters = () => {
  setProductType("");
  setProductDate("");
  setSessionType("");
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
                            <label className="form-label" htmlFor="exampleInputrounded">Product Type</label>
                           <select className="form-control rounded-pill form-label"
            value={productType}
            onChange={e => setProductType(e.target.value)}
          >
            <option value="" className="">All</option>
            <option value="Flyash Bricks">Flyash Bricks</option>
            <option value="Hallo Block">Hallo Block</option>
          </select>
                          </div>
                        </div>
                        <div class="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Product Date</label>
                            
                             <input
            type="date"
            className="form-control rounded-pill"
            value={productDate}
            onChange={e => setProductDate(e.target.value)}
          />
                          </div>
                        </div>

                        <div class="col-xxl-2 col-md-6">
                          <div>
                            <label className="form-label" htmlFor="exampleFormControlInput1">Session Type</label>
                            
                            <select
            className="form-control rounded-pill form-label"
            value={sessionType}
            onChange={e => setSessionType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
                          </div>
                        </div>
                       


                        <div class="col-xxl-2 col-md-6 my-auto">
                          <div className="">
                          <button class="btn btn-danger material-shadow-none"  onClick={() => clearFilters()}>
                            <i class="ri-filter-2-line me-1 align-bottom"></i>Clear Filters</button>
                          </div>
                          </div>
                           <div class="col-xxl-1 col-md-6">
                  {/* empty */}
                        </div>
                        {/* <div class="col-xxl-1 col-md-6">
                          <div className="">

                          </div>
                          </div> */}

                        <div class="col-xxl-3 col-md-6">
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
          {filteredMakingProducts.length}
        </h4>
      </div>

      <div className="flex-shrink-0 text-center">
        <p className="fw-semibold text-success mb-0" onClick={() => navigate("/AddMakingProduct")}>
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
            <th>Product ID</th>
            <th>Date</th>
            <th>Product Type</th>
            <th>Session</th>
            <th>Quantity</th>
            <th>Quantity Type</th>
            <th>Cement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredMakingProducts.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                <Icon icon="mdi:database-off-outline" className="fs-48px text-muted" />
                <br /> No Records Found
              </td>
            </tr>
          ) : (
            filteredMakingProducts.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.ProductId}</td>

    <td>
  {editRowId === item.id ? (
    <input
      type="date"
      name="ProductDate"
      value={editData.ProductDate || ""}
      onChange={handleChange}
      className="form-control"
    />
  ) : (
    item.ProductDate?.slice(0, 10)
  )}
</td>


      <td>
        {editRowId === item.id ? (
          <select
            name="ProductType"
            value={editData.ProductType}
            onChange={handleChange}
            className="form-control"
          >
            <option>Flyash Bricks</option>
            <option>Hallo Block</option>
          </select>
        ) : (
          item.ProductType
        )}
      </td>

      <td>
        {editRowId === item.id ? (
          <select
            name="SessionType"
            value={editData.SessionType}
            onChange={handleChange}
            className="form-control"
          >
            <option>Morning</option>
            <option>Evening</option>
          </select>
        ) : (
          item.SessionType
        )}
      </td>

      <td>
        {editRowId === item.id ? (
          <input
            type="number"
            name="Quantity"
            value={editData.Quantity}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          item.Quantity
        )}
      </td>

      <td>
        {editRowId === item.id ? (
          <select
            name="QuantityType"
            value={editData.QuantityType}
            onChange={handleChange}
            className="form-control"
          >
            <option>Palat</option>
            <option>pieceCount</option>
          </select>
        ) : (
          item.QuantityType
        )}
      </td>

 <td>
  {editRowId === item.id ? (
    <input
      type="number"
      name="CementType"
      value={editData.CementType || ""}
      onChange={handleChange}
      className="form-control"
      min="0"
    />
  ) : (
    item.CementType
  )}
</td>


<td style={{ width: "120px" }} className="text-center">
  {editRowId === item.id ? (
    <div className="d-flex justify-content-center gap-1 flex-nowrap">
      <button
        className="btn btn-success btn-sm px-2"
        onClick={handleUpdate}
      >
        Save
      </button>

      <button
        className="btn btn-secondary btn-sm px-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  ) : (
    <button
      className="btn btn-primary btn-sm px-3"
      onClick={() => handleEdit(item)}
    >
      Edit
    </button>
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
    </>

  )
}
export default ViewMakingProductRight;

