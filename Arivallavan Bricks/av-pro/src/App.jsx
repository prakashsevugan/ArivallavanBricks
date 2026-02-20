import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddWorkerOne from "./Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerOne/AddWorkerOne"
import AddWorkerTwo from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerTwo/AddWorkerTwo'
// import AddWorkerThree from './Components/Admin/WorkerMng_Admin/AddWorker_Admin/AddWorkerThree/AddWorkerThree'
import WorkerTable from './Components/Admin/WorkerMng_Admin/WorkerTable/WorkerTable'
import ViewWorker_Admin from './Components/Admin/WorkerMng_Admin/ViewWorker_Admin/ViewWorker_Admin'
import Login from './Components/Login/Login'
import DymanicValue_Admin from './Components/Admin/WorkerMng_Admin/DynamicValue_Admin/DynamicValue_Admin'
import ExcelUpload_Admin from './Components/Admin/WorkerMng_Admin/ExcelUpload_Admin/ExcelUpload_Admin'
// import TaskAssign from './Components/Admin/TaskMng_Admin/TaskAssign/TaskAssign'
import MarkAttanance from './Components/Admin/Attanance_Admin/MarkAttanance/MarkAttanance'
import AddMakingProduct from './Components/Admin/ProductMng_Admin/MakingProduct/AddMakingProduct/AddMakingProduct'
import AddExportProduct from './Components/Admin/ProductMng_Admin/ExportProduct/AddExportProduct/AddExportProduct'
import AttananceRecords from './Components/Admin/Attanance_Admin/AttananceRecords/AttananceRecords'
import ViewMakingProduct from './Components/Admin/ProductMng_Admin/MakingProduct/ViewMakingProduct/ViewMakingProduct'
import ViewExportProduct from './Components/Admin/ProductMng_Admin/ExportProduct/ViewExportProduct/ViewExportProduct'
import AddImportProduct from './Components/Admin/ProductMng_Admin/ImportProduct/AddImportProduct/AddImportProduct'
// import '../public/assets/css/Admin/Admin.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
{/* login */}
<Route path='/' element={<Login />} ></Route>

          {/* Admin start*/}

          {/* worker_mng start */}
          {/* AddWorker */}
          <Route path='/addworkerone' element={<AddWorkerOne />} ></Route>
          <Route path='/addworkertwo' element={<AddWorkerTwo />} ></Route>
          {/* <Route path='/addworkerthree' element={<AddWorkerThree />} ></Route> */}
          {/* worker table */}
          <Route path='/workertable' element={<WorkerTable />} ></Route>
          {/* View worker */}
          <Route path='/viewworker' element={<ViewWorker_Admin />} ></Route>
          {/* Dymanic value add */}
          <Route path='/DynamicValue' element={<DymanicValue_Admin />} ></Route>
          {/* ExcelUpload add worker*/}
          <Route path='/ExcelUpload' element={<ExcelUpload_Admin />} ></Route>

          {/* worker_mng end */}


{/* Attanance Mng start */}
<Route path='/MarkAttanance' element={<MarkAttanance />} ></Route>
<Route path='/AttananceRecords' element={<AttananceRecords />} ></Route>
{/* Attanance Mng end */}


{/* /MakingProduct Mng start */}
<Route path='/AddMakingProduct' element={<AddMakingProduct />} ></Route>
<Route path='/ViewMakingProduct' element={<ViewMakingProduct />} ></Route>
{/* /MakingProduct Mng end */}

{/* /ExportProduct Mng start */}
<Route path='/AddExportProduct' element={<AddExportProduct />} ></Route>
<Route path='/ViewExportProduct' element={<ViewExportProduct />} ></Route>
{/* /ExportProduct Mng end */}

{/* /ImportProduct Mng start */}
<Route path='/AddImportProduct' element={<AddImportProduct />} ></Route>
{/* /ImportProduct Mng end */}




           {/* Admin start*/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
