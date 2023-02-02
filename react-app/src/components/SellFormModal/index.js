import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import CreateProduct from '../CreateProduct/CreateProduct';

function SellFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='sellbtn'  onClick={() => setShowModal(true)}>Sell</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProduct setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default SellFormModal;
