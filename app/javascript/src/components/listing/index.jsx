// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
//import './node_modules/react-dates/initialize'; // Needed for rendering any react-dates components
//import get from './node_modules/lodash/get';

// Redux
// -----------------------------------------------
import * as listingAction from '../../redux/action/listing'

// Components
// -----------------------------------------------
import Multi from './multi';
//import DetailsRoom from './details-room';
import Single from './single';

// -----------------------------------------------
// COMPONENT->LISTING ----------------------------
// -----------------------------------------------
class Listing extends React.Component {

  componentDidMount() {
    this.setListing();
    document.body.classList.add('listings-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('search-view');
  }

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     get(this, 'props.match.params.listing_slug') !==
  //     get(nextProps, 'match.params.listing_slug')
  //   ) {
  //     this.setState({ is_multi_unit: null }, () => {
  //       this.fetchListingData(nextProps);
  //     });
  //   }
  // }

  // fetchListingData = props => {
  //   ListingService.details(get(props, 'match.params.listing_slug'), get(props, 'unit_id'))
  //     .then(res => this.setState(res))
  //     .catch(err => console.warn(err));
  // };

  render() {
    if (this.props.listing.room_type) {
      return "" //<DetailsRoom />; // {...this.state} {...this.props}
    } else if (this.props.listing.multi_unit) {
      return <Multi />; // {...this.state} {...this.props}
    } else
    if (this.props.listing.room_type === false && this.props.listing.multi_unit === false) {
      return <Single />; // {...this.state} {...this.props}
    } else {
      return <div style={{ minHeight: '75vh' }} />;
    }
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
export default connect(mapStateToProps)(Listing);