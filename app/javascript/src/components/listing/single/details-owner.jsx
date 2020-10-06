// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

export default class DetailsSingleOwner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = this.props.translate;
    const managerName = this.props.property_manager.name.split(' ');
    const firstName = capitalize(managerName[0]);
    const lastInitial = managerName[1]
      ? `${capitalize(managerName[1][0])}`
      : '';
    const managerDisplayName = `${firstName} ${lastInitial}`;
    return (
      <section id="details-owner">
        <header>
          <h3>{translate(`cx.details.manager`)}</h3>
        </header>
        <main>
          <h4>{managerDisplayName}</h4>
          <p>
            <a
              href="#"
              onClick={() => document.getElementById('contact-owner').click()}
            >
              Contact Owner
            </a>
          </p>
        </main>
      </section>
    );
  }
}
