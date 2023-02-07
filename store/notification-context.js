import {createContext} from 'react';

// Uppercase because it's a component

const NotificationContext = createContext({
    notification: null,
    showNotification: function () {},
    hideNotification: function () {}
});

export function NotificationContextProvider(props) {
    const {children} = props;



    return (
        <NotificationContext.Provider>
            {children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;