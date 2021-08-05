// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import InputIncrementer from '../miscellaneous/input-incrementer';

// -----------------------------------------------
// COMPONENT->ADD-ONS ----------------------------
// -----------------------------------------------
export default class AddOns extends React.Component {

  // Constructor
  // ---------------------------------------------
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

  // Render Fee Quantity
  // ---------------------------------------------
  renderFeeQuantity = feeId => {
    return;
  };

  // Render
  // ---------------------------------------------
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
              fee.fee_account.fee_image
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
            alignItems: 'center',
            width: '100%'
          }}
        >
          <h4>How many?</h4>
          <InputIncrementer
            name="quantity"
            min="0"
            max={fee.fee_account.fee_quantity_max.toString()}
            value={this.state.quantity}
            callbackIncrement={value => this.props.updateQuantity(value)}
            callbackDecrement={value => this.props.updateQuantity(value)}
            symbolContainerStyles={{ height: '47px' }}
            symbolStyles={{ height: '45px', lineHeight: '45px' }}
            inputStyles={{ width: '100%' }}
            inputContainerStyles={{ width: '100%' }}
          />
        </div>
      </div>
    );
  }
}
