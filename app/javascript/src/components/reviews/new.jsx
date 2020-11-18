// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import styled from 'styled-components';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';

// Components
// -----------------------------------------------
import displayError from '../errors/display';
import Form from './form';
import Message from './message';
import Notification from '../miscellaneous/notification';
import Ripple from '../miscellaneous/ripple';

// Styles
// -----------------------------------------------
const ReviewContainer = styled.div`
  padding: 64px 8px;
  max-width: 600px;
  width: 95%;
  margin: 0 auto;
  min-height: calc(100vh - 350px);

  h1,
  p {
    text-align: center;
  }
`;

// -----------------------------------------------
// COMPONENT->REVIEW -----------------------------
// -----------------------------------------------
export default class Review extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      title: null,
      body: null,
      review: null,
      incomplete: true,
      loading: false
    };
  }

  // Validate Fields
  // ---------------------------------------------
  validateFields = () => {
    if (this.state.title && this.state.body && this.state.rating > 0) {
      this.setState({ incomplete: false });
    }
  };

  // On Change
  // ---------------------------------------------
  onChange = (name, value) => {
    const changeState = {};

    changeState[name] = value;
    this.setState(changeState, this.validateFields());
  };

  // On Submit
  // ---------------------------------------------
  onSubmit = () => {
    this.setState({ loading: true, incomplete: true });
    axios.post(`/${get(this, 'props.match.params.booking_code')}/reviews/create`, {
      rating: this.state.rating,
      title: this.state.title,
      body: this.state.body
    })
    .then(response => {
      this.setState({ review: response.data.review });
      this.setState({ loading: false });
    })
    .catch(error => {
      displayError({ message: 'Review was unable to submit', error });
      this.setState({ loading: false });
    })
  };

  // Render Review Form
  // ---------------------------------------------
  renderReviewForm = () => (
    <Form
      onChange={this.onChange}
      onWysiwygChange={this.onChange}
      onSubmit={this.onSubmit}
      rating={this.state.rating}
      incomplete={this.state.incomplete}
    />
  );

  // Render Message
  // ---------------------------------------------
  renderMessage = () => <Message error={this.state.error} />;

  // Render Loading
  // ---------------------------------------------
  renderLoading = () => <Ripple color="#50E3C2" />;

  // Render
  // ---------------------------------------------
  render() {
    return (
      <>
        <Notification />
        <ReviewContainer>
          {this.state.review ? this.renderMessage() : this.renderReviewForm()}
          {this.state.loading ? this.renderLoading() : null}
        </ReviewContainer>
      </>
    );
  }
}
