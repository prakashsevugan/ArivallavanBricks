import React from "react";
import { Link } from "react-router-dom";


function Header() {



    return (
        <>

{/* <!-- Begin page --> */}
<div id="layout-wrapper">
      <header id="page-topbar">
  <div className="layout-width">
    <div className="navbar-header">
      <div className="d-flex">
        {/* LOGO */}
        <div className="navbar-brand-box horizontal-logo">
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height={22} />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-dark.png" alt="" height={17} />
            </span>
          </a>
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height={22} />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-light.png" alt="" height={17} />
            </span>
          </a>
        </div>
        {/* <button
          type="button"
          className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
          id="topnav-hamburger-icon"
        >
          <span className="hamburger-icon">
            <span />
            <span />
            <span />
          </span>
        </button> */}
        {/* App Search*/}
        <form className="app-search d-none d-md-block">
          {/* <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              autoComplete="off"
              id="search-options"
              defaultValue=""
            />
            <span className="mdi mdi-magnify search-widget-icon" />
            <span
              className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
              id="search-close-options"
            />
          </div> */}
          <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
            <div data-simplebar="" style={{ maxHeight: 320 }}>
              {/* item*/}
              <div className="dropdown-header">
                <h6 className="text-overflow text-muted mb-0 text-uppercase">
                  Recent Searches
                </h6>
              </div>
              <div className="dropdown-item bg-transparent text-wrap">
                <a
                  href="index.html"
                  className="btn btn-soft-secondary btn-sm rounded-pill"
                >
                  how to setup <i className="mdi mdi-magnify ms-1" />
                </a>
                <a
                  href="index.html"
                  className="btn btn-soft-secondary btn-sm rounded-pill"
                >
                  buttons <i className="mdi mdi-magnify ms-1" />
                </a>
              </div>
              {/* item*/}
              <div className="dropdown-header mt-2">
                <h6 className="text-overflow text-muted mb-1 text-uppercase">
                  Pages
                </h6>
              </div>
              {/* item*/}
              <a
                href="javascript:void(0);"
                className="dropdown-item notify-item"
              >
                <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                <span>Analytics Dashboard</span>
              </a>
              {/* item*/}
              <a
                href="javascript:void(0);"
                className="dropdown-item notify-item"
              >
                <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                <span>Help Center</span>
              </a>
              {/* item*/}
              <a
                href="javascript:void(0);"
                className="dropdown-item notify-item"
              >
                <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                <span>My account settings</span>
              </a>
              {/* item*/}
              <div className="dropdown-header mt-2">
                <h6 className="text-overflow text-muted mb-2 text-uppercase">
                  Members
                </h6>
              </div>
              <div className="notification-list">
                {/* item */}
                <a
                  href="javascript:void(0);"
                  className="dropdown-item notify-item py-2"
                >
                  <div className="d-flex">
                    <img
                      src="assets/images/users/avatar-2.jpg"
                      className="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="flex-grow-1">
                      <h6 className="m-0">Angela Bernier</h6>
                      <span className="fs-11 mb-0 text-muted">Manager</span>
                    </div>
                  </div>
                </a>
                {/* item */}
                <a
                  href="javascript:void(0);"
                  className="dropdown-item notify-item py-2"
                >
                  <div className="d-flex">
                    <img
                      src="assets/images/users/avatar-3.jpg"
                      className="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="flex-grow-1">
                      <h6 className="m-0">David Grasso</h6>
                      <span className="fs-11 mb-0 text-muted">
                        Web Designer
                      </span>
                    </div>
                  </div>
                </a>
                {/* item */}
                <a
                  href="javascript:void(0);"
                  className="dropdown-item notify-item py-2"
                >
                  <div className="d-flex">
                    <img
                      src="assets/images/users/avatar-5.jpg"
                      className="me-3 rounded-circle avatar-xs"
                      alt="user-pic"
                    />
                    <div className="flex-grow-1">
                      <h6 className="m-0">Mike Bunch</h6>
                      <span className="fs-11 mb-0 text-muted">
                        React Developer
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="text-center pt-3 pb-1">
              <a
                href="pages-search-results.html"
                className="btn btn-primary btn-sm"
              >
                View All Results <i className="ri-arrow-right-line ms-1" />
              </a>
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex align-items-center">
        <div className="dropdown d-md-none topbar-head-dropdown header-item">
          <button
            type="button"
            className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
            id="page-header-search-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bx bx-search fs-22" />
          </button>
          <div
            className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-search-dropdown"
          >
            <form className="p-3">
              <div className="form-group m-0">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search ..."
                    aria-label="Recipient's username"
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="mdi mdi-magnify" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
       
      

        <div
          className="dropdown topbar-head-dropdown ms-1 header-item"
          id="notificationDropdown"
        >
     <Link to='/'>     
          <button
            type="button"
            className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
            id="page-header-notifications-dropdown"
            // data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-haspopup="true"
            aria-expanded="false"
          >

        <i className="bx bx-log-out fs-22" />
        </button>
        </Link>
</div>


        <div
          className="dropdown topbar-head-dropdown ms-1 header-item"
          id="notificationDropdown"
        >
          
          <button
            type="button"
            className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
            id="page-header-notifications-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-haspopup="true"
            aria-expanded="false"
          >
            
            <i className="bx bx-bell fs-22" />
            <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
              3<span className="visually-hidden">unread messages</span>
            </span>
          </button>

        </div>
        <div className="dropdown ms-sm-3 header-item topbar-user">
          <button
            type="button"
            className="btn material-shadow-none"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="d-flex align-items-center">
              <img
                className="rounded-circle header-profile-user"
                src="assets/images/users/avatar-1.jpg"
                alt="Header Avatar"
              />
              <span className="text-start ms-xl-2">
                <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                  CGR SNG
                </span>
                <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                  Founder
                </span>
              </span>
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu-end">
            {/* item*/}
            <h6 className="dropdown-header">Welcome Anna!</h6>
            <a className="dropdown-item" href="pages-profile.html">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Profile</span>
            </a>
            <a className="dropdown-item" href="apps-chat.html">
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Messages</span>
            </a>
            <a className="dropdown-item" href="apps-tasks-kanban.html">
              <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Taskboard</span>
            </a>
            <a className="dropdown-item" href="pages-faqs.html">
              <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Help</span>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="pages-profile.html">
              <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">
                Balance : <b>$5971.67</b>
              </span>
            </a>
            <a className="dropdown-item" href="pages-profile-settings.html">
              <span className="badge bg-success-subtle text-success mt-1 float-end">
                New
              </span>
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Settings</span>
            </a>
            <a className="dropdown-item" href="auth-lockscreen-basic.html">
              <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Lock screen</span>
            </a>
            <a className="dropdown-item" href="auth-logout-basic.html">
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

{/* removeNotificationModal */}
<div
    id="removeNotificationModal"
    className="modal fade zoomIn"
    tabIndex={-1}
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="NotificationModalbtn-close"
          />
        </div>
        <div className="modal-body">
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: 100, height: 100 }}
            />
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you sure you want to remove this Notification ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger"
              id="delete-notification"
            >
              Yes, Delete It!
            </button>
          </div>
        </div>
      </div>
      {/* /.modal-content */}
    </div>
    {/* /.modal-dialog */}
  </div>
  {/* /.modal */}





</div>
        </>
    )
}
export default Header;