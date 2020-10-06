import React from 'react';
import styled from 'styled-components';

export default class FeaturedAmenities extends React.Component {
  renderIcon = (iconClass, name) => {
    return (
      <>
        <i className={`feature-icon ${iconClass}`} />
        <AmenitiesHeader>{`${name}`}</AmenitiesHeader>
      </>
    );
  };

  render() {
    const amenities = [
      {
        name: 'AMENITIES_AIR_CONDITIONING',
        label: 'A/C',
        iconClass: 'ac-icon'
      },
      {
        name: 'AMENITIES_FIREPLACE',
        label: 'Fireplace',
        iconClass: 'fireplace-icon'
      },
      {
        name: 'AMENITIES_PARKING',
        label: 'Parking',
        iconClass: 'parking-icon'
      },
      {
        name: 'AMENITIES_INTERNET',
        label: 'WiFi',
        iconClass: 'wifi-icon'
      },
      {
        name: 'AMENITIES_HAIR_DRYER',
        label: 'Hair Dryer',
        iconClass: 'hair-dryer-icon'
      },
      {
        name: 'AMENITIES_TOWELS',
        label: 'Towels',
        iconClass: 'towel-icon'
      },
      {
        name: 'AMENITIES_HEATING',
        label: 'Heating',
        iconClass: 'heater-icon'
      },
      {
        name: 'AMENITIES_IRON_BOARD',
        label: 'Ironing Board',
        iconClass: 'iron-icon'
      },
      {
        name: 'AMENITIES_WASHER',
        label: 'Washer',
        iconClass: 'washing-machine-icon'
      },
      {
        name: 'AMENITIES_LINENS',
        label: 'Linens',
        iconClass: 'blanket-icon'
      }
    ];

    const spaAmenities = [
      {
        name: 'POOL_SPA_HOT_TUB',
        label: 'Hot Tub',
        iconClass: 'hot-tub-icon'
      },
      {
        name: 'POOL_SPA_COMMUNAL_POOL',
        label: 'Communal Pool',
        iconClass: 'pool-icon'
      },
      {
        name: 'POOL_SPA_INDOOR_POOL',
        label: 'Indoor Pool',
        iconClass: 'pool-icon'
      },
      {
        name: 'POOL_SPA_PRIVATE_POOL',
        label: 'Private Pool',
        iconClass: 'pool-icon'
      }
    ];

    const entertainmentAmenities = [
      {
        name: 'ENTERTAINMENT_TELEVISION',
        label: 'TV',
        iconClass: 'tv-icon'
      },
      {
        name: 'ENTERTAINMENT_VIDEO_GAMES',
        label: 'Video Games',
        iconClass: 'joystick-icon'
      }
    ];
    const diningAmenities = [
      {
        name: 'KITCHEN_DINING_KITCHEN',
        label: 'Kitchen',
        iconClass: 'kitchen-icon'
      },
      {
        name: 'KITCHEN_DINING_MICROWAVE',
        label: 'Microwave',
        iconClass: 'microwave-icon'
      },
      {
        name: 'KITCHEN_DINING_COFFEE_MAKER',
        label: 'Coffee',
        iconClass: 'coffee-icon'
      },
      {
        name: 'KITCHEN_DINING_DISHES_UTENSILS',
        label: 'Utensils',
        iconClass: 'utensils-icon'
      },
      {
        name: 'KITCHEN_DINING_OVEN',
        label: 'Oven',
        iconClass: 'oven-icon'
      },
      {
        name: 'KITCHEN_DINING_STOVE',
        label: 'Stove',
        iconClass: 'stove-icon'
      }
    ];

    const outdoorAmenities = [
      {
        name: 'OUTDOOR_GRILL',
        label: 'Grill',
        iconClass: 'grill-icon'
      }
    ];
    let amenitiesCounter = 0;
    let diningAmenitiesCounter = 0;
    let spaAmenitiesCounter = 0;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ul style={{ display: 'flex', flexDirection: 'row' }}>
          {amenities.map(amenity => {
            if (amenitiesCounter < 3) {
              if (this.props.featuresAmenities[amenity.name].value) {
                amenitiesCounter += 1;
                return this.renderIcon(amenity.iconClass, amenity.label);
              }
            }
          })}
        </ul>
        <ul style={{ display: 'flex', flexDirection: 'row' }}>
          {diningAmenities.map(amenity => {
            if (diningAmenitiesCounter < 3) {
              if (this.props.featuresDining[amenity.name].value) {
                diningAmenitiesCounter += 1;
                return this.renderIcon(amenity.iconClass, amenity.label);
              }
            }
          })}
          {outdoorAmenities.map(amenity => {
            if (diningAmenitiesCounter < 3) {
              if (this.props.featuresOutdoor[amenity.name].value) {
                diningAmenitiesCounter += 1;
                return this.renderIcon(amenity.iconClass, amenity.label);
              }
            }
          })}
        </ul>
        <ul style={{ display: 'flex', flexDirection: 'row' }}>
          {spaAmenities.map(amenity => {
            if (spaAmenitiesCounter < 3) {
              if (this.props.featuresSpa[amenity.name].value) {
                spaAmenitiesCounter += 1;
                return this.renderIcon(amenity.iconClass, amenity.label);
              }
            }
          })}
          {entertainmentAmenities.map(amenity => {
            if (spaAmenitiesCounter < 3) {
              if (this.props.featuresEntertainment[amenity.name].value) {
                spaAmenitiesCounter += 1;
                return this.renderIcon(amenity.iconClass, amenity.label);
              }
            }
          })}
        </ul>
      </div>
    );
  }
}

const AmenitiesHeader = styled.li`
  width: 20%;
  font-size: 18px;
  padding-bottom: 2em;
`;
