import {createContext} from 'react';

createContext({
    notification: null,
    showNotificaiton: function (notificationData) {},
})

export default NotificationContext;