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
import { StarContainer } from '../../miscellaneous/';

// Styles
// -----------------------------------------------
const ListReview = styled.div`
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

const PaginationContainer = styled.div`
  @media (max-width: 500px) {
    margin: 0 auto;

    .break-me,
    .hide-on-mobile {
      display: none !important;
    }
  }
`;

const ReviewContainer = styled(StarContainer)`
  .react-rater {
    margin-left: 16px;
  }

  .react-rater-star {
    font-size: 20px;
    margin: 0 4px;
  }
`;

export {
  ReviewContainer
}

// -----------------------------------------------
// COMPONENT->REVIEW-LIST ------------------------
// -----------------------------------------------
class ReviewList extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.updatePagination = this.updatePagination.bind(this);
    this.state = {
      pageOffset: 0,
      rowsPerPage: 10,
      pageRangeDisplayed: 4
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.updatePagination();
    window.addEventListener('resize', this.updatePagination);
  }

  // Component Will Unmount
  // ---------------------------------------------
  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePagination);
  }

  // Update Pagination
  // ---------------------------------------------
  updatePagination = () => {
    let mobile = window.innerWidth < 500;
    let rowsPerPage = mobile ? 2 : 10;
    let pageRangeDisplayed = mobile ? 0 : 4;

    this.setState({
      rowsPerPage: rowsPerPage,
      pageRangeDisplayed: pageRangeDisplayed
    });
  };

  // Handle Page Click
  // ---------------------------------------------
  handlePageClick = data => {
    let offset = Math.ceil(data.selected * this.state.rowsPerPage);

    this.setState({ pageOffset: offset });
  };

  // Render
  // ---------------------------------------------
  render() {
    const pageCount = Math.ceil(
      this.props.reviews.length / this.state.rowsPerPage
    );

    return (
      <ListReview>
        <ReviewListHeader>
          <h3>{this.props.reviews.length} Reviews</h3>
          <ReviewContainer>
            <Rater
              rating={parseFloat(this.props.average)}
              interactive={false}
            />
          </ReviewContainer>
        </ReviewListHeader>
        {this.props.reviews
          .slice(
            this.state.pageOffset,
            this.state.pageOffset + this.state.rowsPerPage
          )
          .map(review => (
            <Review
              key={review.id}
              review={review}
            />
          ))}
        {pageCount > 1 && (
          <PaginationContainer className="consolidated-key">
            <div
              className="no-wrap"
              style={{ float: 'right', display: 'flex' }}
            >
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
          </PaginationContainer>
        )}
      </ListReview>
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