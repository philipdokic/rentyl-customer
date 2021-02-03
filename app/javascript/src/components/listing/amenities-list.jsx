// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Styles
// -----------------------------------------------
const AmenitiesSubHeader = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

// -----------------------------------------------
// COMPONENT->AMENITIES-LIST ---------------------
// -----------------------------------------------
export default class AmenitiesList extends React.Component {
  constructor(props) {
    super(props);
  }

  // Get Amount Amenities
  // ---------------------------------------------
  getAmountAmenities = () => {
    let amountTrue = 0;
    Object.keys(this.props.features).map(featureKey => {
      if (this.props.features[featureKey].value) {
        amountTrue++;
      }
    });
    return amountTrue;
  };

  // Render Feature
  // ---------------------------------------------
  renderFeature = (featureKey, featureType, featureList) => {
    const translate = ReactI18n.getIntlMessage;
    const val = featureList[featureKey].value;

    if (val) {
      return (
        <li key={featureKey}>
          <i className="highlight">✓</i>
          {translate(`global.features.${featureType}.${featureKey}`)}
        </li>
      );
    }
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    if (this.getAmountAmenities() > 0) {
      return (
        <div className="amenities-list subsection">
          <AmenitiesSubHeader>
            {translate(`global.features.${this.props.features_label}.label`)}
          </AmenitiesSubHeader>
          <ul>
            {Object.keys(this.props.features).map(featureKey =>
              this.renderFeature(
                featureKey,
                this.props.features_label,
                this.props.features
              )
            )}
          </ul>
        </div>
      );
    }
    return null;
  }
}