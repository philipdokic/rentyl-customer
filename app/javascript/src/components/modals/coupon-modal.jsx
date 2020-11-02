import React from 'react';
import ReactI18n from 'react-i18n'

const CouponModal = (props) => {

  const translate = ReactI18n.getIntlMessage

  return (
    <>
      <input
        name="coupon_code"
        value={this.props.couponCode}
        onChange={e => props.updateCouponCode(e.target.value)}
        placeholder="Coupon Code"
        style={props.badCode ? { border: '2px solid red' } : {}}
      />
      {this.props.badCode && (
        <p style={{ color: 'red', marginRight: '50%' }}>
          {translate(`cx.details.bad_code`)}
        </p>
      )}
    </>
  );
}


export default CouponModal
