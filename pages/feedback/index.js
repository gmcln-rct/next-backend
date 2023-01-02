import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }


  return (
    <ul>
      {props.feedbackItems.map(item => (
        <li key={item.id}><button onClick={loadFeedbackHandler.bind()}>Show Details</button></li>
        ))}
    </ul>
  );
}

export async function getStaticProps() {
// Code inside here will not be exposed to visitors
// Should not use http request on internal api
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data
        },
        revalidate: 1
    };
}

export default FeedbackPage;