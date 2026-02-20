import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import AttananceRecordsRight from "./Include/AttananceRecordsRight";

function AttananceRecords(){
    return(
        <>
        <Header />
        <LeftNav />
        <AttananceRecordsRight />
        </>
    )
}
export default AttananceRecords;