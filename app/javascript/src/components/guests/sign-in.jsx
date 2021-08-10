// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import styled from 'styled-components';
import 'react-dates/initialize'; // Needed for rendering any react-dates components

// Components
// -----------------------------------------------
import { EmailForm, FlashMessage, PasswordForm } from '../forms';

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
// COMPONENT->SIGN-IN ----------------------------
// -----------------------------------------------
class SignIn extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      error: null,
      user: null
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

  // On Clear Error
  // ---------------------------------------------
  onClearError = () => {
    this.setState({ error: null });
  };

  // On Email Submit
  // ---------------------------------------------
  onEmailSubmit = userType => {
    const email = this.state.email;

    if (!email || email === '') {
      this.setState({ error: 'Please type in an email to sign in.' });
      return;
    }

    axios.get(`${process.env.DIRECT_URL}/api/v2/sessions/fetch_user?user_type=${userType}&email=${this.state.email}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      this.setState({ user: response.data.user });
    })
    .catch(error => {
      this.setState({ error: error });
      console.log(error);
    })
  };

  // On Password Submit
  // ---------------------------------------------
  onPasswordSubmit = () => {
    const password = this.state.password;

    if (!password || password === '') {
      this.setState({ error: 'Please type in a password to sign in.' });
      return;
    }

    const sessionParams = this.setUserParams();
    sessionParams['password'] = password;

    axios.post(`${process.env.DIRECT_URL}/api/v2/sessions`, sessionParams)
    .then(response => {
      window.location.href = response.data.redirect_url;
    })
    .catch(error => {
      this.setState({ error: error });
      console.log(error);
    })
  };

  // Render Form Step
  // ---------------------------------------------
  renderFormStep = () => {
    if (this.state.user) {
      return (
        <PasswordForm
          onChange={this.onChange}
          onSubmit={this.onPasswordSubmit}
          user={this.state.user}
          onClick={this.onResetPasswordClick}
        />
      );
    } else {
      return (
        <EmailForm onChange={this.onChange} onSubmit={this.onEmailSubmit} />
      );
    }
  };

  // Set User Params
  // ---------------------------------------------
  setUserParams = () => {
    return { email: this.state.email, user_type: this.state.user.user_type };
  };

  // On Reset Password click
  // ---------------------------------------------
  onResetPasswordClick = () => {
    axios.post(`${process.env.DIRECT_URL}/api/v2/sessions/reset_password`, this.setUserParams())
    .then(response => {
      this.setState({ error: response.error, user: null });
    })
    .catch(error => {
      console.log(error);
    })
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
              <b className="subtitle">Sign In</b>
              <span>Access your {this.props.brand.organization.name} dashboard.</span>
            </p>
            {this.state.user && this.state.user.user_type == 'Employee' && (
              <p>Signing in will redirect you to our managing app</p>
            )}
          </Explainer>
          <div className="user-creation-options">{this.renderFormStep()}</div>
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
export default connect(mapStateToProps)(SignIn);