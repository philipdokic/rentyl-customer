// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->PROPERTY-MANAGER -------------------
// -----------------------------------------------
export default class PropertyManager extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="receipt-info-section">
        <div className="receipt-info-subsection">
          <h3>{translate(`cx.global.property_manager_information`)}</h3>
          <ul className="tablify">
            <li>{this.props.property_manager.name}</li>
            <li>
              <Link to={`mailto:${this.props.property_manager.email}`}>
                {this.props.property_manager.email}
              </Link>
            </li>
            {this.props.property_manager.telephone ? (
              <li>
                <Link
                  to={`tel:${this.props.property_manager.telephone.replace(
                    /[^0-9]/,
                    ''
                  )}`}
                >
                  {this.props.property_manager.telephone}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </section>
    );
  }
}
