import React from 'react';

export default class IndicatorToggle extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  toggleAction = e => {
    e.preventDefault();
    if (this.props.args) {
      this.props.toggleAction(
        this.props.toggleItemId,
        this.props.toggleStatus,
        this.props.args
      );
    } else {
      this.props.toggleAction(this.props.toggleItemId, this.props.toggleStatus);
    }
  };

  renderRightSideLabelToggle = () => (
    <a
      className={`indicator-toggle-link ${this.props.extraClass}`}
      href="#"
      onClick={e => this.toggleAction(e)}
    >
      <i
        className={`indicator-toggle ${
          this.props.toggleStatus ? 'toggled-true' : ''
        }`}
      />
      <span>
        {this.props.toggleStatus
          ? this.props.toggleTrueLabel
          : this.props.toggleFalseLabel}
      </span>
    </a>
  );

  renderBothSideLabelToggle = () => (
    <a
      className={`indicator-toggle-link ${this.props.extraClass}`}
      href="#"
      onClick={e => this.toggleAction(e)}
    >
      <span style={{ marginRight: '6px' }}>{this.props.toggleFalseLabel}</span>
      <i
        className={`indicator-toggle ${
          this.props.toggleStatus ? 'toggled-true' : ''
        }`}
      />
      <span>{this.props.toggleTrueLabel}</span>
    </a>
  );

  render() {
    return this.props.bothSideLabel
      ? this.renderBothSideLabelToggle()
      : this.renderRightSideLabelToggle();
  }
}
