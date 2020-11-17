// Dependencies
// -----------------------------------------------
import React from 'react';
import InputIncrementer from '../toggle/indicator-toggle';
import ReactI18n from 'react-i18n'

export default class AddOns extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: this.props.feeQuantities.find(
        feeQ => feeQ.id === this.props.fee.id
      )
        ? this.props.feeQuantities.find(feeQ => feeQ.id === this.props.fee.id)
            .quantity
        : 0
    };
  }

  renderFeeQuantity = feeId => {
    return;
  };

  render() {
    const translate = ReactI18n.getIntlMessage;
    const { fee } = this.props;
    const feeValue = this.props.fee.value * this.props.quantity;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {this.props.addonImages ? (
          <img
            alt="addons"
            src={
              fee.fee_account
                ? `${fee.fee_account.fee_image}`
                : 'https://via.placeholder.com/360x240'
            }
          />
        ) : null}
        <h2>{fee.name}</h2>
        {fee.description ? (
          <figure
            className="line-item-description"
            style={{ marginLeft: '5px', textAlign: 'center' }}
          >
            <i />
            <span>{fee.description}</span>
          </figure>
        ) : null}
        <div>
          <div
            style={{
              minWidth: '84px',
              verticalAlign: 'middle',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: '400'
            }}
          >
            {translate(`global.parsers.currency.${this.props.currency}`, {
              value: parseFloat(fee.value).toFixed(2)
            })}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <h4>How many?</h4>
            <InputIncrementer
              name="quantity"
              min="0"
              max={fee.fee_account.fee_quantity_max}
              value={this.state.quantity}
              callbackIncrement={value => this.props.updateQuantity(value)}
              callbackDecrement={value => this.props.updateQuantity(value)}
              symbolContainerStyles={{ height: '47px', width: '35px' }}
              symbolStyles={{ lineHeight: '45px' }}
              inputStyles={{ width: '100%' }}
              inputContainerStyles={{ width: '50%' }}
            />
          </div>
        </div>
      </div>
    );
  }
}
