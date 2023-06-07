// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import styled from 'styled-components'

// Components
// -----------------------------------------------
import Multi from './multi';
import DetailsRoom from './room';
import Single from './single';
import Ripple from '../miscellaneous/ripple';

// Redux
// -----------------------------------------------
import * as listingAction from '../../redux/action/listing'

// Styles
// -----------------------------------------------
const LoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

// -----------------------------------------------
// COMPONENT->LISTING ----------------------------
// -----------------------------------------------
class Listing extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = { loadListing: true };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.fetchListingData(this.props);
    document.body.classList.add('listings-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('search-view');
  }

  // Fetch Listing Data
  // ---------------------------------------------
  fetchListingData = props => {
    axios.get(`/api/listings/${get(props, 'match.params.listing_slug')}${get(props, 'location.search')}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      props.dispatch(listingAction.setListing(response.data))
      this.setState({loadListing: false});
    })
    .catch(error => {
      console.log(error);
    })
  };

  // Render
  // ---------------------------------------------
  render() {
    if (!this.state.loadListing) {
      if (this.props.listing.room_type) {
        return <DetailsRoom />;
      } else if (this.props.listing.multi_unit) {
        return <Multi />;
      } else
      if (this.props.listing.room_type === false && this.props.listing.multi_unit === false) {
        return <Single />;
      } else {
        return <div style={{ minHeight: '75vh' }} />;
      }
    }

    return(
      <LoadingWrapper>
        <Ripple color="#50E3C2" />
      </LoadingWrapper>
    )
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