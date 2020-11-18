// Dependencies
// -----------------------------------------------
import { toast } from 'react-toastify';
import { get, startsWith, keys } from 'lodash';

/*
  Normalized error display for API response errors
  More updated than DispatchError

  An object is passed as the only argument so that the component can be used with any options
  without the need to remember an exact order of arguments or to pass `null` for several values
*/

// Should Hide Error
// -----------------------------------------------
const shouldHideError = (err, show4XX) => {
  // When hiding 4XX errors, 422 (unprocessable entity) and 400 should probably still be shown
  if (
    startsWith(err.status, 4) &&
    err.status !== 422 &&
    err.status !== 400 &&
    !show4XX
  )
    return true;

  // Default: error will show
  return false;
};

// Get Error Message
// -----------------------------------------------
const getErrorMessage = err => {
  if (!err || keys(err).length === 0) return "";
  // Add more conditions for error message creation here
  if (get(err, 'data.message')) return `- ${err.data.message}`;
  if (get(err, 'error')) return `- ${err.status}: ${err}`;

  // Default message. Something like "500: internal server error"
  return `- ${err.status}: ${err.statusText}`;
};

// Display Error
// -----------------------------------------------
const displayError = ({
  err = {},
  message = 'Something went wrong',
  show4XX = false, // Default will not show 4XX error, since 400, 404, etc. could be an expected error
  autoClose = 5000, // toasts should autoClose by default for better UX - JB
  toastConfig = {}
}) => {
  if (shouldHideError(err, show4XX)) {
    return;
  } else {
    toast.error(`${message} ${getErrorMessage(err)}`, {
      autoClose,
      ...toastConfig
    });
  }
};

// Export
// -----------------------------------------------
export default displayError;