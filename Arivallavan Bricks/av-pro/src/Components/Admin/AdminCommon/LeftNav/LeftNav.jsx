import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavLogo from '../../../../../public/assets/img/Logo/logo2.png';
import '../../../../../public/assets/css/Common/LeftNav.css';  // Make sure to add the CSS file for custom styles
import 'bootstrap-icons/font/bootstrap-icons.css';

function LeftNav() {
  // State to keep track of which menu is open
  // const [activeMenu, setActiveMenu] = useState('workers');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  
const location = useLocation();
  // Toggle menu function to open/close submenus
  // const toggleMenu = (menu) => {
  //   setActiveMenu((prevMenu) => (prevMenu === menu ? '' : menu));
  // };
  const toggleMenu = (menu) => {
  setActiveMenu(prevMenu => (prevMenu === menu ? '' : menu));
};


// Detect which menu should be active based on the current route
const getActiveMenuFromPath = (path) => {
  if (['/addworkerone', '/workertable', '/DynamicValue', '/ExcelUpload'].includes(path)) {
    return 'workers';
  }
  if (['/TaskAssign'].includes(path)) {
    return 'Task';
  }
  if (['/MakingProduct', '/ExportProduct'].includes(path)) { // Replace with your makingProduct routes
    return 'makingProduct';
  }
  return ''; // Default to no active menu
};

const [activeMenu, setActiveMenu] = useState(getActiveMenuFromPath(location.pathname));


useEffect(() => {
  const menu = getActiveMenuFromPath(location.pathname);
  setActiveMenu(menu);
}, [location.pathname]);





  return (
    <>
      {/* Begin page */}
      <div id="layout-wrapper">

        {/* ========== App Menu ========== */}
        <div className="app-menu navbar-menu navbg">
          {/* LOGO */}
          <div className="navbar-brand-box pt-1">
            <a href="#" className="logo logo-light">
              <span className="logo-sm">
                <img src={NavLogo} alt="AV" height={65} className="p-0" />
              </span>
              <span className="logo-lg py-4 px-3 bg-white rounded rounded-4">
                <img src={NavLogo} alt="Av" height={65} className="p-0 rounded rounded-4" />
              </span>
            </a>
          </div>

          <div id="scrollbar" className="leftnavmenu simplebar-content-wrapper p-0 m-0" aria-label="scrollable content">
            <div className="container-fluid p-0">
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <li className="menu-title">
                  <span data-key="t-menu">Menu</span>
                </li>

                {/* Workers Management Menu */}
                {/* Workers Management Menu */}
<li className="nav-item">
  <Link
    to=""
    className={`nav-link menu-link ${activeMenu === 'workers' ? 'active' : ''}`}
    onClick={() => toggleMenu('workers')}
    aria-expanded={activeMenu === 'workers'}
  >
    <div className="menu-content">
      <div className="icon-text">
        <i className="bi bi-person-gear"></i>
        <span data-key="t-multi-level">Workers Mng</span>
      </div>
      <i className="ri-arrow-right-s-line arrow-icon" />
    </div>
  </Link>

  <div className={`menu-dropdown ${activeMenu === 'workers' ? 'show' : ''}`}>
    <ul className="nav nav-sm flex-column">
      <li className="nav-item">
        <Link
          to="/addworkerone"
          className={`nav-link ${location.pathname === '/addworkerone' ? 'active-sub' : ''}`}
        >
          Add Worker
        </Link>
        <Link
          to="/workertable"
          className={`nav-link ${location.pathname === '/workertable' ? 'active-sub' : ''}`}
        >
          Worker Table
        </Link>
        <Link
          to="/DynamicValue"
          className={`nav-link ${location.pathname === '/DynamicValue' ? 'active-sub' : ''}`}
        >
          Dynamic Value
        </Link>
        <Link
          to="/ExcelUpload"
          className={`nav-link ${location.pathname === '/ExcelUpload' ? 'active-sub' : ''}`}
        >
          Excel Upload
        </Link>
      </li>
    </ul>
  </div>
</li>

{/* Attanance Management Menu */}
<li className="nav-item">
  <Link
    to=""
    className={`nav-link menu-link ${activeMenu === 'Task' ? 'active' : ''}`}
    onClick={() => toggleMenu('Task')}
    aria-expanded={activeMenu === 'Task'}
  >
    <div className="menu-content">
      <div className="icon-text">
        <i className="bi bi-clipboard-check"></i>
        <span data-key="t-multi-level">Attanance Mng</span>
      </div>
      <i className="ri-arrow-right-s-line arrow-icon" />
    </div>
  </Link>

  <div className={`menu-dropdown ${activeMenu === 'Task' ? 'show' : ''}`}>
    <ul className="nav nav-sm flex-column">
      <li className="nav-item">
        <Link
          to="/AttananceRecords"
          className={`nav-link ${location.pathname === '/AttananceRecords' ? 'active-sub' : ''}`}
        >
          Attanance Records
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/MarkAttanance"
          className={`nav-link ${location.pathname === '/MarkAttanance' ? 'active-sub' : ''}`}
        >
          Mark Attanance
        </Link>
      </li>
    </ul>
  </div>
</li>


                {/* makingProduct management Menu */}
                <li className="nav-item">

                  <Link to=''
                    className={`nav-link menu-link ${activeMenu === 'makingProduct' ? 'active' : ''}`}
                    href="#makingProductmng"
                    onClick={() => toggleMenu('makingProduct')}
                    aria-expanded={activeMenu === 'makingProduct'}
                  >
                    <div className="menu-content">
                      <div className="icon-text">
                      <i className="bi bi-stack"></i>
                        <span data-key="t-multi-level">Product Mng</span>
                      </div>
                      <i className="ri-arrow-right-s-line arrow-icon" />
                    </div>
                  </Link>

                  <div className={`menu-dropdown ${activeMenu === 'makingProduct' ? 'show' : ''}`} id="makingProductmng">
                    <ul className="nav nav-sm flex-column">
                      <li className="nav-item">
                            <Link
          to="/ViewMakingProduct"
          className={`nav-link ${location.pathname === '/MakingProduct' ? 'active-sub' : ''}`}
        >
         Making Product
        </Link>
                      </li>
                      <li className="nav-item">
                            <Link
          to="/ViewExportProduct"
          className={`nav-link ${location.pathname === '/ExportProduct' ? 'active-sub' : ''}`}
        >
         Export Product
        </Link>
                      </li>
                      <li className="nav-item">
                            <Link
          to="/AddImportProduct"
          className={`nav-link ${location.pathname === 'ImportProduct' ? 'active-sub' : ''}`}
        >
         Import Product
        </Link>
                      </li>
                    </ul>
                  </div>
                </li>




                 {/* tools management Menu */}
                 <li className="nav-item">

<Link to=''
  className={`nav-link menu-link ${activeMenu === 'tools' ? 'active' : ''}`}
  href="#toolsmng"
  onClick={() => toggleMenu('tools')}
  aria-expanded={activeMenu === 'tools'}
>
  <div className="menu-content">
    <div className="icon-text">
    <i className="bi bi-wrench"></i>
      <span data-key="t-multi-level">Tools Mng</span>
    </div>
    <i className="ri-arrow-right-s-line arrow-icon" />
  </div>
</Link>

<div className={`menu-dropdown ${activeMenu === 'tools' ? 'show' : ''}`} id="toolsmng">
  <ul className="nav nav-sm flex-column">
    <li className="nav-item">
      <a href="#" className="nav-link" data-key="t-level-1.1"> Level 1.1 </a>
    </li>
  </ul>
</div>
</li>
                 {/* quotation management Menu */}
                 <li className="nav-item">

<Link to=''
  className={`nav-link menu-link ${activeMenu === 'quotation' ? 'active' : ''}`}
  href="#quotationmng"
  onClick={() => toggleMenu('quotation')}
  aria-expanded={activeMenu === 'quotation'}
>
  <div className="menu-content">
    <div className="icon-text">
    <i className="bi bi-file-text"></i>
      <span data-key="t-multi-level">Quotation Mng</span>
    </div>
    <i className="ri-arrow-right-s-line arrow-icon" />
  </div>
</Link>

<div className={`menu-dropdown ${activeMenu === 'quotation' ? 'show' : ''}`} id="quotationmng">
  <ul className="nav nav-sm flex-column">
    <li className="nav-item">
      <a href="#" className="nav-link" data-key="t-level-1.1"> Level 1.1 </a>
    </li>
  </ul>
</div>
</li>



                 {/* user management Menu */}
                 <li className="nav-item">

<Link to=''
  className={`nav-link menu-link ${activeMenu === 'user' ? 'active' : ''}`}
  href="#usermng"
  onClick={() => toggleMenu('user')}
  aria-expanded={activeMenu === 'user'}
>
  <div className="menu-content">
    <div className="icon-text">
    <i className="bi bi-person"></i>
      <span data-key="t-multi-level">User Mng</span>
    </div>
    <i className="ri-arrow-right-s-line arrow-icon" />
  </div>
</Link>

<div className={`menu-dropdown ${activeMenu === 'user' ? 'show' : ''}`} id="usermng">
  <ul className="nav nav-sm flex-column">
    <li className="nav-item">
      <a href="#" className="nav-link" data-key="t-level-1.1"> Level 1.1 </a>
    </li>
  </ul>
</div>
</li>





              </ul>
            </div>
          </div>

          <div className="sidebar-background"></div>
        </div>
        {/* Vertical Overlay*/}
        <div className="vertical-overlay"></div>
      </div>
    </>
  );
}

export default LeftNav;
