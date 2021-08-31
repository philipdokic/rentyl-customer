import React from 'react';
import PropTypes from 'prop-types';

export default class InputIncrementer extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    callbackKey: PropTypes.string,
    name: PropTypes.string,
    max: PropTypes.string,
    min: PropTypes.string,
    value: PropTypes.number,
    callbackIncrement: PropTypes.func,
    callbackDecrement: PropTypes.func,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    max: '128',
    min: '0',
    value: 0,
    label: null,
    callbackKey: null,
    name: null,
    callbackIncrement: () => {},
    callbackDecrement: () => {},
    readOnly: true
  };

  constructor(props) {
    super(props);

    this.state = {
      max: this.props.max,
      min: this.props.min,
      value: this.props.value
    };
  }

  getPrettyValue() {
    if (this.props.label) {
      const sanitizedLabel = ` ${this.props.label.toLowerCase()}`;
      if ((this.props.liveUpdate ? this.props.value : this.state.value) === 1) {
        return this.state.value + sanitizedLabel;
      }
      return `${this.props.liveUpdate ? this.props.value : this.state.value}${sanitizedLabel}s`;
    }
    return this.props.liveUpdate ? this.props.value : this.state.value;
  }

  handleCallback = type => {
    if (type === 'increment' && this.props.callbackIncrement) {
      if (this.props.callbackKey) {
        this.props.callbackIncrement(this.state.value, this.props.callbackKey);
      } else {
        this.props.callbackIncrement(this.state.value);
      }
    } else if (this.props.callbackDecrement) {
      if (this.props.callbackKey) {
        this.props.callbackDecrement(this.state.value, this.props.callbackKey);
      } else {
        this.props.callbackDecrement(this.state.value);
      }
    }
  };

  increment = e => {
    e.preventDefault();
    if (this.state.value < this.state.max) {
      this.setState({ value: this.state.value + 1 }, () => {
        this.handleCallback('increment');
      });
    }
  };

  decrement = e => {
    e.preventDefault();
    if (this.state.value > this.state.min) {
      this.setState({ value: this.state.value - 1 }, () => {
        this.handleCallback('decrement');
      });
    }
  };

  onChange = e => {
    e.preventDefault();
    let value = Number(e.target.value);
    if (value < Number(this.state.min)) value = Number(this.state.min);
    if (value > Number(this.state.max)) value = Number(this.state.max);
    this.setState({ value }, this.handleCallback);
  };

  render() {
    const prettyValue = this.props.readOnly
      ? this.getPrettyValue()
      : this.props.liveUpdate ? this.props.value : this.state.value;
    return (
      <figure
        className="input-incrementer"
        style={this.props.inputContainerStyles}
      >
        <input
          type={this.props.readOnly ? 'text' : 'number'}
          name={this.props.name}
          className="magnified"
          min={this.state.min}
          max={this.state.max}
          value={prettyValue}
          readOnly={this.props.readOnly}
          onChange={this.onChange}
          style={this.props.inputStyles}
          disabled={this.props.disabled}
        />
        <div
          className="input-incrementer-buttons"
          style={{height:'100%', ...this.props.symbolContainerStyles}}
        >
          <a onClick={this.decrement} style={{height: '96%', ...this.props.symbolStyles}}>
            —
          </a>
          <a onClick={this.increment} style={{height: '96%', ...this.props.symbolStyles}}>
            +
          </a>
        </div>
      </figure>
    );
  }
}

InputIncrementer.defaultProps = {
  readOnly: true,
  disabled: false
};
