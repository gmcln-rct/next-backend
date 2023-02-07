import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification/notification';

// Connect to the context not the provider
import NotificationContext from '../../store/notification-context';

function Layout(props) {

  const notificationCtx = useContext(NotificationContext);

 const activeNotification = notificationCtx.notification 

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Notification />
    </Fragment>
  );
}

export default Layout;
