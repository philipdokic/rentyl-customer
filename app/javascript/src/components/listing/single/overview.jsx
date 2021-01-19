// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->OVERVIEW ---------------------------
// -----------------------------------------------
class Overview extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      details_expand_link: '',
      details_minimize_link: 'hidden',
      truncate: 'truncated'
    };
  }

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    this.setState({
      details_expand_link: 'hidden',
      details_minimize_link: '',
      truncate: ''
    });
  };

  // Truncate
  // ---------------------------------------------
  truncate = e => {
    e.preventDefault();
    this.setState({
      details_expand_link: '',
      details_minimize_link: 'hidden',
      truncate: 'truncated'
    });
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
            className={`${this.state.truncate}`}
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
            className={`details-expand-link ${this.state.details_expand_link}`}
            onClick={e => this.unTruncate(e)}
          >
            {translate(`global.actions.expand`)}
          </a>
          <a
            href="#"
            className={`details-minimize-link ${this.state.details_minimize_link}`}
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