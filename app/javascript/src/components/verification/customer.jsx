// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import SignatureCapture from '../inputs/signature-capture';
import IdPhotoUploader from '../inputs/id-photo-uploader';
import LocationForm from '../forms/location';

// Styles
// -----------------------------------------------
const StyledFigure = styled.figure`
  width: 100%;
  margin-bottom: 16px;
`;

const StyledCheckbox = styled.figure`
  &.checkbox {
    label {
      ::after {
        top: -12px;
      }
    }
  }
`;

// -----------------------------------------------
// COMPONENT->CUSTOMER ---------------------------
// -----------------------------------------------
export default class Customer extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      adrStreet: '',
      adrUnit: '',
      adrCity: '',
      adrState: '',
      adrCountry: '',
      adrPostalCode: '',
      ageVerified: false,
      termsAccepted: false
    };
  }

  // Set Location Attributes
  // ---------------------------------------------
  setLocationAttributes = values => {
    const {
      adrStreet,
      adrUnit,
      adrCity,
      adrState,
      adrCountry,
      adrPostalCode
    } = values;
    this.setState(
      {
        adrStreet: adrStreet,
        adrUnit: adrUnit,
        adrCity: adrCity,
        adrState: adrState,
        adrCountry: adrCountry,
        adrPostalCode: adrPostalCode
      },
      () => {
        if (
          adrStreet &&
          adrStreet.length > 0 &&
          adrCity &&
          adrCity.length > 0 &&
          adrState &&
          adrState.length > 0 &&
          adrCountry &&
          adrCountry.length > 0 &&
          adrPostalCode &&
          adrPostalCode.length > 0
        ) {
          this.props.updateState({
            address_verified: true,
            adrStreet: adrStreet,
            adrUnit: adrUnit,
            adrCity: adrCity,
            adrState: adrState,
            adrCountry: adrCountry,
            adrPostalCode: adrPostalCode
          });
        }
      }
    );
  };

  // Update Age Verification
  // ---------------------------------------------
  updateAgeVerification = () => {
    this.setState({ ageVerified: !this.state.ageVerified }, () => {
      this.props.updateState({
        age_verified: this.state.ageVerified
      });
    });
  };

  // Update Terms Accepted
  // ---------------------------------------------
  updateTermsAccepted = () => {
    this.setState({ termsAccepted: !this.state.termsAccepted }, () => {
      this.props.updateState({
        terms_accepted: this.state.termsAccepted
      });
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    let terms = this.props.contract_terms_and_conditions || '';

    return (
      <section className="fields-customer" style={{ marginTop: '16px' }}>
        <header style={{ fontSize: '24px' }}>Identity Verification</header>
        <div style={{ width: '100%', marginTop: '12px', marginBottom: '12px' }}>
          Your reservation is{' '}
          {this.props.booking.confirmed
            ? 'confirmed'
            : 'being reviewed by the owner'}
          !
        </div>
        {terms.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm, '') !==
        '' ? (
          <StyledFigure>
            <div style={{ marginBottom: '28px' }}>
              Before you can access the property, we do need to review and
              accept the on-site terms & conditions, as well as verify your
              identification for security purposes. This required information
              will also be processed with the reservations teams on-site to
              ensure a seamless check-in experience.
            </div>
            <header>Additional On-Site Information</header>
            <div
              className="terms-conditions"
              dangerouslySetInnerHTML={{
                __html: this.props.contract_terms_and_conditions
              }}
            />
            <StyledCheckbox className="checkbox">
              <input
                type="checkbox"
                name="terms_accepted"
                id="terms_accepted"
                onChange={this.updateTermsAccepted}
              />
              <label htmlFor="terms_accepted">
                <span>
                  By checking this box, I acknowledge that I have read and agree
                  to the additional Terms and Conditions.
                </span>
              </label>
            </StyledCheckbox>
          </StyledFigure>
        ) : (
          <div style={{ marginBottom: '28px' }}>
            Before you can access the property, we do need to verify your
            identification below for security purposes. This required
            information will also be processed with the reservations teams
            on-site to ensure a seamless check-in experience.
          </div>
        )}
        {this.props.verify_address && (
          <StyledFigure>
            <header>Confirm Your Address</header>
            <LocationForm
              adrStreet={this.state.adrStreet}
              adrUnit={this.state.adrUnit}
              adrCity={this.state.adrCity}
              adrState={this.state.adrState}
              adrCountry={this.state.adrCountry}
              adrPostalCode={this.state.adrPostalCode}
              setLocationAttributes={this.setLocationAttributes}
            />
          </StyledFigure>
        )}
        {this.props.verify_age && (
          <StyledFigure>
            <header>Confirm Age</header>
            <StyledCheckbox className="checkbox">
              <input
                type="checkbox"
                name="verify_age"
                id="verify_age"
                onChange={this.updateAgeVerification}
              />
              <label htmlFor="verify_age">
                <span>
                  By checking this box, I acknowledge that I am at least{' '}
                  {this.props.required_age} years old.
                </span>
              </label>
            </StyledCheckbox>
          </StyledFigure>
        )}
        {this.props.verify_signature && (
          <StyledFigure>
            <header>
              <span>Electronic Signature</span>
            </header>
            <SignatureCapture {...this.props} />
          </StyledFigure>
        )}
        {this.props.verify_id && (
          <StyledFigure>
            <header>
              <span>
                Photo ID
                <figure className="regular-tooltip">
                  <i />
                  <span>
                    {' '}
                    {this.props.verify_id_description ||
                      'Please upload a valid ID to confirm the booking.'}
                  </span>
                </figure>
              </span>
            </header>
            <IdPhotoUploader {...this.props} />
          </StyledFigure>
        )}
      </section>
    );
  }
}
