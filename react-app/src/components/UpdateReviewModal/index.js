import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import UpdateReview from '../UpdateReview/UpdateReview';

function UpdateReviewModal({reviewto}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='editReviewButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReview setShowModal={setShowModal} review2={reviewto}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
