// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import Modal from 'react-modal';
import Rater from 'react-rater';
import Sticky from 'react-stickynode';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import BookingBreakdown from './booking-breakdown';
import BookingDatePicker from './booking-date-picker';
import BookingNumGuests from './booking-num-guests';
import BookingHeader from './booking-header';
import SingleContact from './contact';
import { StarContainer } from '../../miscellaneous/';

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
// COMPONENT->BOOKING-ANCHORED -------------------
// -----------------------------------------------
class BookingAnchored extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = { contactModalOpen: false };
  }

  // Toggle Modal
  // ---------------------------------------------
  toggleModal = () =>
    this.setState({ contactModalOpen: !this.state.contactModalOpen });

  // Render
  // ---------------------------------------------
  render() {
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
              <BookingHeader pricing={this.props.pricing} />
              {this.props.listing.reviews.length > 0 && (
                <ReviewInfoContainer>
                  <StarContainer>
                    <Rater
                      interactive={false}
                      rating={parseFloat(this.props.listing.review_average)}
                    />
                  </StarContainer>
                  <label>{this.props.listing.reviews.length} Reviews</label>
                </ReviewInfoContainer>
              )}
              {this.props.datesParsed ? (
                <BookingDatePicker
                  checkInDate={this.props.checkInDate}
                  checkOutDate={this.props.checkOutDate}
                  respondToDatesChange={this.props.respondToDatesChange}
                  unitID={this.props.listing.unit.id}
                />
              ) : null}
              <BookingNumGuests
                guests={this.props.guests}
                numSleep={this.props.listing.unit.num_sleep}
                respondToGuestsChange={this.props.respondToGuestsChange}
              />
              <BookingBreakdown
                addCouponCode={this.props.addCouponCode}
                addonFeeIds={this.props.addonFeeIds}
                availability={this.props.availability}
                checkInDate={this.props.checkInDate}
                checkOutDate={this.props.checkOutDate}
                guests={this.props.guests}
                listing={this.props.listing}
                pricing={this.props.pricing}
                updateFees={this.props.updateFees}
                updateQuantityFee={this.props.updateQuantityFee}
                organizationId={this.props.organizationId}
                unitId={this.props.unitId}
              />
              {this.props.listing.property_manager && (
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
          {this.props.listing.reviews.length > 0 && (
            <ReviewInfoContainer>
              <StarContainer>
                <Rater
                  interactive={false}
                  rating={parseFloat(this.props.listing.review_average)}
                />
              </StarContainer>
              <label>{this.props.listing.reviews.length} Reviews</label>
            </ReviewInfoContainer>
          )}
          {this.props.listing.property_manager && (
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
          <SingleContact />
        </Modal>
      </div>
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
export default connect(mapStateToProps)(BookingAnchored);
