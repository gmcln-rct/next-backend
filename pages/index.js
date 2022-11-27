function HomePage() {
  return (
    <div>
      <h1>The Home Page</h1>
      <form>
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
        </form>
    </div>
  );
}

export default HomePage;
