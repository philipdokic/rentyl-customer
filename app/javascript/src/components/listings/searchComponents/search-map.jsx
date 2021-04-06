// Dependencies
// -----------------------------------------------
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react';

// Components
// -----------------------------------------------
import Spinner from '../resources/spinner';
import { SearchMapMarker } from './index';

// -----------------------------------------------
// COMPONENT->SEARCH-MAP -------------------------
// -----------------------------------------------
export default class SearchMap extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  handleChange = val => {
    if (this.props.searchWithMap) {
      if (val.bounds) {
        this.props.updateBounds(
          val.bounds.ne.lat,
          val.bounds.ne.lng,
          val.bounds.sw.lat,
          val.bounds.sw.lng
        );
      }
      this.props.updateZoom(val.zoom);
    }
  };

  createMapOptions = maps => {
    return {
      gestureHandling: 'greedy',
      mapTypeControl: false,
      panControl: true,
      scrollwheel: false
    };
  };

  renderWithBounds() {
    const translate = this.props.translate;
    let bounds = {
      ne: {
        lat: this.props.geoNELat,
        lng: this.props.geoNELon
      },
      sw: {
        lat: this.props.geoSWLat,
        lng: this.props.geoSWLon
      }
    };
    let size = {
      width: 640, // Map width in pixels
      height: 700 // Map height in pixels
    };
    let { center, zoom } = fitBounds(bounds, size);
    return (
      <GoogleMapReact
        center={center}
        zoom={this.props.zoom}
        options={this.createMapOptions}
        resetBoundsOnResize={false}
        onChange={this.handleChange}
      >
        {this.props.filteredResults.map(result => (
          <SearchMapMarker
            key={result.location.geo_latitude}
            lat={result.location.geo_latitude}
            lng={result.location.geo_longitude}
            getStringifiedQueryString={this.props.getStringifiedQueryString}
            result={result}
            translate={translate}
          />
        ))}
      </GoogleMapReact>
    );
  }

  renderWithCenter() {
    const translate = this.props.translate;
    let bounds = {
      ne: {
        lat: this.props.geoNELat,
        lng: this.props.geoNELon
      },
      sw: {
        lat: this.props.geoSWLat,
        lng: this.props.geoSWLon
      }
    };
    let size = {
      width: 640, // Map width in pixels
      height: 700 // Map height in pixels
    };
    const center = {
      lat: this.props.geoCenterLat,
      lng: this.props.geoCenterLon
    };
    return (
      <GoogleMapReact
        center={center}
        zoom={this.props.zoom}
        options={this.createMapOptions}
        resetBoundsOnResize={false}
        onChange={this.handleChange}
      >
        {this.props.filteredResults.map(result => (
          <SearchMapMarker
            key={result.property.id}
            lat={result.location.geo_latitude}
            lng={result.location.geo_longitude}
            getStringifiedQueryString={this.props.getStringifiedQueryString}
            result={result}
            translate={translate}
          />
        ))}
      </GoogleMapReact>
    );
  }

  render() {
    if (
      this.props.filteredResults &&
      this.props.geoNELat &&
      this.props.geoNELon &&
      this.props.geoSWLat &&
      this.props.geoSWLon
    ) {
      return this.renderWithBounds();
    } else if (
      this.props.filteredResults &&
      this.props.geoCenterLat &&
      this.props.geoCenterLon
    ) {
      return this.renderWithCenter();
    } else {
      return <Spinner />;
    }
  }
}
