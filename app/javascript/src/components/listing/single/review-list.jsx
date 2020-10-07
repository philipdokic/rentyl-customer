// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import Review from '../review';

// Styled Components
// -----------------------------------------------
const ListReviews = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22.624px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
`;

const ReviewListHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StarContainer = styled.div`
  .react-rater {
    display: flex;
    justify-content: center;
    margin-left: 16px;
  }

  .react-rater-star {
    font-size: 20px;
    margin: 0 4px;
    color: white;
    position: relative;
    text-shadow: -1px -1px 0 #e5e2e2, 1px -1px 0 #e5e2e2, -1px 1px 0 #e5e2e2,
      1px 1px 0 #e5e2e2;

    &.will-be-active,
    &.is-active {
      color: gold;
      text-shadow: none;
    }
    &.is-active-half::before {
      color: gold;
      content: '\u2605';
      position: absolute;
      left: 0;
      width: 50%;
      overflow: hidden;
    }
  }
`;

const PaginationContainer = styled.div`
  @media (max-width: 500px) {
    margin: 0 auto;

    .break-me,
    .hide-on-mobile {
      display: none !important;
    }
  }
`;

// -----------------------------------------------
// COMPONENT->REVIEW-LIST ------------------------
// -----------------------------------------------
class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.updatePagination = this.updatePagination.bind(this);
    this.state = {
      pageOffset: 0,
      rowsPerPage: 10,
      pageRangeDisplayed: 4
    };
  }

  componentDidMount() {
    this.updatePagination();
    window.addEventListener('resize', this.updatePagination);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePagination);
  }

  updatePagination = () => {
    let mobile = window.innerWidth < 500;

    let rowsPerPage = mobile ? 2 : 10;
    let pageRangeDisplayed = mobile ? 0 : 4;

    this.setState({
      rowsPerPage: rowsPerPage,
      pageRangeDisplayed: pageRangeDisplayed
    });
  };

  handlePageClick = data => {
    let offset = Math.ceil(data.selected * this.state.rowsPerPage);
    this.setState({ pageOffset: offset });
  };

  render() {
    const pageCount = Math.ceil(
      this.props.listing.reviews.length / this.state.rowsPerPage
    );

    return (
      <ListReviews>
        <ReviewListHeader>
          <h3>{this.props.listing.reviews.length} Reviews</h3>
          <StarContainer>
            <Rater
              rating={parseFloat(this.props.listing.review_average)}
              interactive={false}
            />
          </StarContainer>
        </ReviewListHeader>
        {this.props.listing.reviews
          .slice(
            this.state.pageOffset,
            this.state.pageOffset + this.state.rowsPerPage
          )
          .map(review => (
            <Review
              key={review.id}
              review={review}
              displayFormat={this.props.displayFormat}
            />
          ))}
        <PaginationContainer className="consolidated-key">
          {pageCount > 1 && (
            <div className="no-wrap" style={{ float: 'right' }}>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={<a href="">...</a>}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                onPageChange={this.handlePageClick}
                containerClassName={''}
                pageClassName={'hide-on-mobile'}
                subContainerClassName={'pages consolidated-key'}
                activeClassName={'active'}
              />
            </div>
          )}
        </PaginationContainer>
      </ListReviews>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(ReviewList);