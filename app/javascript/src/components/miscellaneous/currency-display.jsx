import React from 'react';
import CurrencyDefinitions from './currency-definitions';
import find from 'lodash/find';

export const CurrencyDisplay = props => (
  <div style={{ display: 'inline' }}>
    {nativeSymbolFromValue(props.currencyValue)}
  </div>
);

export const nativeSymbolFromValue = value =>
  find(CurrencyDefinitions, def => {
    return def.value === value;
  }).symbol_native;
