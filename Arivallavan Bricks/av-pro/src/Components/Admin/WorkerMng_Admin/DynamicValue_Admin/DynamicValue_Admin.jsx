import React from "react";
import Header from "../../AdminCommon/Header/Header";
import LeftNav from "../../AdminCommon/LeftNav/LeftNav";
import DymanicValue_AdminRight from "./Include/DynamicValue_AdminRight";

function DymanicValue_Admin(){
    return(
        <>
        <Header />
        <LeftNav />
        <DymanicValue_AdminRight />
        </>
    )
}
export default DymanicValue_Admin;