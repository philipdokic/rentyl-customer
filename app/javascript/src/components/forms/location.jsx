// Dependencies
// -----------------------------------------------
import React from 'react';
import Geosuggest from 'react-geosuggest';
import Script from 'react-load-script';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import Ripple from '../miscellaneous/ripple';

// Styles
// -----------------------------------------------
const LocationForm = styled.div`
  align-items: flex-start;
  box-pack: space-between;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FormGroup = styled.fieldset`
  display: block;
  width: 100%;

  &.width-25 {
    width: 23%;
  }

  &.width-50 {
    width: 48%;
  }

  &.width-75 {
    width: 73%;
  }
`;

// -----------------------------------------------
// COMPONENT->LOCATION(FORM) ---------------------
// -----------------------------------------------
export default class Location extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      adrStreet: this.props.adrStreet,
      adrUnit: this.props.adrUnit,
      adrCity: this.props.adrCity,
      adrState: this.props.adrState,
      adrCountry: this.props.adrCountry,
      adrPostalCode: this.props.adrPostalCode,
      adrCountryShort: this.props.adrCountryShort,
      mapsLoaded: false,
      mapsLoading: true
    };
  }

  // Component Did Update
  // ---------------------------------------------
  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      this.setState(nextProps);
    }
  }

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

  // Find Address Part
  // ---------------------------------------------
  findAddressPart = (adrComponents, adr_part) => {
    return adrComponents.find(e => {
      return e.types[0] === adr_part;
    });
  };

  // Update On Suggest Selected
  // ---------------------------------------------
  updateOnSuggestSelected = suggest => {
    try {
      const adrComponents = suggest.gmaps.address_components;
      const adrPostalCode = this.findAddressPart(adrComponents, 'postal_code');
      const adrCountry = this.findAddressPart(adrComponents, 'country');
      const adrState = this.findAddressPart(
        adrComponents,
        'administrative_area_level_1'
      );
      const adrCity = this.findAddressPart(adrComponents, 'locality');
      const adrStreetName = this.findAddressPart(adrComponents, 'route');
      const adrStreetNumber = this.findAddressPart(
        adrComponents,
        'street_number'
      );

      this.setState({
        adrStreet:
          (adrStreetNumber ? adrStreetNumber.long_name : '') +
          ' ' +
          (adrStreetName ? adrStreetName.long_name : ''),
        adrUnit: '',
        adrCity: adrCity ? adrCity.long_name : '',
        adrState: adrState ? adrState.long_name : '',
        adrCountry: adrCountry ? adrCountry.long_name : '',
        adrPostalCode: adrPostalCode ? adrPostalCode.long_name : '',
        adrCountryShort: adrCountry ? adrCountry.short_name : ''
      });

      this.adrGeoSuggest.update(this.state.adrStreet);

      this.props.setLocationAttributes(this.returnValues());
    } catch (e) {
      this.setState({
        adrStreet: ''
      });
    }
  };

  // Update On Change
  // ---------------------------------------------
  updateOnChange = e => {
    let stateChange = {};
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange, () => {
      this.props.setLocationAttributes(this.returnValues());
    });
  };

  // Return Values
  // ---------------------------------------------
  returnValues = () => {
    let values = this.state;
    delete values.mapsLoaded;
    delete values.mapsLoading;

    return values;
  };

  // Render Geo Suggested Address
  // ---------------------------------------------
  renderGeoSuggestedAddress = () => {
    const {
      adrStreet,
      adrUnit,
      adrCity,
      adrState,
      adrCountry,
      adrPostalCode
    } = this.state;

    return (
      <LocationForm>
        <FormGroup>
          <label>
            <span>Address</span>
          </label>
          {this.state.mapsLoaded ? (
            <Geosuggest
              inputClassName="magnified"
              placeholder="123 Road St."
              types={['geocode']}
              suggestsHiddenClassName="hidden"
              initialValue={adrStreet}
              ref={node => {
                this.adrGeoSuggest = node;
              }}
              onSuggestSelect={this.updateOnSuggestSelected}
            />
          ) : (
            <input
              className="magnified"
              type="text"
              name="adrStreet"
              placeholder="123 Road St."
              value={adrStreet}
              onChange={this.updateOnChange}
            />
          )}
          <input
            className="magnified"
            type="text"
            name="adrUnit"
            placeholder="Ste. 1000"
            style={{marginTop: '-8px'}}
            value={adrUnit}
            onChange={this.updateOnChange}
          />
        </FormGroup>
        <FormGroup className="width-50">
          <label htmlFor="adrCity">
            <span>City</span>
          </label>
          <input
            className="magnified"
            type="text"
            name="adrCity"
            placeholder="Chicago"
            value={adrCity}
            onChange={this.updateOnChange}
          />
        </FormGroup>
        <FormGroup className="width-25">
          <label htmlFor="adrState">
            <span>State / Province</span>
          </label>
          <input
            className="magnified"
            type="text"
            name="adrState"
            placeholder="IL"
            value={adrState}
            onChange={this.updateOnChange}
          />
        </FormGroup>
        <FormGroup className="width-25">
          <label htmlFor="adrPostalCode">
            <span>Postal Code</span>
          </label>
          <input
            className="magnified"
            type="text"
            name="adrPostalCode"
            placeholder="60622"
            value={adrPostalCode}
            onChange={this.updateOnChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="adrCountry">
            <span>Country</span>
          </label>
          <input
            className="magnified"
            type="text"
            name="adrCountry"
            placeholder={this.props.defaultCountry || `United States`}
            value={adrCountry}
            onChange={this.updateOnChange}
          />
        </FormGroup>
      </LocationForm>
    );
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPRfOoJzqa0XyJWMg-oU7CeaMpNbxkOaE&libraries=places"
          onError={this.handleMapScriptError.bind(this)}
          onLoad={this.handleMapScriptLoad.bind(this)}
        />
        {this.state.mapsLoading ? (
          <Ripple color="#50E3C2" />
        ) : (
          this.renderGeoSuggestedAddress()
        )}
      </>
    );
  }
}
