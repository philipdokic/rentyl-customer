// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';

// Components
// -----------------------------------------------
//import ContactForm from 'cxThemeComponents/contact-form';

// -----------------------------------------------
// COMPONENT->SINGLE-CONTACT ------------------
// -----------------------------------------------
class SingleContact extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    return (
      <section id="details-contact">
        <main>
          <div>
            !!! Add Contact Form !!!
            {/* <ContactForm {...this.props} subject="Property Inquiry" /> */}
          </div>
        </main>
      </section>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {},
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(SingleContact);