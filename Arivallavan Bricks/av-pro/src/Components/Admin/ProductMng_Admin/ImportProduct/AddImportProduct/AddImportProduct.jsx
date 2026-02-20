import React from "react";
// import Header from "../../../../Components/Admin/AdminCommon/Header/Header";
import Header from "../../../../Admin/AdminCommon/Header/Header";
import LeftNav from "../../../../Admin/AdminCommon/LeftNav/LeftNav";
import AddImportProductRight from "./Include/AddImportProductRight";


function AddImportProduct(){
    return(
        <>
        <Header />
        <LeftNav />
        <AddImportProductRight />
        </>
    )
}
export default AddImportProduct;