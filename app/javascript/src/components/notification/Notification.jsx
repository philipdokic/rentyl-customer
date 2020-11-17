import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import NotificationStyles from './NotificationStyles';

const Notification = () => (
  <NotificationStyles>
    <ToastContainer
      autoClose={3000}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      hideProgressBar={true}
      transition={Flip}
      closeButton={false}
    />
  </NotificationStyles>
);

export default Notification;
