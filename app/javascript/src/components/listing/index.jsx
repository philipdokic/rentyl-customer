// Dependencies
// -----------------------------------------------
import React from 'react'
// import axios from 'axios'
// import {connect} from 'react-redux'
//import './node_modules/react-dates/initialize'; // Needed for rendering any react-dates components
//import get from './node_modules/lodash/get';

// Redux
// -----------------------------------------------
import * as listingAction from '../../redux/action/listing'

// Components
// -----------------------------------------------
//import DetailsMulti from './details-multi';
//import DetailsRoom from './details-room';
import Single from './single';

// -----------------------------------------------
// COMPONENT->LISTING ----------------------------
// -----------------------------------------------
export default class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  // Set Listing
  // ---------------------------------------------
  // setListing = (props) => {
  //   console.log(props);
  //   axios.get(`/api/listings/${props.listing.id}`, {headers:{'Content-Type': 'application/json'}})
  //   .then(res => {
  //     console.log(res.data);
  //     props.dispatch(listingAction.setListing(res.data))
  //   })
  // }

  componentDidMount() {
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
    // if (props.is_room_type) {
    //   return <DetailsRoom />; // {...this.state} {...this.props}
    // } else if (props.is_multi_unit) {
    //   return <DetailsMulti />; // {...this.state} {...this.props}
    // } else
    // if (props.is_room_type === false && props.is_multi_unit === false) {
      return <Single />; // {...this.state} {...this.props}
    // } else {
    //   return <div style={{ minHeight: '75vh' }} />;
    // }
  }
}
