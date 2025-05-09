import React from "react";
import {ChevronRight} from "@mui/icons-material";

const ViewAll = () => {
    return(
        <div className="flex gap-1 items-center">
            <p className="text-black-light font-[500] text-[9.52px] md:text-[16px] leading-[18px]">View All</p>
            <ChevronRight className="text-[#008ECC] w-[10.71px] h-[10.71px] md:w-[18px] md:h-[18px]"/>
        </div>
    )
}

export default ViewAll