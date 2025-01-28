import React, {useState} from "react";

export const Pagination = ({page, handlePageChange, currentPage}) => {
    return (
        <Pagination
            count={page} // Umumiy sahifalar soni
            page={currentPage} // Hozirgi sahifa
            onChange={handlePageChange} // Sahifa almashishi
            color="primary"
            sx={{display: "inline-block"}}
            siblingCount={1} // Hozirgi sahifadan oldin/so‘nggi qo‘shni sahifalar soni
            boundaryCount={2} // Boshlang'ich va oxirgi sahifalar soni
        />
    )
}
