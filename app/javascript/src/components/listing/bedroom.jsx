// Dependencies
// -----------------------------------------------
import React from 'react';
import BedIcon from './single/bed-amenities'

export default class Bedroom extends React.Component {
  constructor(props) {
    super(props);
  }

  getAmountAmenities = () => {
    let amountTrue = 0;
    Object.keys(this.props.bedroom.amenities).map(amenityKey => {
      if (this.props.bedroom.amenities[amenityKey].value) {
        amountTrue++;
      }
    });
    return amountTrue;
  };

  renderAmenity = amenityKey => {
    const translate = this.props.translate;
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


  renderIconContainer = amenityKey => {
    const val = this.props.bedroom.amenities[amenityKey].value;
    if (val) {
    return (<>{[...Array(val)].map((i) => (< BedIcon val = { val } key = { i } type = { amenityKey } ></BedIcon >)) }</>)
    }
  }

  render() {
    const translate = this.props.translate;
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
