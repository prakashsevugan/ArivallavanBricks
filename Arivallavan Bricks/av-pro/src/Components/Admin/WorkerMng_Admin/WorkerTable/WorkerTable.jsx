import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import WorkerTableRight from "./Include/WorkerTableRight";

function WorkerTable(){
    return(
        <>
        <Header />
        <LeftNav />
        <WorkerTableRight />
        </>
    )
}
export default WorkerTable;