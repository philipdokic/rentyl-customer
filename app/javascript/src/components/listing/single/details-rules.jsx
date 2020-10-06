// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { every, some, find, findIndex, includes, flatMap } from 'lodash';
import moment from 'moment';
import styled from 'styled-components';

export default class DetailsSingleRules extends React.Component {
  constructor(props) {
    super(props);
  }

  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $('.rules-expand-link').addClass('hidden');
    $('.rules-minimize-link').removeClass('hidden');
  };

  truncate = e => {
    e.preventDefault();
    $(this.truncated).addClass('truncated');
    $('.rules-minimize-link').addClass('hidden');
    $('.rules-expand-link').removeClass('hidden');
  };
  renderHouseRules = () => {
    return {
      __html: this.props.property.summary_rules
    };
  };

  renderAccommodations = () => {
    return {
      __html: this.props.property.summary_accommodations
    };
  };

  getDepositRefundPolicy() {
    const deposits = this.props.pricing.deposits;
    if (every(deposits, ['refundable', true])) {
      return 'full';
    } else if (some(deposits, ['refundable', true])) {
      return 'deposit_partial';
    } else {
      return 'no_refund';
    }
  }

  calculateBalanceDueDate = () => {
    const dueDates = flatMap(
      this.props.pricing.deposits,
      deposit => deposit.remaining_balance_due_date
    );
    const availableDueDates = [
      'day60',
      'day30',
      'day15',
      'day7',
      'check_in_date',
      'manual'
    ];
    if (dueDates.length > 1) {
      return find(availableDueDates, date => includes(dueDates, date));
    } else {
      return dueDates[0];
    }
  };

  renderBalanceDueText = () => {
    const dueDateOptions = [
      { value: 'day60', label: '60 days prior to check-in' },
      { value: 'day30', label: '30 days prior to check-in' },
      { value: 'day15', label: '15 days prior to check-in' },
      { value: 'day7', label: '7 days prior to check-in' },
      { value: 'check_in_date', label: 'on the check-in date' },
      { value: 'manual', label: 'before check-in' }
    ];
    const dueDate = this.calculateBalanceDueDate();
    const index = findIndex(dueDateOptions, option => option.value === dueDate);
    return dueDateOptions[index].label;
  };

  render() {
    const translate = this.props.translate;
    const check_in =
      moment(
        this.props.unit_availability.default_time_check_in,
        'HH:mm'
      ).format('h:mm A') || null;
    const check_out =
      moment(
        this.props.unit_availability.default_time_check_out,
        'HH:mm'
      ).format('h:mm A') || null;
    return (
      <section id="details-rules">
        <header>
          <h3>{translate(`cx.details.headers.rules`)}</h3>
        </header>
        <main>
          <div
            className="truncated"
            ref={node => {
              this.truncated = node;
            }}
          >
            <div
              className="subsection"
              dangerouslySetInnerHTML={this.renderHouseRules()}
            />
            {this.props.listing.refund_policy ? (
              <div className="subsection">
                <SubHeaders>
                  {translate(`cx.details.headers.cancel_policy`)}
                </SubHeaders>
                <p>
                  <b>
                    {translate(
                      `global.refund_policy.${
                        this.props.listing.refund_policy
                      }.label`
                    )}
                  </b>
                </p>
                {this.props.pricing && this.props.pricing.deposits.length > 0 && (
                  <div className="subsection">
                    <SubHeaders>
                      {translate(`cx.details.headers.booking_deposit_policy`)}
                    </SubHeaders>
                    <p>
                      <b>
                        {translate(
                          `global.refund_policy.${this.getDepositRefundPolicy()}.label`
                        )}
                      </b>
                    </p>
                    <p>
                      Booking deposits are due at booking or booking request
                      confirmation. The remaining balance will then be due{' '}
                      {this.renderBalanceDueText()}.
                    </p>
                    <p />
                  </div>
                )}
                {this.props.listing.refund_policy === 'custom' ? (
                  <p>{this.props.listing.refund_policy_custom}</p>
                ) : (
                  <p>
                    {translate(
                      `global.refund_policy.${
                        this.props.listing.refund_policy
                      }.details`
                    )}
                  </p>
                )}
              </div>
            ) : null}
            <div className="subsection">
              <SubHeaders>
                {translate(`cx.details.headers.check_in_out`)}
              </SubHeaders>
              {this.props.unit_availability.check_in_check_out_policy ? (
                <p>{this.props.unit_availability.check_in_check_out_policy}</p>
              ) : null}
              {check_in && check_in !== 'Invalid date' ? (
                <p>
                  <b>{translate(`cx.details.rules.check_in`)}:</b> {check_in}
                </p>
              ) : null}
              {check_out && check_out !== 'Invalid date' ? (
                <p>
                  <b>{translate(`cx.details.rules.check_out`)}:</b> {check_out}
                </p>
              ) : null}
            </div>
            {this.props.property.summary_accommodations ? (
              <div className="subsection">
                <SubHeaders>
                  {translate(`cx.details.headers.accomodations`)}
                </SubHeaders>
                <div dangerouslySetInnerHTML={this.renderAccommodations()} />
              </div>
            ) : null}
          </div>
          <a
            href="#"
            className="rules-expand-link"
            onClick={e => this.unTruncate(e)}
          >
            {translate(`global.actions.expand`)}
          </a>
          <a
            href="#"
            className="rules-minimize-link hidden"
            onClick={e => this.truncate(e)}
          >
            {translate('global.actions.collapse')}
          </a>
        </main>
      </section>
    );
  }
}

const SubHeaders = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
