// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class DetailsAmenitiesList extends React.Component {
  constructor(props) {
    super(props);
  }

  getAmountAmenities = () => {
    let amountTrue = 0;
    Object.keys(this.props.features).map(featureKey => {
      if (this.props.features[featureKey].value) {
        amountTrue++;
      }
    });
    return amountTrue;
  };

  renderFeature = (featureKey, featureType, featureList) => {
    const translate = this.props.translate;
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

  render() {
    const translate = this.props.translate;
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

const AmenitiesSubHeader = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
