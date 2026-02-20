import React from "react";
import Header from "../../../AdminCommon/Header/Header";
import LeftNav from "../../../AdminCommon/LeftNav/LeftNav";
import ViewExportProductRight from "./Include/ViewExportProductRight";

function ViewExportProduct(){
    return(
        <>
        <Header />
        <LeftNav />
        <ViewExportProductRight />
        </>
    )
}
export default ViewExportProduct;