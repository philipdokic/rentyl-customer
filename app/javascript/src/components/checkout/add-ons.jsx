// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import { filter, sortBy } from 'lodash';

// Components
// -----------------------------------------------
import Ripple from '../miscellaneous/ripple';
import Indicator from '../toggle/indicator';

// Add Ons
// -----------------------------------------------
const AddOns = (props) => {
  const translate = ReactI18n.getIntlMessage;
  console.log(props.temp_fees);
  const renderAddOns = () => {
    const currency = props.currency;
    const addonFees = filter(props.temp_fees, ['is_addon', 'true']);
    const sortedAddonFees = sortBy(
      addonFees,
      (fee) => !props.addonFeeIds.includes(fee.id)
    );

    return sortedAddonFees.map(
      (fee, index) =>
        fee.fee_account.quantity_fee && (
          <div className="addons-wrapper">
            <div className="addons-item" key={fee.id}>
              <div
                className="addons-image"
                style={
                  fee.fee_account.fee_image != null
                    ? {
                        backgroundImage: `url(${fee.fee_account.fee_image})`,
                      }
                    : {
                        backgroundImage: `url('https://via.placeholder.com/360x240')`,
                      }
                }
              >
                {' '}
                {fee.description && <figure
                    className="line-item-description"
                    style={{ margin: '10px' }}
                  >
                    <i />
                    <span>{fee.description}</span>
                  </figure>}
                <Indicator
                  toggleAction={props.updateFees}
                  toggleStatus={props.addonFeeIds.includes(fee.id)}
                  toggleItemId={fee.id}
                  toggleFalseLabel=""
                  toggleTrueLabel=""
                />
              </div>
              <div className="addons-info">
                <span>{fee.name}</span>
                <b>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: parseFloat(fee.value).toFixed(2),
                  })}
                </b>
              </div>
            </div>
          </div>
        )
    );
  };

  return props.availability ? (
    props.availability.bookable ? (
      renderAddOns()
    ) : (
      <div className="checkout-info-subsection checkout-error">
        {translate(`cx.errors.listing_generic`)}
      </div>
    )
  ) : (
    <div className="checkout-info-subsection">
      <Ripple color="#50E3C2" />
    </div>
  );
};

// Export
// -----------------------------------------------
export default AddOns;
