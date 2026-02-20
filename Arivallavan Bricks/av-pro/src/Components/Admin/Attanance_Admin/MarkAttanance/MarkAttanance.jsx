import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import MarkAttananceRight from "./Include/MarkAttananceRight";

function MarkAttanance(){
    return(
        <>
        <Header />
        <LeftNav />
        <MarkAttananceRight />
        </>
    )
}
export default MarkAttanance;