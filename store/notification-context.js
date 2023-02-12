import {createContext, useState, useEffect} from 'react';

// Uppercase because it's a component
const NotificationContext = createContext({
    notification: null,
    showNotification: function (notificationData) {},
    hideNotification: function () {}
});

export function NotificationContextProvider(props) {

    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification && 
            (activeNotification.status === 'success' ||
             activeNotification.status === 'error')
             ) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);

            // Avoid multiple timers
            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeNotification]);

    

    function showNotificationHandler(notificationData) {
        setActiveNotification(notificationData);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    };

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export default NotificationContext;