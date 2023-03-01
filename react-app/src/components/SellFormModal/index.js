import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import CreateProduct from '../CreateProduct/CreateProduct';
import ProfileButton from '../ProfileButton/ProfileButton';

function SellFormModal({setShowMenu}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id='nav_button' onClick={() => setShowModal(true)}>Sell</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProduct setShowModal={setShowModal} setShowMenu={setShowMenu}/>
        </Modal>
      )}
    </>
  );
}

export default SellFormModal;
