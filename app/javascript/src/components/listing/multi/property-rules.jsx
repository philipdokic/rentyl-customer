// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->MULTI-PROPERTY-OVERVIEW ------------
// -----------------------------------------------
class MultiPropertyRules extends React.Component {

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $(e.target).remove();
  };

  // Render House Rules
  // ---------------------------------------------
  renderHouseRules = () => {
    return {
      __html: this.props.listing.property.summary_rules
    };
  };

  // Render Accommodations
  // ---------------------------------------------
  renderAccommodations = () => {
    return {
      __html: this.props.listing.property.summary_accommodations
    };
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section id="details-rules">
        <header>
          <h3>{translate(`cx.details.headers.rules`)}</h3>
        </header>
        <main>
          <div
            className="truncated"
            ref={node => {
              this.truncated = node;
            }}
          >
            <div
              className="subsection"
              dangerouslySetInnerHTML={this.renderHouseRules()}
            />
            {this.props.listing.property.summary_accommodations ? (
              <div className="subsection">
                <h4>{translate(`cx.details.headers.accomodations`)}</h4>
                <div dangerouslySetInnerHTML={this.renderAccommodations()} />
              </div>
            ) : null}
          </div>
          <a href="#" className="expand-link" onClick={e => this.unTruncate(e)}>
            {translate(`global.actions.expand`)}
          </a>
        </main>
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
export default connect(mapStateToProps)(MultiPropertyRules);