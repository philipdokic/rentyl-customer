// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->BATHROOM ---------------------------
// -----------------------------------------------
export default class Bathroom extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Get Amount Amenities
  // ---------------------------------------------
  getAmountAmenities = () => {
    let amountTrue = 0;

    this.props.bathroom.amenities && Object.keys(this.props.bathroom.amenities).map(amenityKey => {
      if (this.props.bathroom.amenities[amenityKey].value) {
        amountTrue++;
      }
    });

    return amountTrue;
  };

  // Render Amenity
  // ---------------------------------------------
  renderAmenity = amenityKey => {
    const translate = ReactI18n.getIntlMessage;
    const val = this.props.bathroom.amenities[amenityKey].value;

    if (val) {
      return (
        <li key={amenityKey}>
          <i className="highlight">✓</i>
          {translate(`global.bathroom_amenities.${amenityKey}`)}
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
        <figure className="details-bathroom">
          <h5>
            {this.props.bathroom.bathroom_type
              ? translate(
                  `global.bathroom_type.${this.props.bathroom.bathroom_type}`
                )
              : 'Full Bath'}
          </h5>
          <ul>
            {Object.keys(this.props.bathroom.amenities).map(amenityKey =>
              this.renderAmenity(amenityKey)
            )}
          </ul>
        </figure>
      );
    } else {
      return null;
    }
  }
}
