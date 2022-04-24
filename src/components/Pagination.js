import React, {useEffect, useState} from "react";
import "../assets/styles/PaginationStyle.css"
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";

function Pagination(props) {
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);

    const range = (start, end) => {
        let length = end - start + 1;
        /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */
        return Array.from({ length }, (_, idx) => idx + start);
    };

    useEffect(() => {
            const totalPageCount = Math.ceil(props.totalCount / props.pageSize);

            const totalPageNumbers = props.siblingCount + 5;

            /*
              Case 1:
              If the number of pages is less than the page numbers we want to show in our
              paginationComponent, we return the range [1..totalPageCount]
            */
            if (totalPageNumbers >= totalPageCount) {
                setPages(range(1, totalPageCount));
            }

            /*
                Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
            */
            const leftSiblingIndex = Math.max(Number(props.currentPage) - Number(props.siblingCount), 1);
            const rightSiblingIndex = Math.min(
                Number(props.currentPage) + Number(props.siblingCount),
                totalPageCount
            );

            /*
              We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
               Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
            */
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPageCount;

            /*
                Case 2: No left dots to show, but rights dots to be shown
            */
            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 2 * props.siblingCount;
                let leftRange = range(1, leftItemCount);

                setPages([...leftRange, "...", totalPageCount]);
            }

            /*
                Case 3: No right dots to show, but left dots to be shown
            */
            if (shouldShowLeftDots && !shouldShowRightDots) {

                let rightItemCount = 3 + 2 * props.siblingCount;
                let rightRange = range(
                    totalPageCount - rightItemCount + 1,
                    totalPageCount
                );
                setPages([firstPageIndex, "...", ...rightRange]);
            }

            /*
                Case 4: Both left and right dots to be shown
            */
            if (shouldShowLeftDots && shouldShowRightDots) {
                let middleRange = range(leftSiblingIndex, rightSiblingIndex);
                setPages([firstPageIndex, "...", ...middleRange, "...", lastPageIndex]);
            }
    }, [props.totalCount, props.currentPage])


    const navigateOnPage = (page) => {
        navigate(props.pageUrl + page)
    }

    const next = () => {
        navigate(props.pageUrl + (Number(props.currentPage) + 1));
    }

    const prev = () => {
        navigate(props.pageUrl + (Number(props.currentPage) - 1));
    }

    return (
        <div className="pagination1">
            <ul className="pagination">
                <li onClick={prev}> &#10094; </li>
                {pages.map(page => {
                    if (page === Number(props.currentPage)) {
                        return <li key={uuidv4()} onClick={() => navigateOnPage(page)} style={{backgroundColor: "rgba(5,127,169,0.93)"}}>{page}</li>
                    } else {
                        if(!(page === "...")) {
                            return <li key={uuidv4()} onClick={() => navigateOnPage(page)}>{page}</li>
                        } else {
                            return <li style={{cursor: "auto", background: "#FAFAFA00"}} key={uuidv4()}>{page}</li>
                        }
                    }
                })}
                <li onClick={next}> &#10095; </li>
            </ul>
        </div>
    )
}

export default Pagination;