// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->OVERVIEW ---------------------------
// -----------------------------------------------
class Overview extends React.Component {

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $('.details-expand-link').addClass('hidden');
    $('.details-minimize-link').removeClass('hidden');
  };

  // Truncate
  // ---------------------------------------------
  truncate = e => {
    e.preventDefault();
    $(this.truncated).addClass('truncated');
    $('.details-minimize-link').addClass('hidden');
    $('.details-expand-link').removeClass('hidden');
  };

  // Render Property Description
  // ---------------------------------------------
  renderPropertyDescription = () => {
    return {
      __html: this.props.listing.property.summary_description
    };
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section>
        <header>
          <h3>{translate(`cx.details.headers.description`)}</h3>
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
              dangerouslySetInnerHTML={this.renderPropertyDescription()}
            />
          </div>
          <a
            href="#"
            className="details-expand-link"
            onClick={e => this.unTruncate(e)}
          >
            {translate(`global.actions.expand`)}
          </a>
          <a
            href="#"
            className="details-minimize-link hidden"
            onClick={e => this.truncate(e)}
          >
            {translate('global.actions.collapse')}
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
export default connect(mapStateToProps)(Overview);