import React from "react";
import Header from "../../../../Admin/AdminCommon/Header/Header";
import LeftNav from "../../../../Admin/AdminCommon/LeftNav/LeftNav";
import AddMakingProductRight from "./Include/AddMakingProductRight";


function AddMakingProduct(){
    return(
        <>
        <Header />
        <LeftNav />
        <AddMakingProductRight />
        </>
    )
}
export default AddMakingProduct;