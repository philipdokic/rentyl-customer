// Dependencies
// -----------------------------------------------
import React from 'react';
import Sidebar from 'react-sidebar';
import includes from 'lodash/includes';
import get from 'lodash/get';
import DirectCheckbox from '../resources/direct-checkbox';

export default class SearchAmenitiesFilterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAmenities: this.props.selectedAmenities || []
    };
  }

  onApplyClick = () => {
    const formattedAmenities = this.state.selectedAmenities.reduce(
      (seed, amenity) => {
        const modelName = get(this, `props.amenitiesList.${amenity}.0.model`);
        seed[modelName] = seed[modelName]
          ? seed[modelName].concat(this.props.amenitiesList[amenity])
          : this.props.amenitiesList[amenity];
        return seed;
      },
      {}
    );
    this.props.setAmenities(formattedAmenities, this.state.selectedAmenities);
    this.props.toggleSideBarOpen();
  };

  onAmenityClick = e => {
    const currentIndex = this.state.selectedAmenities.indexOf(e.target.value);
    if (currentIndex === -1) {
      this.setState({
        selectedAmenities: this.state.selectedAmenities.concat([e.target.value])
      });
    } else {
      const selectedAmenities = this.state.selectedAmenities.slice(0);
      selectedAmenities.splice(currentIndex, 1);
      this.setState({ selectedAmenities });
    }
  };

  renderAmenity = amenity => (
    <DirectCheckbox
      key={amenity}
      name={amenity}
      checked={includes(this.state.selectedAmenities, amenity)}
      onChange={this.onAmenityClick}
      labelText={amenity}
    />
  );

  renderSidebar = () => (
    <div className="consolidated-form-features-list sidebar-container">
      <div onClick={this.props.toggleSideBarOpen} className="close-button">
        ×
      </div>
      <div className="checkbox-group sidebar-content">
        {Object.keys(this.props.amenitiesList)
          .sort()
          .map(this.renderAmenity)}
      </div>
      <button
        style={{ fontSize: 18, fontWeight: 600 }}
        className="button"
        onClick={this.onApplyClick}
      >
        Apply
      </button>
    </div>
  );

  render() {
    return (
      <Sidebar
        onSetOpen={this.props.toggleSideBarOpen}
        open={this.props.open}
        styles={{
          sidebar: {
            backgroundColor: '#ffffff',
            width: '66vw',
            position: 'fixed',
            zIndex: 101
          },
          root: { zIndex: this.props.open ? 101 : -1 }
        }}
        sidebar={this.renderSidebar()}
      >
        <div />
      </Sidebar>
    );
  }
}
