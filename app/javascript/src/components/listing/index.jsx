// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';

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
    this.fetchListingData(this.props);
    document.body.classList.add('listings-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('search-view');
  }

  componentWillReceiveProps(nextProps) {
    if (
      get(this, 'props.match.params.listing_slug') !==
      get(nextProps, 'match.params.listing_slug')
    ) {
      this.fetchListingData(nextProps);
    }
  }

  fetchListingData = props => {
    console.log(get(props, 'match.params.listing_slug'));
    axios.get(`/api/listings/${get(props, 'match.params.listing_slug')}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      props.dispatch(listingAction.setListing(response.data))
    })
    .catch(error => {
      console.log(error);
    })
  };

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