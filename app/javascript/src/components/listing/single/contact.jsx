// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';

// Components
// -----------------------------------------------
import ContactForm from '../../contact-form/default-form';

// -----------------------------------------------
// COMPONENT->CONTACT ----------------------------
// -----------------------------------------------
class Contact extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    return (
      <section id="details-contact">
        <main>
          <div>
            <ContactForm {...this.props} subject="Property Inquiry" />
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
export default connect(mapStateToProps)(Contact);