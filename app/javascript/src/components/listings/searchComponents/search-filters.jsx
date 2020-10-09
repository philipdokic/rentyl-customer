// Dependencies
// -----------------------------------------------
import React from 'react';
import moment from 'moment';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import DefaultRangePicker from '../resources/DefaultRangePicker';
import MediaQuery from 'react-responsive';
import { Range } from 'rc-slider';
import { get, times } from 'lodash';
import styled from 'styled-components';
import Popover from './popover';
import SearchAmenitiesFilterSidebar from './search-amenities-filter-sidebar';
import amenitiesList from '../resources/amenities_list.json';

// Components
// -----------------------------------------------
// import { IndicatorToggle } from 'cxThemeComponents';

// Styled Components
// -----------------------------------------------
const InstantBookingContainer = styled.figure`
  display: flex;
  align-items: center;
  min-height: 41px;

  .bolt-icon {
    width: 12px;
    height: 20px;
  }
`;

// -----------------------------------------------
// COMPONENT->SEARCH-FILTERS ---------------------
// -----------------------------------------------
export default class SearchFilters extends React.Component {
  // ---------------------------------------------
  // CONSTRUCTOR ---------------------------------
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.checkIn || null,
      endDate: this.props.checkOut || null,
      expandedFilter: null,
      sideBarOpen: false
    };
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  toggleFilterMenu = e => {
    e.preventDefault;
    this.props.updateVisiblity('filters');
  };

  updateFilter = e => {
    e.preventDefault();
    this.props.updateFilter(e.target.name, parseInt(e.target.value));
  };

  updatePriceFilters = val => {
    this.props.updatePriceFilters(val[0], val[1]);
  };

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.props.respondToDatesChange(this.state.startDate, this.state.endDate);
    });
  }

  onGuestsChange = e => {
    e.preventDefault();
    this.props.respondToGuestsChange(e.target.value);
  };

  isOutsideRange = day => {
    const today = moment();
    const limitEnd = moment().add(3, 'years');
    const isBeforeToday = !isInclusivelyAfterDay(day, today);
    const isAfterLimitEnd = !isInclusivelyBeforeDay(day, limitEnd);
    return isBeforeToday || isAfterLimitEnd;
  };

  renderHandle = props => {
    const translate = this.props.translate;
    const currency = this.props.currency;
    const { value, dragging, index, offset, ...restProps } = props;
    return (
      <div
        className={`rc-slider-handle rc-slider-handle-${index}`}
        key={index}
        style={{ left: `${offset}%` }}
      >
        <figure className="tooltip">
          {translate(`global.parsers.currency.${currency}`, { value: value })}
        </figure>
      </div>
    );
  };

  toggleExpandFilter = name => {
    this.setState({
      expandedFilter: this.state.expandedFilter === name ? null : name
    });
  };

  toggleSideBarOpen = () =>
    this.setState({ sideBarOpen: !this.state.sideBarOpen });

  renderFilters = isNarrow => {
    const translate = this.props.translate;
    if ( !this.state.startDate && this.props.checkIn ){
      this.state.startDate = this.props.checkIn || null;
      this.state.endDate = this.props.checkOut || null;
    }
    return (
      <ul>
        <li>
          {isNarrow ? (
            <label>
              - <span>{translate('cx.search.filter.dates')}</span>-{' '}
            </label>
          ) : null}
          <DefaultRangePicker
            startPlaceholder={translate(`cx.global.check_in`)}
            endPlaceholder={translate(`cx.global.check_out`)}
            initialStartDate={this.state.startDate}
            initialEndDate={this.state.endDate}
            onDatesSet={this.onDatesChange}
            isOutsideRange={this.isOutsideRange}
            displayFormat={get(this, 'props.displayFormat', 'MM/DD/YYYY').slice(
              0,
              5
            )}
            readOnly
          />
        </li>
        <li>
          {isNarrow ? (
            <label>
              - <span>{translate('cx.search.filter.num_bedrooms')}</span>-{' '}
            </label>
          ) : null}
          <figure className="select-wrapper">
            <select
              className="bed"
              value={this.props.filter_numBedrooms}
              name="filter_numBedrooms"
              onChange={e => this.updateFilter(e)}
            >
              {times(this.props.maxBedrooms, count => (
                <option key={count} value={count + 1}>
                  {count > 0 ? translate(`global.parsers.num_bedrooms.plural`, {
                    num: count + 1
                  }) : translate(`global.bedroom_type.bedroom`)}
                </option>
              ))}
              ;
            </select>
          </figure>
        </li>
        <li>
          {isNarrow ? (
            <label>
              - <span>{translate('cx.search.filter.num_bathrooms')}</span>-{' '}
            </label>
          ) : null}
          <figure className="select-wrapper">
            <select
              className="bath"
              value={this.props.filter_numBathrooms}
              name="filter_numBathrooms"
              onChange={e => this.updateFilter(e)}
            >
              {times(this.props.maxBaths, count => (
                <option key={count} value={count + 1}>
                  {count > 0 ? translate(`global.parsers.num_bathrooms_short.plural`, {
                    num: count + 1
                  }) : translate(`cx.global.amenities.bathroom`) }
                </option>
              ))}
              ;
            </select>
          </figure>
        </li>
        <li>
          {isNarrow ? (
            <label>
              - <span>{translate('cx.search.filter.num_guests')}</span>-{' '}
            </label>
          ) : null}
          <figure className="select-wrapper">
            <select
              className="guest"
              value={this.props.guests}
              onChange={e => this.onGuestsChange(e)}
            >
              {times(this.props.maxGuests, count => {
                let translateText =
                  count == 0
                    ? `cx.receipt.guests`
                    : `global.parsers.num_guests.plural`;
                return (
                  <option key={count} value={count + 1}>
                    {translate(translateText, { num: count + 1 })}
                  </option>
                );
              })}
            </select>
          </figure>
        </li>
        <li>
          {isNarrow ? (
            <label>
              - <span>Distance from search location</span>-{' '}
            </label>
          ) : null}
          <figure className="select-wrapper">
            <select
              className="distance"
              value={this.props.filter_distance}
              name="filter_distance"
              onChange={e => this.updateFilter(e)}
            >
              {times(10, count => (
                <option key={count} value={count}>
                  {count == 0 ? 'Not set' : `${count} miles`}
                </option>
              ))}
              ;
            </select>
          </figure>
        </li>
        <li>
          {isNarrow ? (
            [
              <label>Instant Booking Only</label>,
              <InstantBookingContainer>
                {/* <IndicatorToggle
                  name="instant_booking_only"
                  toggleAction={this.props.toggleInstantBooking}
                  toggleStatus={this.props.instantBookingOnly}
                  toggleItemId={0}
                  toggleFalseLabel=""
                  toggleTrueLabel=""
                /> */}
                <i className="bolt-icon"></i>
              </InstantBookingContainer>
            ]
          ) : (
            <Popover label="Instant&nbsp;Booking&nbsp;Only">
              <InstantBookingContainer>
                {/* <IndicatorToggle
                  name="instant_booking_only"
                  toggleAction={this.props.toggleInstantBooking}
                  toggleStatus={this.props.instantBookingOnly}
                  toggleItemId={0}
                  toggleFalseLabel=""
                  toggleTrueLabel=""
                /> */}
                <i className="bolt-icon"></i>
              </InstantBookingContainer>
            </Popover>
          )}
        </li>

        {this.props.max_price && this.props.min_price !== null ? (
          <li>
            {isNarrow ? (
              [
                <label>
                  <span>{translate(`cx.search.filter.nightly_price`)}</span>
                </label>,
                <div className="rc-slider-container">
                  <Range
                    allowCross={false}
                    value={[
                      this.props.filter_priceLow || this.props.min_price,
                      this.props.filter_priceHigh || this.props.max_price
                    ]}
                    max={this.props.max_price}
                    min={this.props.min_price}
                    onChange={this.updatePriceFilters}
                    onAfterChange={this.props.fetchSearchData}
                    handle={this.renderHandle}
                  />
                </div>
              ]
            ) : (
              <Popover label="Price">
                <div className="rc-slider-container">
                  <Range
                    allowCross={false}
                    value={[
                      this.props.filter_priceLow || this.props.min_price,
                      this.props.filter_priceHigh || this.props.max_price
                    ]}
                    max={this.props.max_price}
                    min={this.props.min_price}
                    onChange={this.updatePriceFilters}
                    onAfterChange={this.props.fetchSearchData}
                    handle={this.renderHandle}
                  />
                </div>
              </Popover>
            )}
          </li>
        ) : (
          <li />
        )}
        <li>
          <figure
            className="popover-button more-button"
            onClick={this.toggleSideBarOpen}
          >
            <label>More Filters</label>
          </figure>
        </li>
      </ul>
    );
  };

  render() {
    const translate = this.props.translate;
    return (
      <figure className={"search-filters " + (this.props.view ==='map' ? '' : 'search-sidebar')}>
        <SearchAmenitiesFilterSidebar
          toggleSideBarOpen={this.toggleSideBarOpen}
          open={this.state.sideBarOpen}
          amenitiesList={amenitiesList}
          setAmenities={(amenities, simpleList) =>
            this.props.updateFilter('amenities', amenities, simpleList)
          }
          selectedAmenities={this.props.selectedAmenities}
        />
        <MediaQuery query="(max-width: 799px)">
          <div className="filters-toggleable">
            <h3>
              <a
                className="button muted"
                href="#"
                onClick={e => this.toggleFilterMenu(e)}
              >
                {translate(`cx.search.filter.label.long`)}
              </a>
            </h3>
            {this.props.visible ? (
              <div className="filters-overlay">
                <a
                  href="#"
                  className="close-link"
                  onClick={e => this.toggleFilterMenu(e)}
                >
                  ×
                </a>
                {this.renderFilters(true)}
                <a
                  href="#"
                  className="filters-close"
                  onClick={e => this.toggleFilterMenu(e)}
                >
                  {translate(`global.actions.close`)}
                </a>
              </div>
            ) : null}
          </div>
        </MediaQuery>
        <MediaQuery query="(min-width: 800px)">
          <div className="filters-exposed">
            {this.props.view !== 'map' && (
              <h5 style={{fontWeight: 600, margin: '0 0 8px'}}>Search</h5>
            )}
            {this.renderFilters(false)}
          </div>
        </MediaQuery>
      </figure>
    );
  }
}
