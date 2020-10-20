// Dependencies
// -----------------------------------------------
import axios from 'axios';
import {connect} from 'react-redux'
import React from 'react';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import ReactI18n from 'react-i18n';
import { get } from 'lodash'
import { Helmet } from 'react-helmet';


// Components
// -----------------------------------------------
// import { ContactForm } from 'cxThemeComponents';
import FeaturedListingsContainer from './featured-listings-container'
import FeaturedPagesContainer from './featured-pages-container'
import Jumbotron from './jumbotron'
import { initializeIntercom } from '../miscellaneous/Intercom';

// Redux
// -----------------------------------------------
import * as brandAction from '../../redux/action/brand'

class ThemeDefaultHome extends React.Component {
  static propTypes = {};

  componentDidMount() {
    initializeIntercom(this.props.intercom_id);
    document.body.classList.add('home-view');
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('listings-view');
    document.body.classList.remove('search-view');
    !this.props.brand.canonical && this.setBrand(this.props)
  }

  setBrand = (props) => {
    axios.get('/api/organizations/home')
    .then(res => {
      props.dispatch(brandAction.setBigBrand(res.data))
    })
  }

  renderHomepageContent() {
    return {
      __html: this.props.brand.payload.content
    };
  }

  render() {
    const translate = ReactI18n.getIntlMessage;
    const custom_hero_html = get(this, 'props.brand_info.custom_hero_html')
    if(this.props.brand.canonical){
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
                "streetAddress": "${this.props.brand.location.adr_street}",
                "addressLocality": "${this.props.brand.location.adr_city}",
                "addressRegion": "${this.props.brand.location.adr_state}",
                "postalCode": "${this.props.brand.location.adr_postal_code}",
                "addressCountry": "${this.props.brand.location.adr_country}"
              }
            }
          `}</script>
        </Helmet>
        <Jumbotron
          heading={this.props.brand.payload.header}
          hero_image={this.props.brand.hero_image}
          subheading={this.props.brand.payload.subheader}
          options={this.props.brand.options}
          slug={this.props.brand.slug}
          translate={translate}
          google_maps_api_key={this.props.brand.google_maps_api_key}
          organization_id={this.props.brand.organization_id}
          cities={this.props.brand.cities}
          displayFormat={this.props.brand.date_format}
          custom_hero_html={custom_hero_html}
          maxGuests={this.props.brand.max_guests}
        />
        <article
          className="freeform home-section"
          dangerouslySetInnerHTML={this.renderHomepageContent()}
        />

        {this.props.brand.options.show_featured_properties == 'true' &&
        this.props.brand.featured_listings.length > 0 ? (
          <FeaturedListingsContainer
            featured_listings={this.props.brand.featured_listings}
            translate={translate}
          />
        ) : null}

        {this.props.brand.options.show_featured_pages == 'true' &&
        this.props.brand.featured_pages.length > 0 ? (
          <FeaturedPagesContainer
            featured_pages={this.props.brand.featured_pages}
            translate={translate}
          />
        ) : null}

        {this.props.brand.options.show_contact_form == 'true' && (
          <ContactForm
            organization_id={this.props.brand.organization_id}
            subject="General Question"
            displayFormat={this.props.brand.date_format}
          />
        )}
        </main>
    );
  }else{return(<div></div>)}}
}

function mapStateToProps(state) {
  return {
    brand: state.brand.id ? state.brand : {}
  };
}

export default connect(mapStateToProps)(ThemeDefaultHome)
