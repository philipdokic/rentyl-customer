import React from 'react';

export default class CouponModal extends React.PureComponent {
  render() {
    return (
      <>
        <input
          name="coupon_code"
          value={this.props.couponCode}
          onChange={e => this.props.updateCouponCode(e.target.value)}
          placeholder="Coupon Code"
          style={this.props.badCode ? { border: '2px solid red' } : {}}
        />
        {this.props.badCode && (
          <p style={{ color: 'red', marginRight: '50%' }}>
            {this.props.translate(`cx.details.bad_code`)}
          </p>
        )}
      </>
    );
  }
}
