import {useRef} from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <h2>Form</h2>
        <div>
        <label htmlFor="email">Your Email Address</label>
        <input type="email" id="email" />
        </div>
        <div>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
        </div>
        <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5"></textarea>
        </div>
        <button>Send Message</button>
        </form>
    </div>
  );
}

export default HomePage;
