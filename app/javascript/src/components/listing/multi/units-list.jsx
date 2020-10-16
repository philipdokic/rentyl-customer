// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import MultiUnit from '../multi-unit';

// -----------------------------------------------
// COMPONENT->MULTI-DATES-GUESTS -----------------
// -----------------------------------------------
class MultiUnitsList extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section id="details-units">
        {this.props.listing.units && this.props.listing.units.length ? (
          <table className="units-table">
            <thead>
              <tr>
                <th>{translate(`cx.details.headers.unit_info`)}</th>
                <th>{translate(`cx.details.headers.description`)}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.listing.units
                .sort((a, b) => {
                  if (a.unit.name < b.unit.name) return -1;
                  if (a.unit.name > b.unit.name) return 1;
                  return 0;
                })
                .map(unit => (
                  <MultiUnit
                    key={unit.unit.id}
                    availability={this.props.availabilities[unit.unit.id]}
                    addonFeeIds={this.props.addonFeeIds}
                    pricing={this.props.pricings[unit.unit.id]}
                    checkIn={this.props.checkIn}
                    checkOut={this.props.checkOut}
                    bookingRange={this.props.bookingRange}
                    guests={this.props.guests}
                    unit={unit}
                  />
                ))}
            </tbody>
          </table>
        ) : null}
      </section>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(MultiUnitsList);