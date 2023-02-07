import {createContext, useState} from 'react';

// Uppercase because it's a component

const NotificationContext = createContext({
    notification: null,
    showNotification: function () {},
    hideNotification: function () {}
});

export function NotificationContextProvider(props) {

    const [activeNotification, setActiveNotification] = useState();

    return (
        <NotificationContext.Provider>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;