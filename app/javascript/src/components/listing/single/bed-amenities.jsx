import React from 'react';

export default class BedAmenities extends React.Component {
  render() {
    const beds = {
      AMENITY_TWIN_SINGLE: 'twin-icon',
      AMENITY_DOUBLE: 'double-icon',
      AMENITY_QUEEN: 'king-icon',
      AMENITY_KING: 'king-icon',
      AMENITY_BUNK_BED: 'bunk-icon',
      AMENITY_MURPHY_BED: 'murphy-icon',
      AMENITY_SLEEP_SOFA: 'couch-icon',
      AMENITY_CHILD_BED: 'crib-icon',
      AMENITY_CRIB: 'crib-icon'
    }
    return (
      <i className={`feature-icon ${beds[this.props.type]}`} />
    )
  }
}
