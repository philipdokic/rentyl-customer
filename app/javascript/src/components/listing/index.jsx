// Dependencies
// -----------------------------------------------
import React from 'react'
import {connect} from 'react-redux'
//import './node_modules/react-dates/initialize'; // Needed for rendering any react-dates components
//import get from './node_modules/lodash/get';

// Components
// -----------------------------------------------
//import DetailsMulti from './details-multi';
//import DetailsRoom from './details-room';
import Single from './single';

// Services
// -----------------------------------------------
//import { ListingService } from './node_modules/cxApi';

export default class Listing extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      is_multi_unit: null,
      is_room_type: null,
      reviews: []
    };
  }

  componentDidMount() {
    //this.fetchListingData(this.props);
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
