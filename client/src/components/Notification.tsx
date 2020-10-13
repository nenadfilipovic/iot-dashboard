import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@material-ui/core';

import { RootState } from '../types';
import { clearAlert } from '../actions/alert';

const Notification = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const notification = useSelector((state: RootState) => state.alertReducer);

  useEffect(() => {
    setIsOpen(!!notification.message);
  }, [notification.message]);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      message={notification.message}
    />
  );
};

export { Notification };
