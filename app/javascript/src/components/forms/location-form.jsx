// Dependencies
// -----------------------------------------------
import React from 'react';
import Geosuggest from 'react-geosuggest';
import Script from 'react-load-script';

// Components
// -----------------------------------------------
import Spinner from '../spinner/spinner';

export default class LocationForm extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

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

  findAddressPart = (adrComponents, adr_part) => {
    return adrComponents.find(e => {
      return e.types[0] === adr_part;
    });
  };

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

  updateOnChange = e => {
    let stateChange = {};
    stateChange[e.target.name] = e.target.value;
    this.setState(stateChange, () => {
      this.props.setLocationAttributes(this.returnValues());
    });
  };

  returnValues = () => {
    let values = this.state;
    delete values.mapsLoaded;
    delete values.mapsLoading;

    return values;
  };

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
      <div>
        <label>
          <span>Address Line 1</span>
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

        <label htmlFor="adrUnit">
          <span>
            Address Line 2 <small>(optional)</small>
          </span>
        </label>
        <input
          className="magnified"
          type="text"
          name="adrUnit"
          placeholder="Ste. 1000"
          value={adrUnit}
          onChange={this.updateOnChange}
        />

        <section className="two-col two-col-50-50">
          <div>
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
          </div>

          <div>
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
          </div>
        </section>
        <section className="two-col two-col-50-50">
          <div>
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
          </div>

          <div>
            <label htmlFor="adrPostalCode">
              <span>Postal code</span>
            </label>
            <input
              className="magnified"
              type="text"
              name="adrPostalCode"
              placeholder="60622"
              value={adrPostalCode}
              onChange={this.updateOnChange}
            />
          </div>
        </section>
      </div>
    );
  };

  render() {
    return (
      <fieldset>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPRfOoJzqa0XyJWMg-oU7CeaMpNbxkOaE&libraries=places"
          onError={this.handleMapScriptError.bind(this)}
          onLoad={this.handleMapScriptLoad.bind(this)}
        />
        {this.state.mapsLoading ? (
          <Spinner />
        ) : (
          this.renderGeoSuggestedAddress()
        )}
      </fieldset>
    );
  }
}
