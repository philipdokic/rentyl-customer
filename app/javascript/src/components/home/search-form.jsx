// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import Script from 'react-load-script';
import Select from 'react-select';
import get from 'lodash/get';
// import { OrganizationContext } from 'adminContexts';

// Components
// -----------------------------------------------
import DefaultRangePicker from '../date-picker';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: null,
      guests: 1,
      startDate: null,
      mapsLoaded: false,
      mapsLoading: true,
      lat: '',
      lng: '',
      address: '',
      eventSuggestions: [],
      searchLink: null
    };
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  handleSearchChange = address => {
    this.setState({ address });
    if (address.length > 3) {
      this.searchEvents(address).then(response => {
        this.setState({ eventSuggestions: response.data.events });
      });
    }
  };

  searchEvents = query => {
    return axios.get(`/events/search?query=${query}`);
  };

  checkRequiredSearchFields = () => {
    if (
      this.props.options.location_search === 'true' &&
      !(this.state.lat || this.state.lng || this.state.geoKeys)
    ) {
      this.props.setError(true);
      return false;
    }
    this.props.setError(false);
    return true;
  };

  goToSearch = e => {
    e.preventDefault();
    if (!this.checkRequiredSearchFields()) return;
    let searchLink = '/listings/search/?';
    if (this.state.startDate) {
      searchLink += '&check-in=' + this.state.startDate.format('DD-MM-YYYY');
    }
    if (this.state.endDate) {
      searchLink += '&check-out=' + this.state.endDate.format('DD-MM-YYYY');
    }
    if (this.state.guests) {
      searchLink += '&guests=' + this.state.guests;
    }
    if (this.state.geoKeys) {
      searchLink += `&${this.state.geoKeys}`;
    }
    if (this.state.lat != '' && this.state.lng != '') {
      searchLink += '&loc=' + this.state.lat + ',' + this.state.lng;
    } else if (this.state.address != '') {
      searchLink += '&loc=' + this.state.address;
    }
    this.props.history.push(searchLink);
  };

  handleMapScriptError = () => {
    this.setState({
      mapsLoaded: false,
      mapsLoading: false
    });
  };

  handleMapScriptLoad = () => {
    this.setState({
      mapsLoaded: true,
      mapsLoading: false
    });
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  isOutsideRange = day => {
    const today = moment();
    const limitEnd = moment().add(3, 'years');
    const isBeforeToday = !isInclusivelyAfterDay(day, today);
    const isAfterLimitEnd = !isInclusivelyBeforeDay(day, limitEnd);
    return isBeforeToday || isAfterLimitEnd;
  };

  onGuestsChange = e => {
    e.preventDefault();
    this.setState({ guests: e.target.value });
  };

  handleEventClick = (domEvent, event) => {
    this.setState({
      lat: event.lat,
      lng: event.lng,
      address: event.name,
      startDate: moment(event.start_date).subtract(1, 'days'),
      endDate: moment(event.end_date).add(1, 'days')
    });
  };

  renderSearchField = () => {
    if (this.props.options.location_search !== 'true') return null;
    if (this.state.mapsLoading || !this.state.mapsLoaded) return null;

    const searchType = this.props.options.location_search_type;

    if (searchType === 'text_input') {
      return this.renderTextInputSearch();
    } else if (searchType === 'dropdown' || searchType === 'custom') {
      return this.renderDropdownSearch();
    }
    return null;
  };

  renderTextInputSearch = () => {
    const inputProps = {
      placeholder:
        this.props.organization_id == 5
          ? 'Enter game or location'
          : 'All locations',
      className: 'location-search-input'
    };

    return (
      <PlacesAutocomplete
        onSelect={this.handleTextInputSelect}
        value={this.state.address}
        onChange={this.handleSearchChange}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div className="location-search">
            <label className="custom-search-input-hidden" style={{ display: 'none' }}>Location</label>
            <input {...getInputProps(inputProps)} />
            <div className="autocomplete-dropdown-container">
              {suggestions.length > 0 &&
                this.state.eventSuggestions.length > 0 &&
                this.state.eventSuggestions.map(event =>
                  this.renderEvent(event)
                )}
              {suggestions.map(suggestion => (
                <div
                  style={{ padding: '5px' }}
                  {...getSuggestionItemProps(suggestion)}
                >
                  <strong>{suggestion.formattedSuggestion.mainText}</strong>
                  <small>{suggestion.formattedSuggestion.secondaryText}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  };

  renderDropdownSearch = () => {
    const dropdownTheme = theme => ({
      ...theme,
      borderRadius: 0,
      spacing: {
        ...theme.spacing,
        menuGutter: 0
      }
    });

    const styles = {
      container: base => ({
        ...base,
        width: '100%'
      }),
      valueContainer: base => ({
        ...base,
        height: '39px',
        minHeight: '39px'
      })
    };

    return (
      <Select
        name="city"
        options={this.props.cities}
        className="city-dropdown"
        isClearable={false}
        isSearchable={false}
        placeholder="Where are you going?"
        onChange={this.handleDropdownSelect}
        styles={styles}
        theme={dropdownTheme}
      />
    );
  };

  handleTextInputSelect = (address, placeId) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({ lat, lng, address });
      });
  };

  handleDropdownSelect = option => {
    const searchType = this.props.options.location_search_type;

    if (searchType === 'custom') {
      this.setState({ geoKeys: option.value });
    } else {
      geocodeByAddress(option.value).then(results => {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      });
    }
  };

  renderEvent = event => (
    <div
      style={{ padding: '5px', zIndex: '5555' }}
      onMouseDown={uiEvent => this.handleEventClick(uiEvent, event)}
    >
      <strong>{event.name}</strong>
      <small>
        {moment
          .utc(event.start_date)
          .format(
            get(this, 'props.displayFormat') === 'DD/MM/YYYY'
              ? 'Do MMM YY'
              : 'MMM Do YY'
          )}
      </small>
    </div>
  );

  render() {
    const translate = this.props.translate;
    return (
      <figure
        className={`homepage-search-form ${
          this.props.options.location_search === 'true' ? 'with-location' : ''
        }`}
      >
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.google_maps_api_key
          }&libraries=places`}
          onError={this.handleMapScriptError.bind(this)}
          onLoad={this.handleMapScriptLoad.bind(this)}
        />
        {this.renderSearchField()}
        <DefaultRangePicker
          startPlaceholder={translate(`cx.global.check_in`)}
          endPlaceholder={translate(`cx.global.check_out`)}
          onDatesSet={this.onDatesChange}
          isOutsideRange={this.isOutsideRange}
          styles={{ width: '100%' }}
          displayFormat={this.props.displayFormat}
          startDateOverride={this.state.startDate}
          endDateOverride={this.state.endDate}
          readOnly
        />
        <figure className="select-wrapper">
          <select
            value={this.state.guests}
            onChange={e => this.onGuestsChange(e)}
          >
            {[...Array(this.props.maxGuests)].map((x, i) => (
              <option value={i + 1} key={i}>
                {translate(
                  `global.parsers.num_guests.${i > 0 ? 'plural' : 'single'}`,
                  { num: i + 1 }
                )}
              </option>
            ))}
          </select>
        </figure>
        <button
          className="button"
          style={{
            fontSize: '16px',
            fontFamily: 'Rajdhani',
            fontWeight: 600,
            height: '41px'
          }}
          onClick={this.goToSearch}
        >
          {translate(`global.actions.search`)}
        </button>
      </figure>
    );
  }
}

export default withRouter(SearchForm);

// SearchForm.contextType = OrganizationContext;
