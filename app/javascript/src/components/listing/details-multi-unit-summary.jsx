// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import DetailsBathroom from './details-bathroom';
import DetailsBedroom from './details-bedroom';

export default class DetailsMultiUnitSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUnitDescription = () => {
    return {
      __html: this.props.unit.summary_description
    };
  };

  render() {
    const translate = this.props.translate;
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
                <DetailsBedroom
                  key={bedroom.id}
                  bedroom={bedroom}
                  translate={translate}
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
                <DetailsBathroom
                  key={bathroom.id}
                  bathroom={bathroom}
                  translate={translate}
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

const SubHeaders = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
