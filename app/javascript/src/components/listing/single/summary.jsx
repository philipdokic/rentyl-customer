// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import Bathroom from '../bathroom';
import Bedroom from '../bedroom';

// Styles
// -----------------------------------------------
const MainSummary = styled.main`
  width: 100%;
`;

const SubHeaders = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

// -----------------------------------------------
// COMPONENT->SUMMARY ----------------------------
// -----------------------------------------------
class Summary extends React.Component {

  // Render Unit Description
  // ---------------------------------------------
  renderUnitDescription = () => {
    return {
      __html: this.props.listing.unit.summary_description
    };
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-summary">
        <header>
          <h3>{translate(`cx.details.headers.summary`)}</h3>
        </header>
        <MainSummary>
          {this.props.listing.unit.num_bedrooms || this.props.listing.unit.num_sleep_in_beds ? (
            <div className="subsection">
              <SubHeaders>
                {translate(`cx.global.amenities.bedroom_info`)}
              </SubHeaders>
              <p>
                {this.props.listing.unit.num_bedrooms ? (
                  <span>
                    {translate(`cx.details.summary.num_bedrooms`, {
                      num: this.props.listing.unit.num_bedrooms,
                      s: this.props.listing.unit.num_bedrooms ==1 ? '' : 's'
                    })}{' '}
                  </span>
                ) : null}
                {this.props.listing.unit.num_sleep_in_beds ? (
                  <span>
                    {' '}
                    |{' '}
                    {translate(`cx.details.summary.num_sleep_in_beds`, {
                      num: this.props.listing.unit.num_sleep_in_beds,
                      s: this.props.listing.unit.num_sleep_in_beds == 1 ? '' : 's'
                    })}
                  </span>
                ) : null}
              </p>
              {this.props.listing.bedrooms.map(bedroom => (
                <Bedroom
                  key={bedroom.id}
                  bedroom={bedroom}
                  translate={translate}
                />
              ))}
            </div>
          ) : null}
          {this.props.listing.unit.num_bathrooms ? (
            <div className="subsection">
              <SubHeaders>
                {translate(`cx.global.amenities.bathroom_info`)}
              </SubHeaders>
              <p>
                {translate(`cx.details.summary.num_bathrooms`, {
                  num: this.props.listing.unit.num_bathrooms,
                  s: this.props.listing.unit.num_bathrooms == 1 ? '' : 's'
                })}
              </p>
              {this.props.listing.bathrooms.map(bathroom => (
                <Bathroom
                  key={bathroom.id}
                  bathroom={bathroom}
                  translate={translate}
                />
              ))}
            </div>
          ) : null}
        </MainSummary>
      </section>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Summary);