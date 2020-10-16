// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import Bathroom from './bathroom';
import Bedroom from './bedroom';

// Styles
// -----------------------------------------------
const SubHeaders = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

// -----------------------------------------------
// COMPONENT->MULTI-UNIT-SUMMARY -----------------
// -----------------------------------------------
export default class MultiUnitSummary extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Render Unit Description
  // ---------------------------------------------
  renderUnitDescription = () => {
    return {
      __html: this.props.unit.summary_description
    };
  };

  // Constructor
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-summary">
        <header>
          <h3>{translate(`cx.details.headers.summary`)}</h3>
        </header>
        <main>
          {this.props.unit.num_bedrooms || this.props.unit.num_sleep_in_beds ? (
            <div className="subsection">
              <SubHeaders>
                {translate(`cx.global.amenities.bedroom_info`)}
              </SubHeaders>
              <p>
                {this.props.unit.num_bedrooms ? (
                  <span>
                    {translate(`cx.details.summary.num_bedrooms`, {
                      num: this.props.unit.num_bedrooms,
                      s: this.props.unit.num_bedrooms == 1 ? '' : 's'
                    })}{' '}
                  </span>
                ) : null}
                {this.props.unit.num_sleep_in_beds ? (
                  <span>
                    {' '}
                    |{' '}
                    {translate(`cx.details.summary.num_sleep_in_beds`, {
                      num: this.props.unit.num_sleep_in_beds,
                      s: this.props.unit.num_sleep_in_beds == 1 ? '' : 's'
                    })}
                  </span>
                ) : null}
              </p>
              {this.props.bedrooms.map(bedroom => (
                <Bedroom
                  key={bedroom.id}
                  bedroom={bedroom}
                />
              ))}
            </div>
          ) : null}
          {this.props.unit.num_bathrooms ? (
            <div className="subsection">
              <SubHeaders>
                {translate(`cx.global.amenities.bathroom_info`)}
              </SubHeaders>
              <p>
                {translate(`cx.details.summary.num_bathrooms`, {
                  num: this.props.unit.num_bathrooms,
                  s: this.props.unit.num_bathrooms == 1 ? '' : 's'
                })}
              </p>
              {this.props.bathrooms.map(bathroom => (
                <Bathroom
                  key={bathroom.id}
                  bathroom={bathroom}
                />
              ))}
            </div>
          ) : null}
          {this.props.unit.summary_description ? (
            <div
              className="subsection"
              dangerouslySetInnerHTML={this.renderUnitDescription()}
            />
          ) : null}
        </main>
      </section>
    );
  }
}