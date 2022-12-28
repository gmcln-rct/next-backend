import {useRef} from 'react';

function HomePage() {
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

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <h2>Form</h2>
        <div>
        <label htmlFor="email">Your Email Address</label>
        <input type="email" id="email" ref={emailInputRef} />
        </div>
        {/* <div>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
        </div> */}
        <div>
        <label htmlFor="feedback">feedback</label>
        <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button onClick={submitFormHandler}>Send Feedback</button>
        </form>
    </div>
  );
}

export default HomePage;
