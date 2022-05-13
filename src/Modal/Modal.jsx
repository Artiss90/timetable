import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';
const modalRoot = document.querySelector('#root-modal');

const Modal = ({ onClose, isOpen, currentDay, currentMonth, currentPrice }) => {
  const [valueHours, setValueHours] = useState('');
  const [valuePriceByHour, setValuePriceByHour] = useState('');

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

  // TODO for set hours
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

  // TODO for set price by hour
  const onSaveValuePriceByHour = (price) => {
    // * save localStorage
    localStorage.setItem('priceByHour', JSON.stringify(price));

    onClose();
  };

  const onChangeValuePriceByHour = (e) => {
    e.preventDefault();
    setValuePriceByHour(e.target.value);
  };

  return createPortal(
    <div className={style.overlay} onClick={handleOverlayClick}>
      <div className={style.modal}>
        <div className={style.closeModal} onClick={handleOverlayClick}></div>
        {/* //* for set hours */}
        {currentDay && (
          <>
            <input type="number" value={valueHours} onChange={onChangeValueHours} className={style.field} />
            <button type="button" onClick={() => onSaveValueHours(valueHours)} className={style.btnAccept}>
              Ok
            </button>
          </>
        )}
        {/* //* for set price by hour */}
        {currentPrice && (
          <>
            <input type="number" value={valuePriceByHour} onChange={onChangeValuePriceByHour} className={style.field} />
            <button type="button" onClick={() => onSaveValuePriceByHour(valuePriceByHour)} className={style.btnAccept}>
              Ok
            </button>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
