// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import 'react-dates/initialize';

// Components
// -----------------------------------------------
import ContactForm from '../forms/contact';
import FeaturedListingsContainer from './featured-listings-container';
import FeaturedPagesContainer from './featured-pages-container';
import Jumbotron from './jumbotron';
import Meta from './meta';

// Redux
// -----------------------------------------------
import * as brandAction from '../../redux/action/brand'

// -----------------------------------------------
// COMPONENT->HOME -------------------------------
// -----------------------------------------------
class Home extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = { pageLoading: true };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    document.body.classList.add('home-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('listings-view');
    document.body.classList.remove('search-view');
    this.setBrand(this.props)
  }

  // Set Brand
  // ---------------------------------------------
  setBrand = (props) => {
    axios.get('/api/organizations/home')
    .then(async (response) => {
      await props.dispatch(brandAction.setHome(response.data));
      this.setState({pageLoading: false});
    })
  }

  // Render Homepage Content
  // ---------------------------------------------
  renderHomepageContent() {
    return {
      __html: this.props.brand.home.payload.content
    };
  }

  // Render
  // ---------------------------------------------
  render() {
    if(!this.state.pageLoading){
      return (
        <main>
          <Meta />
          <Jumbotron />
          <article
            className="freeform home-section"
            dangerouslySetInnerHTML={this.renderHomepageContent()}
          />
          {this.props.brand.home.options.show_featured_properties == 'true' &&
          this.props.brand.home.featured_listings.length > 0 ? (
            <FeaturedListingsContainer />
          ) : null}
          {this.props.brand.home.options.show_featured_pages == 'true' &&
          this.props.brand.home.featured_pages.length > 0 ? (
            <FeaturedPagesContainer />
          ) : null}
          {this.props.brand.home.options.show_contact_form == 'true' && (
            <ContactForm subject="General Question" />
          )}
        </main>
      );
    } else { return(<div>Loading...</div>) }
  }
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Home)
