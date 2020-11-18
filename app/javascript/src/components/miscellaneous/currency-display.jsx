// Dependencies
// -----------------------------------------------
import React from 'react';
import find from 'lodash/find';

// Components
// -----------------------------------------------
import CurrencyDefinitions from './currency-definitions';

// Currency Display
// -----------------------------------------------
export const CurrencyDisplay = props => (
  <div style={{ display: 'inline' }}>
    {nativeSymbolFromValue(props.currencyValue)}
  </div>
);

// Native Symbol From Value
// -----------------------------------------------
export const nativeSymbolFromValue = value =>
  find(CurrencyDefinitions, def => {
    return def.value === value;
  }).symbol_native;
