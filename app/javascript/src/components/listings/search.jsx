// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import { isInclusivelyBeforeDay } from 'react-dates';
import { max, isNull } from 'lodash';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import ReactI18n from 'react-i18n';
import ReactPaginate from 'react-paginate';
import Script from 'react-load-script';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import AmenitiesList from './resources/amenities_list.json';
import { Intercom } from '../miscellaneous/';
import Meta from './meta';
import {
  SearchInfo,
  SearchList,
  SearchMap,
  SearchMapToggle,
  SearchSortFilters,
  SearchSort,
  SearchTiles
} from './searchComponents';
import { ThLarge, ThList, Map } from './resources/icons';

// Redux
// -----------------------------------------------
import * as brandAction from '../../redux/action/brand'
import * as listingsAction from '../../redux/action/listings'

// -----------------------------------------------
// COMPONENT->SEARCH -----------------------------
// -----------------------------------------------
class ThemeDefaultSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkIn: null,
      checkOut: null,
      geoNELat: null,
      geoNELon: null,
      geoSWLat: null,
      geoSWLon: null,
      loc: null,
      min_price: null,
      max_price: null,
      guests: 1,
      sort: null,
      searchWithMap: false,
      filter_numBedrooms: 0,
      filter_numBathrooms: 1,
      filter_instantBook: false,
      filter_priceLow: null,
      filter_priceHigh: null,
      zoom: null,
      results: null,
      resultsLength: null,
      filteredResults: this.props.listings,
      isDirty: false,
      isLoading: false,
      isLoaded: false,
      mapsLoaded: false,
      mapsLoading: true,
      filter_distance: 0,
      pageOffset: 0,
      totalPages: 1,
      currentPage: 0,
      totalProperties: 0,
      filtersSet: false,
      datesSet: false,
      instantBookingOnly: false,
      sortVisible: false,
      amenities: {},
      selectedAmenities: null,
      view: null,
      maxBaths: null,
      maxBedrooms: null,
      maxGuests: null
    };
  }

  pageSetup() {
    var view = 'list';
    if (this.props.match.path.includes('grid')) {
      view = 'grid';
    }
    if (this.props.match.path.includes('map')) {
      view = 'map';
    }
    if (window.innerWidth < 640) {
      view = 'map';
    }
    this.setState({ view: view });
  }

  componentDidMount() {
    this.handleBrowserState();
    window.onpopstate = this.handleBrowserState;
    //this.fetchListingsData(this.props);
    Intercom(this.props.intercom_id);
    document.body.classList.add('search-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('listings-view');
    this.pageSetup();
    window.customJavascriptLoad();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.path !== prevProps.match.path) { // means the search type changed
      this.pageSetup();
    } else if (this.props.location.search !== prevProps.location.search) { // the query params changed
      this.handleBrowserState();
      this.pageSetup();
    }
  }

  // fetchListingsData = props => {
  //   axios.get('/api/organizations')
  //   .then(response => {
  //     props.dispatch(brandAction.setBrand(response.data))
  //     axios.get(`/api/listings?brand=${response.data.brand.id}`, {
  //       headers: {'Content-Type': 'application/json'}
  //     })
  //     .then(res => {
  //       props.dispatch(listingsAction.setListings(res.data))
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // };

  calculateMaxes = () => {
    if (this.state.results) {
      const maxGuests = max(
        this.state.results.map(result => result.listings[0].unit.num_sleep)
      );
      const maxBedrooms = max(
        this.state.results.map(result => result.num_bedrooms)
      );
      const maxBaths = max(
        this.state.results.map(result => result.num_bathrooms)
      );
      this.setState({ maxGuests, maxBaths, maxBedrooms });
    }
  };

  handleBrowserState = () => {
    const queryInfo = this.parseQuery();
    this.setState(
      {
        bookingRange: queryInfo.bookingRange || null,
        checkIn: queryInfo.checkIn || null,
        checkOut: queryInfo.checkOut || null,
        geoNELat: queryInfo.geoNELat || null,
        geoNELon: queryInfo.geoNELon || null,
        geoSWLat: queryInfo.geoSWLat || null,
        geoSWLon: queryInfo.geoSWLon || null,
        guests: queryInfo.guests || 1,
        loc: queryInfo.loc || null,
        sort: queryInfo.sort || null,
        zoom: queryInfo.zoom || 13,
        distance: queryInfo.distance || null,
        selectedAmenities: queryInfo.selectedAmenities || null,
        amenities: this.getAmenitiesFromParams(queryInfo.selectedAmenities),
        isDirty: true
      },
      () => {
        this.fetchSearchData();
      }
    );
  };

  getAmenitiesFromParams = amenities => {
    if (!amenities || !amenities.length) return null;
    return amenities.reduce(
      (seed, amenity) => {
        const entry = AmenitiesList[amenity];
        seed[entry[0].model] = seed[entry[0].model].concat(entry);
        return seed;
      },
      { Property: [], Unit: [] }
    );
  };

  parseQuery = () => {
    const parsedQuery = queryString.parse(location.search);
    let queryInfo = {};
    let defaultSort = 'default';
    //Dates
    if (parsedQuery['check-in'] && parsedQuery['check-out']) {
      queryInfo['checkIn'] = moment(parsedQuery['check-in'], 'DD-MM-YYYY');
      queryInfo['checkOut'] = moment(parsedQuery['check-out'], 'DD-MM-YYYY');

      let bookingRange = [];
      let d = queryInfo['checkIn'].clone();
      while (isInclusivelyBeforeDay(d, queryInfo['checkOut'])) {
        bookingRange.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      queryInfo['bookingRange'] = bookingRange;
    }
    //Location
    if (
      parsedQuery['geo-ne-lat'] &&
      parsedQuery['geo-ne-lon'] &&
      parsedQuery['geo-sw-lat'] &&
      parsedQuery['geo-sw-lon']
    ) {
      queryInfo['geoNELat'] = JSON.parse(parsedQuery['geo-ne-lat']);
      queryInfo['geoNELon'] = JSON.parse(parsedQuery['geo-ne-lon']);
      queryInfo['geoSWLat'] = JSON.parse(parsedQuery['geo-sw-lat']);
      queryInfo['geoSWLon'] = JSON.parse(parsedQuery['geo-sw-lon']);
    } else if (parsedQuery['loc']) {
      queryInfo['loc'] = decodeURIComponent(parsedQuery['loc']);
    }
    //Num Guests
    if (parsedQuery['guests']) {
      queryInfo['guests'] = parsedQuery['guests'];
    }
    //Zoom
    if (parsedQuery['zoom']) {
      queryInfo['zoom'] = parseInt(parsedQuery['zoom']);
    } else {
      queryInfo['zoom'] = 14;
    }
    if (parsedQuery.amenities) {
      queryInfo.selectedAmenities = parsedQuery.amenities.split(',');
    }
    //Sort
    if (this.props.brand.organization_id === 52) {
      defaultSort = 'name';
    }
    queryInfo['sort'] = parsedQuery['sort'] || defaultSort;
    return queryInfo;
  };

  fetchPropertyData = () => {
    const queryParams = this.createQueryParams();
    axios.get(`${process.env.DIRECT_URL}/api/v2/properties${queryParams}`,{
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      const data=response.data
      this.setState(
        {
          results: data.results,
          resultsLength: data.results.length,
          isLoading: false,
          isDirty: false,
          isLoaded: true,
          geoNELat: data.bounds ? data.bounds.ne.lat : null,
          geoNELon: data.bounds ? data.bounds.ne.lng : null,
          geoSWLat: data.bounds ? data.bounds.sw.lat : null,
          geoSWLon: data.bounds ? data.bounds.sw.lng : null,
          geoCenterLat: data.center ? data.center[0] : null,
          geoCenterLon: data.center ? data.center[1] : null,
          max_price: data.max_price || null,
          min_price: data.min_price || 0,
          maxBaths: data.max_baths,
          maxBedrooms: data.max_bedrooms,
          maxGuests: data.max_guests,
          totalPages: data.total_pages,
          totalProperties: data.total_properties,
          datesSet: !(
            data.results[0] && data.results[0].search_type === 'dateless'
          )
        },
        () => {
          this._div.scrollTop = 0;
          if (
            isNull(this.state.maxBaths) ||
            isNull(this.state.maxBedrooms) ||
            isNull(this.state.maxGuests)
          ) {
            this.calculateMaxes();
          }
        }
      );
    });
  };

  createQueryParams = () => {
    return (
      '?' +
      queryString.stringify({
        brand_id: this.props.brand.id,
        booking_range: JSON.stringify(this.state.bookingRange),
        geo_ne_lat: this.state.geoNELat,
        geo_ne_lon: this.state.geoNELon,
        geo_sw_lat: this.state.geoSWLat,
        geo_sw_lon: this.state.geoSWLon,
        loc: this.state.loc,
        sort: this.state.sort,
        distance: this.state.distance,
        page: this.state.currentPage + 1,
        limit: 18,
        num_bedrooms: this.state.filter_numBedrooms,
        num_bathrooms: this.state.filter_numBathrooms,
        num_guests: this.state.guests,
        instant_book: this.state.filter_instantBook,
        price_low: this.state.filter_priceLow,
        price_high: this.state.filter_priceHigh,
        distance: this.state.filter_distance,
        amenities: JSON.stringify(this.state.amenities)
      })
    );
  };

  fetchSearchData = () => {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true, isLoaded: false }, () => {
        this.fetchPropertyData();
        // Moved this data to a new method to keep for prosperity for
        // Fixing any potential bugs introduced with new search method
        // this.oldFetchData();
      });
    }
  };

  getStringifiedQueryString = () => {
    let queryInfo = {};
    //Dates
    if (this.state.checkIn && this.state.checkOut) {
      queryInfo['check-in'] = this.state.checkIn.format('DD-MM-YYYY');
      queryInfo['check-out'] = this.state.checkOut.format('DD-MM-YYYY');
    }
    //Location
    if (
      this.state.geoNELat &&
      this.state.geoNELon &&
      this.state.geoSWLat &&
      this.state.geoSWLon
    ) {
      queryInfo['geo-ne-lat'] = this.state.geoNELat;
      queryInfo['geo-ne-lon'] = this.state.geoNELon;
      queryInfo['geo-sw-lat'] = this.state.geoSWLat;
      queryInfo['geo-sw-lon'] = this.state.geoSWLon;
    } else if (this.state.loc) {
      queryInfo['loc'] = this.state.loc;
    }
    //Num Guests
    if (this.state.guests && this.state.guests > 0) {
      queryInfo['guests'] = this.state.guests;
    }
    //Zoom
    if (this.state.zoom) {
      queryInfo['zoom'] = this.state.zoom;
    }
    //Sort
    if (this.state.sort) {
      queryInfo['sort'] = this.state.sort;
    }
    //Amenities
    if (this.state.selectedAmenities) {
      queryInfo.amenities = this.state.selectedAmenities.join(',');
    }
    const stringifiedQueryString = '?' + queryString.stringify(queryInfo);
    return stringifiedQueryString;
  };

  updateQueryString = () => {
    const stringifiedQueryString = this.getStringifiedQueryString();
    history.pushState(null, null, stringifiedQueryString);
  };

  updateFilter = (name, val, selectedAmenities) => {
    let stateChange = { filtersSet: true };
    stateChange[name] = val;
    if (selectedAmenities) stateChange.selectedAmenities = selectedAmenities;
    this.setState(stateChange, () => {
      this.updateQueryString();
      this.fetchSearchData();
    });
  };

  updatePriceFilters = (low, high) => {
    this.setState({
      filter_priceLow: low,
      filter_priceHigh: high
    });
  };

  updateSort = val => {
    this.setState({ sort: val }, () => {
      this.updateQueryString();
      this.fetchSearchData();
    });
  };

  toggleSortVisible = () =>
    this.setState({ sortVisible: !this.state.sortVisible });

  updateBounds = (geoNELat, geoNELon, geoSWLat, geoSWLon) => {
    this.setState(
      {
        geoNELat: geoNELat,
        geoNELon: geoNELon,
        geoSWLat: geoSWLat,
        geoSWLon: geoSWLon
      },
      () => {
        this.updateQueryString();
        this.fetchSearchData();
        this.calculateMaxes();
      }
    );
  };

  updateZoom = zoom => {
    this.setState({ zoom: zoom }, () => {
      this.updateQueryString();
    });
  };

  respondToDatesChange = (checkInDate, checkOutDate) => {
    if (isInclusivelyBeforeDay(checkInDate, checkOutDate)) {
      let bookingRange = [];
      let d = checkInDate.clone();
      while (isInclusivelyBeforeDay(d, checkOutDate)) {
        bookingRange.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      this.setState(
        {
          bookingRange: bookingRange,
          bookingLength: bookingRange.length - 1,
          checkIn: checkInDate,
          checkOut: checkOutDate
        },
        () => {
          if (this.state.bookingRange) {
            this.updateQueryString();
            this.fetchSearchData();
            this.calculateMaxes();
          }
        }
      );
    }
  };

  respondToGuestsChange = guests => {
    this.setState(
      {
        guests: guests
      },
      () => {
        this.updateQueryString();
        this.fetchSearchData();
        this.calculateMaxes();
      }
    );
  };

  toggleSearchWithMap = () => {
    this.setState({ searchWithMap: !this.state.searchWithMap });
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

  handlePageClick = data => {
    const newPage = data.selected;
    let offset = Math.ceil(data.selected * 18);
    this.setState(
      { pageOffset: offset, currentPage: newPage },
      this.fetchSearchData()
    );
  };

  toggleInstantBooking = (id, status) => {
    const stateChange = {
      instantBookingOnly: !status,
      filter_instantBook: !status
    };

    if (!this.state.filtersSet) {
      stateChange['filtersSet'] = true;
    }
    this.setState(stateChange, this.fetchSearchData);
  };

  showTotalProperties = () => {
    const over300 =
      this.state.totalProperties && this.state.totalProperties > 300;
    return over300 ? '300+ results' : `${this.state.totalProperties} results`;
  };

  parsePageOffset = () => {
    const offset = parseInt(this.state.pageOffset) + 1;
    const resultsLength = this.state.resultsLength
      ? this.state.resultsLength
      : '';
    const endItem =
      this.state.totalProperties <= 18
        ? this.state.totalProperties
        : offset + resultsLength - 1;
    return `${offset} - ${endItem} of ${this.showTotalProperties()}`;
  };

  render() {
    const translate = ReactI18n.getIntlMessage;

    const PaginationContainer = styled.div`
      .break-me {
        pointer-events: none;
      }
      @media (max-width: 500px) {
        margin: 0 auto;

        .break-me,
        .hide-on-mobile {
          display: none !important;
        }
      }
      width: 100%;
      margin-bottom: 100px;
      ul {
        margin-top: 16px;
        margin-bottom: 16px;
      }
      li {
        display: inline;
      }
    `;

    const SidebarWrapper = styled.div`
      margin-right: 4%;
      width: 24%;
    `;

    const ListingsWrapper = styled.div`
      width: 72%;

      @media (max-width: 640px) {
        width: 100%;
      }
    `;

    const LayoutViewNav = styled.div`
      border: 1px solid rgba(0,0,0,0.15);
      height: 26px;
      margin: 8px 0 8px 8px;

      @media (max-width: 640px) {
        display: none;
        visibility: hidden;
      }

      a {
        background: #fff;
        color: #757575;
        display: inline-block;
        font-size: 12px;
        height: 24px;
        line-height: 26px;
        padding: 0 8px;
        vertical-align: top;

        &.active {
          background: rgba(0, 0, 0, 0.15);
          border: 0 !important;
          color: #bbc5c7;
        }

        &:first-child {
          border-right: 1px solid rgba(0, 0, 0, 0.15);
        }

        &:last-child {
          border-left: 1px solid rgba(0, 0, 0, 0.15);
        }
      }
    `;

    const FilterBar = styled.div`
      display: flex;
      justify-content: space-between;
    `;

    return (
      <div>
        <Meta/>
        {this.state.view === 'map' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SearchSortFilters
              updateSort={this.updateSort}
              sort={this.state.sort}
              isLoading={this.state.isLoading}
              isLoaded={this.state.isLoaded}
              isDirty={this.state.isDirty}
              checkIn={this.state.checkIn}
              checkOut={this.state.checkOut}
              guests={this.state.guests}
              max_price={this.state.max_price}
              min_price={this.state.min_price}
              currency={this.props.brand.currency}
              respondToDatesChange={this.respondToDatesChange}
              respondToGuestsChange={this.respondToGuestsChange}
              filter_numBedrooms={this.state.filter_numBedrooms}
              filter_numBathrooms={this.state.filter_numBathrooms}
              filter_instantBook={this.state.filter_instantBook}
              filter_priceLow={this.state.filter_priceLow}
              filter_priceHigh={this.state.filter_priceHigh}
              filter_distance={this.state.filter_distance}
              fetchSearchData={this.fetchSearchData}
              updateFilter={this.updateFilter}
              updatePriceFilters={this.updatePriceFilters}
              translate={translate}
              instantBookingOnly={this.state.instantBookingOnly}
              toggleInstantBooking={this.toggleInstantBooking}
              datesSet={this.state.datesSet}
              brand={this.props.brand}
              selectedAmenities={this.state.selectedAmenities}
              displayFormat={this.props.brand.date_format}
              view={this.state.view}
              maxGuests={this.state.maxGuests}
              maxBedrooms={this.state.maxBedrooms}
              maxBaths={this.state.maxBaths}
              totalProperties={this.state.totalProperties}
            />
            <div style={{ display: 'flex' }}>
              <section className="tiles" ref={ref => (this._div = ref)}>
                <FilterBar>
                  <SearchSort
                    updateSort={this.updateSort}
                    updateVisiblity={this.toggleSortVisible}
                    sort={this.state.sort}
                    visible={this.state.sortVisible}
                    translate={translate}
                    brand={this.props.brand}
                  />
                  <LayoutViewNav>
                    <NavLink to="/listings/list">
                      <ThList />
                    </NavLink>
                    <NavLink to="/listings/grid">
                      <ThLarge />
                    </NavLink>
                    <NavLink to="/listings/map" className="active">
                      <Map />
                    </NavLink>
                  </LayoutViewNav>
                </FilterBar>
                <SearchInfo
                  isLoading={this.state.isLoading}
                  isLoaded={this.state.isLoaded}
                  isDirty={this.state.isDirty}
                  totalProperties={this.state.totalProperties}
                  results={this.state.results}
                  translate={translate}
                />
                <SearchTiles
                  filteredResults={this.state.results}
                  getStringifiedQueryString={this.getStringifiedQueryString}
                  isLoading={this.state.isLoading}
                  isLoaded={this.state.isLoaded}
                  isDirty={this.state.isDirty}
                  theme={this.props.theme}
                  translate={translate}
                  datesSet={this.state.datesSet}
                />
                {this.state.isLoaded && (
                  <section>
                    <PaginationContainer className="pages consolidated-key">
                      <div className="no-wrap" style={{ textAlign: 'center' }}>
                        <ReactPaginate
                          previousLabel={'<'}
                          pageRangeDisplayed={3}
                          nextLabel={'>'}
                          breakLabel={<a href="">...</a>}
                          breakClassName={'break-me'}
                          pageCount={this.state.totalPages}
                          marginPagesDisplayed={1}
                          onPageChange={this.handlePageClick}
                          containerClassName={''}
                          forcePage={this.state.currentPage}
                          pageClassName={'hide-on-mobile'}
                          activeClassName={'active'}
                        />
                      </div>
                      <div className="no-wrap" style={{ textAlign: 'center' }}>
                        {this.parsePageOffset()}
                      </div>
                    </PaginationContainer>
                  </section>
                )}
              </section>
              <section className="map">
                <Script
                  url={`https://maps.googleapis.com/maps/api/js?key=${
                    this.props.brand.google_maps_api_key
                  }`}
                  onError={this.handleMapScriptError.bind(this)}
                  onLoad={this.handleMapScriptLoad.bind(this)}
                />
                {!this.state.mapLoading && this.state.mapsLoaded ? (
                  <SearchMapToggle
                    searchWithMap={this.state.searchWithMap}
                    toggleSearchWithMap={this.toggleSearchWithMap}
                    isLoading={this.state.isLoading}
                    isLoaded={this.state.isLoaded}
                    isDirty={this.state.isDirty}
                    translate={translate}
                  />
                ) : null}
                {!this.state.mapLoading && this.state.mapsLoaded ? (
                  <SearchMap
                    filteredResults={this.state.results}
                    geoNELat={this.state.geoNELat}
                    geoNELon={this.state.geoNELon}
                    geoSWLat={this.state.geoSWLat}
                    geoSWLon={this.state.geoSWLon}
                    geoCenterLat={this.state.geoCenterLat}
                    geoCenterLon={this.state.geoCenterLon}
                    zoom={this.state.zoom}
                    updateBounds={this.updateBounds}
                    updateZoom={this.updateZoom}
                    isLoading={this.state.isLoading}
                    isLoaded={this.state.isLoaded}
                    isDirty={this.state.isDirty}
                    getStringifiedQueryString={this.getStringifiedQueryString}
                    searchWithMap={this.state.searchWithMap}
                    translate={translate}
                  />
                ) : null}
              </section>
            </div>
          </div>
        )}
        {this.state.view !== 'map' && (
          <div className="freeform mobileHide">
            <SidebarWrapper>
              <SearchSortFilters
                updateSort={this.updateSort}
                sort={this.state.sort}
                isLoading={this.state.isLoading}
                isLoaded={this.state.isLoaded}
                isDirty={this.state.isDirty}
                checkIn={this.state.checkIn}
                checkOut={this.state.checkOut}
                guests={this.state.guests}
                max_price={this.state.max_price}
                min_price={this.state.min_price}
                currency={this.props.brand.currency}
                respondToDatesChange={this.respondToDatesChange}
                respondToGuestsChange={this.respondToGuestsChange}
                filter_numBedrooms={this.state.filter_numBedrooms}
                filter_numBathrooms={this.state.filter_numBathrooms}
                filter_instantBook={this.state.filter_instantBook}
                filter_priceLow={this.state.filter_priceLow}
                filter_priceHigh={this.state.filter_priceHigh}
                filter_distance={this.state.filter_distance}
                fetchSearchData={this.fetchSearchData}
                updateFilter={this.updateFilter}
                updatePriceFilters={this.updatePriceFilters}
                translate={translate}
                instantBookingOnly={this.state.instantBookingOnly}
                toggleInstantBooking={this.toggleInstantBooking}
                datesSet={this.state.datesSet}
                brand={this.props.brand}
                selectedAmenities={this.state.selectedAmenities}
                displayFormat={this.props.brand.date_format}
                view={this.state.view}
                maxGuests={this.state.maxGuests}
                maxBedrooms={this.state.maxBedrooms}
                maxBaths={this.state.maxBaths}
                totalProperties={this.state.totalProperties}
              />
            </SidebarWrapper>
            <ListingsWrapper ref={ref => (this._div = ref)}>
              <FilterBar>
                <SearchSort
                  updateSort={this.updateSort}
                  updateVisiblity={this.toggleSortVisible}
                  sort={this.state.sort}
                  visible={this.state.sortVisible}
                  translate={translate}
                  brand={this.props.brand}
                />
                <LayoutViewNav>
                  <NavLink to="/listings/list">
                    <ThList />
                  </NavLink>
                  <NavLink to="/listings/grid">
                    <ThLarge />
                  </NavLink>
                  <NavLink to="/listings/map">
                    <Map />
                  </NavLink>
                </LayoutViewNav>
              </FilterBar>
              <SearchList
                filteredResults={this.state.results}
                getStringifiedQueryString={this.getStringifiedQueryString}
                isLoading={this.state.isLoading}
                isLoaded={this.state.isLoaded}
                isDirty={this.state.isDirty}
                theme={this.props.theme}
                translate={translate}
                datesSet={this.state.datesSet}
                view={this.state.view}
              />
              {this.state.isLoaded && (
                <section>
                  <PaginationContainer className="pages consolidated-key">
                    <div className="no-wrap" style={{ textAlign: 'center' }}>
                      <ReactPaginate
                        previousLabel={'<'}
                        pageRangeDisplayed={3}
                        nextLabel={'>'}
                        breakLabel={<a href="">...</a>}
                        breakClassName={'break-me'}
                        pageCount={this.state.totalPages}
                        marginPagesDisplayed={1}
                        onPageChange={this.handlePageClick}
                        containerClassName={''}
                        forcePage={this.state.currentPage}
                        pageClassName={'hide-on-mobile'}
                        activeClassName={'active'}
                      />
                    </div>
                    <div className="no-wrap" style={{ textAlign: 'center' }}>
                      {this.parsePageOffset()}
                    </div>
                  </PaginationContainer>
                </section>
              )}
            </ListingsWrapper>
          </div>
        )}
      </div>
    );
  }
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(ThemeDefaultSearch)
