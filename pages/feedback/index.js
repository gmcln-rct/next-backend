import { useRouter } from 'next/router';

function FeedbackPage() {
  const router = useRouter();

  function loadFeedbackHandler(id) {
    router.push('/feedback/' + id);
  }

  return (
    <div>
      <FeedbackList onFeedbackClick={loadFeedbackHandler} />
    </div>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const jsonData

export default FeedbackPage;