import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import CreateReview from '../CreateReview/CreateReview';

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='leave_review_btn' onClick={() => setShowModal(true)}>Leave Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
