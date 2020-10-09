// Dependencies
// -----------------------------------------------
import styled from 'styled-components';

// -----------------------------------------------
// COMPONENT->STAR-CONTAINER ---------------------
// -----------------------------------------------
const StarContainer = styled.span`
  .react-rater {
    display: flex;
    justify-content: center;
  }

  .react-rater-star {
    font-size: 16px;
    margin-right: 4px;
    position: relative;
    color: white;
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

export default StarContainer
