import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import TaskAssignRight from "./Include/TaskAssignRight";

function TaskAssign(){
    return(
        <>
        <Header />
        <LeftNav />
        <TaskAssignRight />
        </>
    )
}
export default TaskAssign;