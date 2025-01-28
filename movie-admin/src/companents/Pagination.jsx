import {PaginationItem} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowBack";
import React, {useState} from "react";

export const Pagination = ({totalPages,handlePageChange,currentPage}) => {
    return (
        <Pagination
            count={totalPages} // Umumiy sahifalar soni
            page={currentPage} // Hozirgi sahifa
            onChange={handlePageChange} // Sahifa almashishi
            color="primary"
            sx={{display: "inline-block"}}
            siblingCount={1} // Hozirgi sahifadan oldin/so‘nggi qo‘shni sahifalar soni
            boundaryCount={2} // Boshlang'ich va oxirgi sahifalar soni
        />
    )
}
