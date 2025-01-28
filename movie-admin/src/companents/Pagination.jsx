import React, {useState} from "react";

export const Pagination = ({totalItems, itemsPerPage, currentPage, onPageChange}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
        <Pagination
            count={totalPages} // Umumiy sahifalar soni
            page={currentPage} // Hozirgi sahifa
            onChange={onPageChange} // Sahifa almashishi
            color="primary"
            sx={{display: "inline-block"}}
            siblingCount={1} // Hozirgi sahifadan oldin/so‘nggi qo‘shni sahifalar soni
            boundaryCount={2} // Boshlang'ich va oxirgi sahifalar soni
        />
    )
}
