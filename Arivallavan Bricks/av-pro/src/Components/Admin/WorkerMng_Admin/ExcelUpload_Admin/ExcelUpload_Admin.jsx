import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import ExcelUploadRight from "./Include/ExcelUploadRight";


function ExcelUpload_Admin(){
    return(
        <>
        <Header />
        <LeftNav />
        <ExcelUploadRight />
        </>
    )
}
export default ExcelUpload_Admin;