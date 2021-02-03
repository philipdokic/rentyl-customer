// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import styled from 'styled-components';
import 'react-dates/initialize'; // Needed for rendering any react-dates components

// Components
// -----------------------------------------------
import { RegisterForm, FlashMessage } from '../forms';

// Styles
// -----------------------------------------------
const CreationContainer = styled.div`
  &.user-creation-content {
    background-color: ${props => props.backgroundColor || '#00CC99'};
  }
`;

const Explainer = styled.div`
  &.user-creation-explainer {
    color: ${props => props.color || 'white'};
  }
`;

// -----------------------------------------------
// COMPONENT->SIGN-UP ----------------------------
// -----------------------------------------------
class SignUp extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      name: null,
      telephone: null,
      password: null,
      password_confirmation: null,
      terms_agreement: false,
      privacy_agreement: false,
      error: null
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    if (this.props.redirect_url) {
      window.location.href = this.props.redirect_url;
    }
  }

  // On Change
  // ---------------------------------------------
  onChange = e => {
    let changeState = {};
    changeState[e.target.name] = e.target.value;
    this.setState(changeState);
  };

  // On Checkbox Click
  // ---------------------------------------------
  onCheckboxClick = e => {
    let changeState = {};
    changeState[e.target.name] = !this.state[e.target.name];
    this.setState(changeState);
  };

  // On Clear Error
  // ---------------------------------------------
  onClearError = () => {
    this.setState({ error: null });
  };

  // On Submit
  // ---------------------------------------------
  onSubmit = userType => {
    if (!this.checkForErrors()) {
      const { email, password, name, telephone } = { ...this.state };
      const registerParams = {
        email: email,
        password: password,
        name: name,
        telephone: telephone,
        user_type: userType
      };

      axios.post(`${process.env.DIRECT_URL}/api/v2/registrations`, registerParams)
      .then(response => {
        console.log(response);
        this.setState({ error: response.error, user: null });
      })
      .catch(error => {
        console.log(error);
      })
    }
  };

  // Email Error
  // ---------------------------------------------
  emailError = email => {
    return !email || email === '';
  };

  // Password Error
  // ---------------------------------------------
  passwordError = password => {
    return !password || password === '' || this.statlength < 7;
  };

  // Confirmation Error
  // ---------------------------------------------
  confirmationError = (password, confirmation) => {
    return password !== confirmation;
  };

  // Name Error
  // ---------------------------------------------
  nameError = name => {
    return !name || name === '';
  };

  // Gameday Terms Privacy Error
  // ---------------------------------------------
  gamedayTermsPrivacyError = () => {
    return (
      this.props.brand.organization.id === 5 &&
      !(this.state.terms_agreement && this.state.privacy_agreement)
    );
  };

  // Check For Errors
  // ---------------------------------------------
  checkForErrors = () => {
    const { email, password, password_confirmation, name } = { ...this.state };

    let errorPresent = false;
    let possibleErrors = [
      {
        validation: this.emailError(email),
        message: 'Must have valid email to register.'
      },
      {
        validation: this.nameError(name),
        message: 'Must have valid name to register.'
      },
      {
        validation: this.passwordError(password),
        message: 'Your password must be at least 6 characters long.'
      },
      {
        validation: this.confirmationError(password, password_confirmation),
        message: 'Your passwords do not match.'
      },
      {
        validation: this.gamedayTermsPrivacyError(),
        message: 'Please accept the Terms of Service and Privacy Policy.'
      }
    ];

    possibleErrors.some(error => {
      if (error['validation'] === true) {
        this.setState({ error: error['message'] });
        errorPresent = true;
      }
      return errorPresent;
    });

    return errorPresent;
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <section className="user-container">
        {this.state.error && (
          <FlashMessage
            message={this.state.error}
            onClick={this.onClearError}
          />
        )}
        <CreationContainer
          className="user-creation-content"
          backgroundColor={this.props.brand.brand_info.colors['color_actions']}
        >
          <Explainer
            className="user-creation-explainer"
            color={this.props.brand.brand_info.colors['color_text']}
          >
            <p>
              <b className="subtitle">Sign Up</b>
            </p>
          </Explainer>
          <div className="user-creation-options">
            <RegisterForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onCheckboxClick={this.onCheckboxClick}
              terms_agreement={this.state.terms_agreement}
              privacy_agreement={this.state.privacy_agreement}
            />
          </div>
        </CreationContainer>
      </section>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(SignUp);