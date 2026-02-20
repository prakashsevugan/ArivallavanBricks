import React from "react";
// import Header from "../../../../Components/Admin/AdminCommon/Header/Header";
import Header from "../../../../Admin/AdminCommon/Header/Header";
import LeftNav from "../../../../Admin/AdminCommon/LeftNav/LeftNav";
import AddExportProductRight from "./Include/AddExportProductRight";


function AddExportProduct(){
    return(
        <>
        <Header />
        <LeftNav />
        <AddExportProductRight />
        </>
    )
}
export default AddExportProduct;