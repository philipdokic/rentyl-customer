// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import BedIcon from './single/bed-amenities';

// -----------------------------------------------
// COMPONENT->BEDROOM ----------------------------
// -----------------------------------------------
export default class Bedroom extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Get Amount Amenities
  // ---------------------------------------------
  getAmountAmenities = () => {
    let amountTrue = 0;

    Object.keys(this.props.bedroom.amenities).map(amenityKey => {
      if (this.props.bedroom.amenities[amenityKey].value) {
        amountTrue++;
      }
    });

    return amountTrue;
  };

  // Render Amenity
  // ---------------------------------------------
  renderAmenity = amenityKey => {
    const translate = ReactI18n.getIntlMessage;
    const val = this.props.bedroom.amenities[amenityKey].value;

    if (val) {
      return (
        <li key={amenityKey}>
          <b>{val}</b>
          {translate(`global.bedroom_amenities.${amenityKey}`, {s: val == 1 ? '' : 's' })}
        </li>
      );
    }
  };

  // Render Icon Container
  // ---------------------------------------------
  renderIconContainer = amenityKey => {
    const val = this.props.bedroom.amenities[amenityKey].value;

    if (val) {
      return (<>{[...Array(val)].map((i) => (< BedIcon val={ val } key={i} type={amenityKey} ></BedIcon >)) }</>)
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    if (this.getAmountAmenities() > 0) {
      return (
        <figure className="details-bedroom">
          <h5>
            {this.props.bedroom.name ? this.props.bedroom.name : translate(
              `global.bedroom_type.${this.props.bedroom.bedroom_type}`
            )}
          </h5>
          {Object.keys(this.props.bedroom.amenities).map(amenityKey =>
              this.renderIconContainer(amenityKey)
            )}
          <ul>
            {Object.keys(this.props.bedroom.amenities).map(amenityKey =>
              this.renderAmenity(amenityKey)
            )}
          </ul>
          {this.props.bedroom.description}
        </figure>
      );
    } else {
      return null;
    }
  }
}
