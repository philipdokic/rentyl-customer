// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PortalModal from 'sharedComponents/PortalModal';

// Components
// -----------------------------------------------
import { Link } from 'cxComponents';
import { PseudoModal } from 'cxComponents';
import { Spinner } from 'cxThemeComponents';
import DetailsMultiUnitAmenities from './details-multi-unit-amenities';
import DetailsMultiUnitAvailability from './details-multi-unit-availability';
import DetailsMultiUnitImages from './details-multi-unit-images';
import DetailsMultiUnitSummary from './details-multi-unit-summary';

export default class DetailsMultiUnit extends React.Component {
  constructor(props) {
    super(props);
  }

  buildGoToCheckoutUrl = () => {
    const checkInDateFormatted = this.props.checkIn.format('DD-MM-YYYY');
    const checkOutDateFormatted = this.props.checkOut.format('DD-MM-YYYY');
    const addonFeeIds = this.props.addonFeeIds
      ? this.props.addonFeeIds.join(',')
      : [];
    const goToCheckoutUrl =
      `/checkout/${this.props.unit.listing.id}` +
      `?check-in=${checkInDateFormatted}` +
      `&check-out=${checkOutDateFormatted}` +
      `&guests=${this.props.guests}` +
      `&addonFeeIds=${addonFeeIds}`;
    return goToCheckoutUrl;
  };

  render() {
    const translate = this.props.translate;
    const bathrooms = this.props.unit.bathrooms;
    const bedrooms = this.props.unit.bedrooms;
    const unit = this.props.unit.unit;
    const images = this.props.unit.images;
    const listing = this.props.unit.listing;
    const average_default_nightly_price = parseFloat(
      this.props.unit.average_default_nightly_price
    ).toFixed(0);
    const availability_calendar = this.props.unit.availability_calendar;
    const default_availability_changeover = this.props.unit
      .default_availability_changeover;
    const booking_calendar = this.props.unit.booking_calendar;

    return (
      <>
        {this.props.availability && this.props.availability.bookable && (
          <tr>
            <td>
              <DetailsMultiUnitImages images={images} translate={translate} />
              <h4 className="highlight">{unit.name}</h4>
              <ul className="unit-info">
                <li>
                  <b>{translate(`global.unit_type.${unit.unit_type}`)}</b>
                </li>
                <li>
                  <b>{translate('cx.global.amenities.sleeps')}:</b> {unit.num_sleep}
                </li>
                <li>
                  (
                  {translate(`cx.details.summary.num_sleep_in_beds`, {
                    num: unit.num_sleep_in_beds,
                    s: unit.num_sleep_in_beds == 1 ? '' : 's'
                  })}
                  )
                </li>
                <li>
                  <b>{translate('cx.global.amenities.bathrooms')}:</b>{' '}
                  {unit.num_bathrooms}
                </li>
                <li>
                  <b>{translate('cx.global.amenities.bedrooms')}:</b>{' '}
                  {unit.num_bedrooms}
                </li>
              </ul>
            </td>

            <td>
              {unit.summary_description ? (
                <div>
                  <div
                    className="truncated"
                    dangerouslySetInnerHTML={{ __html: unit.summary_description }}
                  />
                  <PortalModal
                    header={unit.name}
                    openByClickOn={openPortal => (
                      <a onClick={openPortal}>
                        {translate(`global.actions.expand`)}
                      </a>
                    )}
                  >
                    <div className="details-modal">
                      <DetailsMultiUnitSummary
                        bathrooms={bathrooms}
                        bedrooms={bedrooms}
                        unit={unit}
                        translate={translate}
                      />
                      <DetailsMultiUnitAmenities
                        unit={unit}
                        translate={translate}
                      />
                      <DetailsMultiUnitAvailability
                        availability_calendar={availability_calendar}
                        default_availability={default_availability_changeover}
                        booking_calendar={booking_calendar}
                        translate={translate}
                      />
                    </div>
                  </PortalModal>
                </div>
              ) : null}
            </td>
            <td>
              <figure className="unit-pricing-booking">
                {this.props.pricing && this.props.pricing.total ? (
                  <b>
                    {translate(
                      `global.parsers.currency_avg_night.${listing.currency}`,
                      { value: this.props.pricing.average_nightly_price }
                    )}
                  </b>
                ) : (
                  <b>
                    {translate(
                      `global.parsers.currency_avg_night.${listing.currency}`,
                      {
                        value: parseFloat(average_default_nightly_price).toFixed(0)
                      }
                    )}
                  </b>
                )}
                {this.props.availability.instant_booking ? (
                  <Link to={this.buildGoToCheckoutUrl()} className="button">
                    {translate(`cx.global.book.long`)}
                  </Link>
                ) : (
                  <Link to={this.buildGoToCheckoutUrl()} className="button">
                    {translate(`cx.global.book_inquiry.long`)}
                  </Link>
                )}
                <small>{translate(`cx.details.no_charge`)}</small>
              </figure>
            </td>
          </tr>
        )}
      </>
    );
  }
}
