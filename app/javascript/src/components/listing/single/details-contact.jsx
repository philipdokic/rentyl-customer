import React from 'react';
import ContactForm from 'cxThemeComponents/contact-form';

export default class DetailsSingleContact extends React.Component {
  static propTypes = {};

  constructor(props, _railsContext) {
    super(props);
  }

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
