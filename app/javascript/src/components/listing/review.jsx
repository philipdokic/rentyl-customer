// Dependencies
// -----------------------------------------------
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Rater from 'react-rater';
import get from 'lodash/get';

// Components
// -----------------------------------------------
// import { StarContainer } from 'cxThemeComponents';

// Styled Components
// -----------------------------------------------
const ReviewContainer = styled.section`
  flex-direction: column !important;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 500px) {
    display: block;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;

  p {
    margin-left: 16px;
  }
`;

// const ReviewStarContainer = styled(StarContainer)`
//   .react-rater {
//     @media (max-width: 500px) {
//       justify-content: flex-start;
//     }
//   }
// `;

// -----------------------------------------------
// COMPONENT->DETAILS-REVIEW ---------------------
// -----------------------------------------------
const DetailsReview = props => {
  return (
    <ReviewContainer>
      <ReviewHeader>
        <ReviewerInfo>
          <h4>{props.review.name}</h4>
          <p>
            {moment(props.review.reviewed_date || props.review.created_at).format(
              get(props, 'displayFormat') === 'DD/MM/YYYY' ? 'D/M/YY' : 'M/D/YY'
            )}
          </p>
        </ReviewerInfo>
        {/* <ReviewStarContainer>
          <Rater rating={props.review.rating} interactive={false} />
        </ReviewStarContainer> */}
      </ReviewHeader>
      <div dangerouslySetInnerHTML={{ __html: props.review.body }} />
    </ReviewContainer>
  );
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default DetailsReview;
