
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';


class Sample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
        return (pageNumber)
    }

    render() {
        return (
            <div>
                <div className="commentBox">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={30}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={6}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
        );
    }
}

export default Sample;