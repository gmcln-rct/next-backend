import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments]);


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    // if(!showComments) {
    //   fetch(`/api/comments/${eventId}`)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // }
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored.',
      status: 'pending'
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        console.log("in if")
        return response.json();
      }
      console.log("in first then")
      // 400 and 500 errors will not be caught by the above if statement
      return response.json().then((data) => {
        console.log(data);
        throw new Error(data.message || 'Something went wrong with comments!');
      });
    }).then((data) => {
      notificationCtx.showNotification({
        title: 'Comment success!!!!.',
        message: 'Your comment was saved',
        status: 'success'
      });
    }).catch((error) => {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Catch: something went wrong with comments!',
        status: 'error'
      });
    })

  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;
