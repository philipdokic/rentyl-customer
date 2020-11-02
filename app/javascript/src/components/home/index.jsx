// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import 'react-dates/initialize';
import { Helmet } from 'react-helmet';


// Components
// -----------------------------------------------
import ContactForm from '../contact-form/default-form';
import FeaturedListingsContainer from './featured-listings-container';
import FeaturedPagesContainer from './featured-pages-container';
import Jumbotron from './jumbotron';

// Redux
// -----------------------------------------------
import * as brandAction from '../../redux/action/brand'

// -----------------------------------------------
// COMPONENT->HOME -------------------------------
// -----------------------------------------------
class Home extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor() {
    this.state = { isLoading: true };
   }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    document.body.classList.add('home-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('listings-view');
    document.body.classList.remove('search-view');
    !this.props.brand.canonical && this.setBrand(this.props)
  }

  // Set Brand
  // ---------------------------------------------
  setBrand = (props) => {
    axios.get('/api/organizations/home')
    .then(async (res) => {
      await props.dispatch(brandAction.setHome(res.data));
      this.setState({isLoading: false});
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
    if(!this.state.isLoading){
      return (
        <main>
          <Helmet>
            <script type="application/ld+json">{`
              {
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                "name": "${this.props.brand.name}",
                "url": "${this.props.brand.canonical}",
                "telephone": "${this.props.brand.contact.phone_primary.number}",
                "image": "${this.props.brand.logo_image.url}",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "${this.props.brand.home.location.adr_street}",
                  "addressLocality": "${this.props.brand.home.location.adr_city}",
                  "addressRegion": "${this.props.brand.home.location.adr_state}",
                  "postalCode": "${this.props.brand.home.location.adr_postal_code}",
                  "addressCountry": "${this.props.brand.home.location.adr_country}"
                }
              }
            `}</script>
          </Helmet>
          <Jumbotron />
          <article
            className="freeform home-section"
            dangerouslySetInnerHTML={this.renderHomepageContent()}
          />
          {this.props.brand.options.show_featured_properties == 'true' &&
          this.props.brand.featured_listings.length > 0 ? (
            <FeaturedListingsContainer />
          ) : null}
          {this.props.brand.options.show_featured_pages == 'true' &&
          this.props.brand.featured_pages.length > 0 ? (
            <FeaturedPagesContainer />
          ) : null}
          {this.props.brand.options.show_contact_form == 'true' && (
            <ContactForm subject="General Question" />
          )}
        </main>
      );
    } else { return(<div>Loading...</div>) }}
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Home)
