import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';
const modalRoot = document.querySelector('#root-modal');

const Modal = ({ onClose, isOpen, currentDay, currentMonth }) => {
  const [valueHours, setValueHours] = useState('');

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
          onClose();
          console.log('Escape');
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const onSaveValueHours = (hours) => {
    if (hours === 0 || hours === '0') {
      hours = '';
    }
    const hoursLocal = JSON.parse(localStorage.getItem('hours')) || {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
      10: {},
      11: {},
      12: {},
    };
    hoursLocal[currentMonth][currentDay] = hours;
    // * save localStorage
    localStorage.setItem('hours', JSON.stringify(hoursLocal));

    onClose();
  };

  const onChangeValueHours = (e) => {
    e.preventDefault();
    setValueHours(e.target.value);
  };
  return createPortal(
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.modal}>
        <div className={style.closeModal} onClick={handleOverlayClick}></div>
        <input type="number" value={valueHours} onChange={onChangeValueHours} />
        <button type="button" onClick={() => onSaveValueHours(valueHours)}>
          Ok
        </button>
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
