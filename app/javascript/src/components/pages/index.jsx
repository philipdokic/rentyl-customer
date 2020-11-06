// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import { Helmet } from 'react-helmet';

// Components
// -----------------------------------------------
import ContactForm from '../contact-form/default-form';
import { Intercom } from '../miscellaneous/';

class Page extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      hero_image: null,
      page: {},
      payload: {}
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    Intercom(this.props.intercom_id);
    this.fetchPageInfo(this.props);
    document.body.classList.add(`${this.props.match.params.page_slug}`);
    document.body.classList.remove('checkout-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('listings-view');
    document.body.classList.remove('search-view');
  }

  // Component Did Update
  // ---------------------------------------------
  componentDidUpdate(prevProps) {
    if (
      get(this, 'props.match.params.page_slug') !==
      get(prevProps, 'match.params.page_slug')
    ) {
      this.fetchPageInfo(this.props);
    }
  }

  // Fetch Page Info
  // ---------------------------------------------
  fetchPageInfo = (props) => {
    axios.get(`/api/pages/${props.match.params.page_slug}?brand=${props.brand.brand.id}`)
    .then(response => {
      this.setState({
        hero_image: response.data.hero_image,
        page: response.data,
        payload: response.data.payload
      });
    })
  };

  // Get Custom Scripts
  // ---------------------------------------------
  getCustomScripts = () =>
    this.state.page.scripts_override ? (
      <script type="text/javascript">{this.state.page.scripts_override}</script>
    ) : null;

  // Get Custom CSS
  // ---------------------------------------------
  getCustomCss = () =>
    this.state.page.css_override ? (
      <style type="text/css">{this.state.page.css_override}</style>
    ) : null;

  // Generate Hero Image
  // ---------------------------------------------
  generateHeroImage() {
    if (this.state.hero_image && this.state.hero_image.image) {
      return this.state.hero_image.image.url;
    } else {
      return '';
    }
  }

  // Render Page Content
  // ---------------------------------------------
  renderPageContent() {
    return {
      __html: this.state.payload.content
    };
  }

  // Render
  // ---------------------------------------------
  render() {
    const heroImage = this.generateHeroImage();

    return (
      <>
        <Helmet>
          {this.getCustomScripts()}
          {this.getCustomCss()}
        </Helmet>
        <main>
          {this.state.hero_image ? (
            <header
              className="static-page-jumbotron"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <h1>{this.state.page.title}</h1>
            </header>
          ) : (
            <header className="static-page-header">
              <h1>{this.state.page.title}</h1>
            </header>
          )}
          <article
            className="freeform"
            dangerouslySetInnerHTML={this.renderPageContent()}
          />
          {this.state.page.contact_form && (
            <ContactForm
              organization_id={this.state.brand.organization_id}
              subject="General Question"
              displayFormat={this.props.brand.date_format}
            />
          )}
        </main>
      </>
    );
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
export default connect(mapStateToProps)(Page);