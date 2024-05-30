import React, { createContext, useReducer } from 'react';

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'showNotification':
      return action.payload;
    case 'hideNotification':
      return '';
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
