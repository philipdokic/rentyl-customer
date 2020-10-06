// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

export default class DetailsSingleOverview extends React.Component {
  static defaultProps = {
    roomType: false
  }

  constructor(props) {
    super(props);
  }

  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $('.details-expand-link').addClass('hidden');
    $('.details-minimize-link').removeClass('hidden');
  };

  truncate = e => {
    e.preventDefault();
    $(this.truncated).addClass('truncated');
    $('.details-minimize-link').addClass('hidden');
    $('.details-expand-link').removeClass('hidden');
  };

  renderPropertyDescription = () => {
    return {
      __html: this.props.property.summary_description
    };
  };

  renderUnitDescription = () => {
    return {
      __html: this.props.unit.summary_description
    };
  };


  render() {
    const translate = this.props.translate;
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
            {!this.props.roomType && (
              <div
              className="subsection"
              dangerouslySetInnerHTML={this.renderPropertyDescription()}
            />
            ) }
            <div
              className="subsection"
              dangerouslySetInnerHTML={this.renderUnitDescription()}
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
