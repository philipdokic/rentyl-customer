// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n'
import {
  filter,
  sortBy,
} from 'lodash';

// Components
// -----------------------------------------------
import Spinner from '../spinner/spinner'
import IndicatorToggle from '../toggle/indicator-toggle'

const AddOns = (props) => {

  const translate = ReactI18n.getIntlMessage

  const renderAddOns = () => {
    const currency = props.currency;
    const addonFees = filter(props.temp_fees, ['is_addon', 'true']);
    const sortedAddonFees = sortBy(
      addonFees,
      fee => !props.addonFeeIds.includes(fee.id)
    );
    return (
      <div>
        <div className="addons-wrapper">
          {sortedAddonFees.map((fee, index) =>
            fee.fee_account.quantity_fee ? null : (
              <div className="addons-item" key={fee.id}>
                <div
                  className="addons-image"
                  style={
                    fee.fee_account
                      ? {
                        backgroundImage: `url(${fee.fee_account.fee_image})`
                      }
                      : {
                        backgroundImage: `url('https://via.placeholder.com/360x240')`
                      }
                  }
                >
                  {' '}
                  {fee.description ? (
                    <figure
                      className="line-item-description"
                      style={{ margin: '10px' }}
                    >
                      <i />
                      <span>{fee.description}</span>
                    </figure>
                  ) : null}
                  <IndicatorToggle
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
                      value: parseFloat(fee.value).toFixed(2)
                    })}
                  </b>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <section className="addons">
      {props.availability ? (
        <div>
          {props.availability.bookable ? (
            <div>{renderAddOns()}</div>
          ) : (
              <div className="checkout-info-subsection checkout-error">
                {translate(`cx.errors.listing_generic`)}
              </div>
            )}
        </div>
      ) : (
          <div className="checkout-info-subsection">
            <Spinner />
          </div>
        )}
    </section>
  );
}

export default AddOns
