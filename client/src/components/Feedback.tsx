import React, { ReactElement } from 'react';
import Modal from 'react-modal';
import { useToasts } from 'react-toast-notifications';
import feedbackImg from '../assets/feedback.jpg';
import useInputState from '../hooks/useInputState';
import { post } from '../utils/requests';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export default function Feedback({ open, handleClose }: Props): ReactElement {
  const feedback = useInputState();
  const { addToast } = useToasts();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.value) return;
    setLoading(true);
    try {
      await post('/feedback', { message: feedback.value });
      setLoading(false);
      feedback.handleReset();
      handleClose();
      addToast('Feedback Sent', { appearance: 'success' });
    } catch (err) {
      setLoading(false);
      addToast('Something went wrong', { appearance: 'error' });
    }
  };

  return (
    <div>
      <Modal
        onRequestClose={handleClose}
        className="feedback"
        overlayClassName="overlay"
        isOpen={open}
      >
        <h1>Submit Feedback</h1>
        <main>
          <img src={feedbackImg} alt="Feedback" />
          <form onSubmit={handleSubmit} className="right">
            <textarea
              placeholder="Type your feedback here"
              name="feedback"
              id="feedback"
              value={feedback.value}
              onChange={feedback.handleChange}
              rows={5}
            />
            <button disabled={loading} className="btn">
              Submit
            </button>
          </form>
        </main>
      </Modal>
    </div>
  );
}
