// Dependencies
// -----------------------------------------------
import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// -----------------------------------------------
// FUNCTION->SCROLL-TO-TOP -----------------------
// -----------------------------------------------
function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return <Fragment>{children}</Fragment>;
}

// Export
// -----------------------------------------------
export default withRouter(ScrollToTop);