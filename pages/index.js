import {useRef, useState} from 'react';

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    // optional: Could validate here

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback
    };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data));
  };

  function loadFeedbackHandler() {
    fetch('/api/feedback')
    .then(response => response.json())
    .then(data => {
      setFeedbackItems(data.feedback);
    });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <h2>Form</h2>
        <div>
        <label htmlFor="email">Your Email Address</label>
        <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div>
        <label htmlFor="feedback">feedback</label>
        <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
        </form>
        <hr />
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
    </div>
  );
}

export default HomePage;
