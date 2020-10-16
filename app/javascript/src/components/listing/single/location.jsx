// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import ReactI18n from 'react-i18n';
import Script from 'react-load-script';

// Components
// -----------------------------------------------
import MapMarker from '../map-marker';

// -----------------------------------------------
// COMPONENT->SINGLE-LOCATION --------------------
// -----------------------------------------------
class SingleLocation extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      mapsLoaded: false,
      mapsLoading: true
    };
  }

  // Create Map Options
  // ---------------------------------------------
  createMapOptions = maps => {
    return {
      gestureHandling: 'greedy',
      mapTypeControl: false,
      panControl: false,
      scrollwheel: false
    };
  };

  // Handle Change
  // ---------------------------------------------
  handleChange = val => {};

  // Handle Map Script Error
  // ---------------------------------------------
  handleMapScriptError = () => {
    this.setState({
      mapsLoaded: false,
      mapsLoading: false
    });
  };

  // Handle Map Script Load
  // ---------------------------------------------
  handleMapScriptLoad = () => {
    this.setState({
      mapsLoaded: true,
      mapsLoading: false
    });
  };

  // Render City Disclaimer
  // ---------------------------------------------
  renderCityDisclaimer = () => {
    const translate = ReactI18n.getIntlMessage;

    return {
      __html: translate(`cx.details.location_disclaimer_with_city_html`, {
        location: `${this.props.listing.location.adr_city}, ${
          this.props.listing.location.adr_state
        }`
      })
    };
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-map" id="details-map">
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.listing.google_maps_api_key
          }`}
          onError={this.handleMapScriptError.bind(this)}
          onLoad={this.handleMapScriptLoad.bind(this)}
        />
        <main>
          {this.props.listing.location.adr_city &&
          this.props.listing.location.adr_state ? (
            <p dangerouslySetInnerHTML={this.renderCityDisclaimer()} />
          ) : (
            <p>{translate(`cx.details.location_disclaimer`)}</p>
          )}
          {!this.state.mapLoading && this.state.mapsLoaded ? (
            <GoogleMapReact
              center={[
                this.props.listing.location.geo_latitude,
                this.props.listing.location.geo_longitude
              ]}
              zoom={12}
              options={this.createMapOptions}
              resetBoundsOnResize={false}
              onChange={this.handleChange}
            >
              <MapMarker
                lat={this.props.listing.location.geo_latitude}
                lng={this.props.listing.location.geo_longitude}
              />
            </GoogleMapReact>
          ) : null}
        </main>
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
export default connect(mapStateToProps)(SingleLocation);