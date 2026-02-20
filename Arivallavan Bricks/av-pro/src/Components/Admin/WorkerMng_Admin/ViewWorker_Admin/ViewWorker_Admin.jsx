import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import ViewWorkerAdminRight from "./Include/ViewWorkerAdminRight";

function ViewWorker_Admin(){
    return(
        <>
        <Header />
        <LeftNav />
        <ViewWorkerAdminRight />
        </>
    )
}
export default ViewWorker_Admin;