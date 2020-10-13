// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import Modal from 'react-modal';
import Rater from 'react-rater';
import ReactI18n from 'react-i18n';
import Sticky from 'react-stickynode';
import styled from 'styled-components';


// Components
// -----------------------------------------------
import BookingBreakdown from './booking-breakdown';
import BookingDatePicker from './booking-date-picker';
import BookingNumGuests from './booking-num-guests';
import BookingHeader from './booking-header';
// import DetailsSingleContact from './details-contact';

// import { StarContainer } from 'cxThemeComponents';

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
    const translate = ReactI18n.getIntlMessage;
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
                  {/* <StarContainer>
                    <Rater
                      rating={parseFloat(this.props.listing.review_average)}
                      interactive={false}
                    />
                  </StarContainer> */}
                  <label>{this.props.listing.reviews.length} Reviews</label>
                </ReviewInfoContainer>
              )}
              {this.props.datesParsed ? (
                <BookingDatePicker
                  checkInDate={this.props.checkInDate}
                  checkOutDate={this.props.checkOutDate}
                  respondToDatesChange={this.props.respondToDatesChange}
                />
              ) : null}
              <BookingNumGuests
                guests={this.props.guests}
                respondToGuestsChange={this.props.respondToGuestsChange}
              />
              <BookingBreakdown
                addonFeeIds={this.props.addonFeeIds}
                availability={this.props.availability}
                checkInDate={this.props.checkInDate}
                checkOutDate={this.props.checkOutDate}
                guests={this.props.guests}
                updateFees={this.props.updateFees}
                updateQuantityFee={this.props.updateQuantityFee}
                addCouponCode={this.props.addCouponCode}
              />

              {/* {this.props.propertyManager && (
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
              )} */}
            </section>
          </Sticky>
        </MediaQuery>
        {/* <MediaQuery query="(max-width: 959px)">
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
        </Modal> */}
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
