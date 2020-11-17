// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';
import Rater from 'react-rater';

// Components
// -----------------------------------------------
import SimplifiedWysiwyg from '../inputs/simplified-wysiwyg';
import { StarContainer } from '../miscellaneous/';
import Text from '../inputs/text';


// Styles
// -----------------------------------------------
const SubmitButton = styled.button`
  margin: 0 auto;
  width: 128px
  height: 40px;
  font-size: 16px;
  display: block;
  cursor: pointer;

  &:disabled {
    opacity: .3;
    cursor: default;
  }
`;

const RatingContainer = styled(StarContainer)`
  text-align: center;
  display: block;

  .react-rater-star {
    cursor: pointer;
    font-size: 30px;
    margin: 0 8px;
  }
`;

// On Rate
// -----------------------------------------------
const onRate = (props, e) => {
  props.onChange('rating', e.rating);
};

// -----------------------------------------------
// COMPONENT->FORM -------------------------------
// -----------------------------------------------
const Form = props => {
  return (
    <form>
      <h1>Please rate your stay!</h1>
      <p>
        Leave your feedback in the form below. We can't wait to hear all about
        your stay!
      </p>
      <RatingContainer>
        <label>Select your star rating</label>
        <Rater total={5} onRate={e => onRate(props, e)} rating={props.rating} />
      </RatingContainer>
      <Text
        name="title"
        placeholder="Title"
        onChange={props.onChange}
        required={true}
      />
      <label>Review (required)</label>
      <SimplifiedWysiwyg
        name="body"
        placeholder="Write your review here..."
        onContentChange={props.onChange}
      />
      <SubmitButton
        type="button"
        onClick={props.onSubmit}
        disabled={props.incomplete}
      >
        SUBMIT
      </SubmitButton>
    </form>
  );
};

// Export
// -----------------------------------------------
export default Form;
