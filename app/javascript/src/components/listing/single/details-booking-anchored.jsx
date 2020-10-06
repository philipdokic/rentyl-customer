// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Sticky from 'react-stickynode';
import styled from 'styled-components';
import Rater from 'react-rater';
import Modal from 'react-modal';

// Components
// -----------------------------------------------
import DetailsBookingBreakdown from './details-booking-breakdown';
import DetailsBookingDatePicker from './details-booking-date-picker';
import DetailsBookingNumGuests from './details-booking-num-guests';
import DetailsBookingHeader from './details-booking-header';
import DetailsSingleContact from './details-contact';
import { StarContainer } from 'cxThemeComponents';

// Styled Components
// -----------------------------------------------
const ReviewInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 256px;
  margin: 0 auto;
  align-items: center;
  padding: 4px 0;

  label {
    margin-left: 8px;
    font-size: 12px;
  }

  @media (max-width: 959px) {
    position: absolute;
    right: 16px;
    top: 12px;
    z-index: 12;
  }
`;

// -----------------------------------------------
// COMPONENT->DETAILS-SINGLE-BOOKING-ANCHORED ----
// -----------------------------------------------
export default class DetailsSingleBookingAnchored extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contactModalOpen: false };
  }

  toggleModal = () =>
    this.setState({ contactModalOpen: !this.state.contactModalOpen });

  render() {
    const translate = this.props.translate;
    const modalStyles = {
      overlay: {
        zIndex: 999999999,
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      },
      content: {
        position: 'relative',
        flex: '0 1 575px',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        boxShadow: '0px 2px 3px 0px rgba(0,0,0,0.25)',
        borderRadius: 0,
        padding: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start'
      }
    };
    const isGameday = this.props.organizationId === 5;
    return (
      <div>
        <MediaQuery query="(min-width: 960px)">
          <Sticky>
            <section className="details-booking">
              <DetailsBookingHeader
                average_default_nightly_price={
                  this.props.average_default_nightly_price
                }
                listing={this.props.listing}
                pricing={this.props.pricing}
                translate={translate}
              />

              {this.props.reviewCount > 0 && (
                <ReviewInfoContainer>
                  <StarContainer>
                    <Rater
                      rating={this.props.reviewAverage}
                      interactive={false}
                    />
                  </StarContainer>
                  <label>{this.props.reviewCount} Reviews</label>
                </ReviewInfoContainer>
              )}

              {this.props.datesParsed ? (
                <DetailsBookingDatePicker
                  availability_calendar={this.props.availability_calendar}
                  booking_calendar={this.props.booking_calendar}
                  default_availability={this.props.default_availability}
                  checkInDate={this.props.checkInDate}
                  checkOutDate={this.props.checkOutDate}
                  listing={this.props.listing}
                  pricing={this.props.pricing}
                  respondToDatesChange={this.props.respondToDatesChange}
                  unit_availability={this.props.unit_availability}
                  translate={translate}
                  unitID={this.props.listing.unit_id}
                  organizationID={this.props.organizationId}
                  displayFormat={this.props.displayFormat}
                />
              ) : null}
              <DetailsBookingNumGuests
                guests={this.props.guests}
                respondToGuestsChange={this.props.respondToGuestsChange}
                translate={translate}
                numSleep={this.props.numSleep}
              />
              <DetailsBookingBreakdown
                addonFeeIds={this.props.addonFeeIds}
                availability={this.props.availability}
                checkInDate={this.props.checkInDate}
                checkOutDate={this.props.checkOutDate}
                guests={this.props.guests}
                listing={this.props.listing}
                pricing={this.props.pricing}
                translate={translate}
                updateFees={this.props.updateFees}
                updateQuantityFee={this.props.updateQuantityFee}
                addCouponCode={this.props.addCouponCode}
                organizationId={this.props.organizationId}
                unitId={this.props.unitId}
              />
              {this.props.propertyManager && (
                <a
                  id="contact-owner"
                  className="button"
                  href="#"
                  onClick={this.toggleModal}
                  style={{
                    display: `${isGameday ? 'block' : 'none'}`,
                    backgroundColor: 'white'
                  }}
                >
                  Contact Owner
                </a>
              )}
            </section>
          </Sticky>
        </MediaQuery>
        <MediaQuery query="(max-width: 959px)">
          {this.props.reviewCount > 0 && (
            <ReviewInfoContainer>
              <StarContainer>
                <Rater rating={this.props.reviewAverage} interactive={false} />
              </StarContainer>
              <label>{this.props.reviewCount} Reviews</label>
            </ReviewInfoContainer>
          )}
          {this.props.propertyManager && (
            <a
              id="contact-owner"
              className="button"
              href="#"
              onClick={this.toggleModal}
              style={{ display: 'none' }}
            />
          )}
        </MediaQuery>
        <Modal
          isOpen={this.state.contactModalOpen}
          style={modalStyles}
          onRequestClose={this.toggleModal}
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <a
            className="modal-close"
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              padding: '10px'
            }}
            onClick={this.toggleModal}
          >
            ×
          </a>
          <DetailsSingleContact
            unit_listing_id={this.props.listing.id}
            property_id={this.props.propertyId}
            organization_id={this.props.organizationId}
            unit_id={this.props.listing.unit_id}
            displayFormat={this.props.displayFormat}
          />
        </Modal>
      </div>
    );
  }
}
