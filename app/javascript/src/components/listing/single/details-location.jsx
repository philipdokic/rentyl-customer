// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Script from 'react-load-script';

// Components
// -----------------------------------------------
import { DetailsMapMarker } from '../../atoms';

export default class DetailsSingleLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapsLoaded: false,
      mapsLoading: true
    };
  }

  createMapOptions = maps => {
    return {
      gestureHandling: 'greedy',
      mapTypeControl: false,
      panControl: false,
      scrollwheel: false
    };
  };

  handleChange = val => {};

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

  renderCityDisclaimer = () => {
    const translate = this.props.translate;
    return {
      __html: translate(`cx.details.location_disclaimer_with_city_html`, {
        location: `${this.props.locationPlace.adr_city}, ${
          this.props.locationPlace.adr_state
        }`
      })
    };
  };

  render() {
    const translate = this.props.translate;
    return (
      <section className="details-map" id="details-map">
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${
            this.props.google_maps_api_key
          }`}
          onError={this.handleMapScriptError.bind(this)}
          onLoad={this.handleMapScriptLoad.bind(this)}
        />
        <main>
          {this.props.locationPlace.adr_city &&
          this.props.locationPlace.adr_state ? (
            <p dangerouslySetInnerHTML={this.renderCityDisclaimer()} />
          ) : (
            <p>{translate(`cx.details.location_disclaimer`)}</p>
          )}
          {!this.state.mapLoading && this.state.mapsLoaded ? (
            <GoogleMapReact
              center={[
                this.props.locationPlace.geo_latitude,
                this.props.locationPlace.geo_longitude
              ]}
              zoom={12}
              options={this.createMapOptions}
              resetBoundsOnResize={false}
              onChange={this.handleChange}
            >
              <DetailsMapMarker
                lat={this.props.locationPlace.geo_latitude}
                lng={this.props.locationPlace.geo_longitude}
              />
            </GoogleMapReact>
          ) : null}
        </main>
      </section>
    );
  }
}
