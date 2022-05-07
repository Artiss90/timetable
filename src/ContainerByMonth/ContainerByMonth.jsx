import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import ContainerByDay from './ContainerByDay/ContainerByDay';
import ContainerTools from './ContainerTools/ContainerTools';

import style from './ContainerByMonth.module.css';

function ContainerByMonth() {
  const DAYS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const hoursLocal = JSON.parse(localStorage.getItem('hours'));
  // * создаем базовую таблицу учёта часов если таковой нет
  if (!hoursLocal) {
    localStorage.setItem(
      'hours',
      JSON.stringify({
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
      })
    );
  }

  const [tableHours, setTableHours] = useState(hoursLocal);
  const [showModal, setShowModal] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [totalHours, setTotalHours] = useState(0);
  const [priceByHour, setPriceByHour] = useState(80);

  useEffect(() => {
    const currentTableHours = JSON.parse(localStorage.getItem('hours'));
    if (!currentTableHours) {
      return;
    }
    setTableHours(currentTableHours);
    const calcHours = Object.values(currentTableHours[currentMonth]).reduce((acc, item) => {
      if (!item) {
        return acc;
      }
      return (acc += +item);
    }, 0);
    setTotalHours(calcHours);
  }, [currentMonth, showModal]);

  const onCloseModal = () => {
    setShowModal(false);
  };
  const onOpenModal = (day) => {
    setCurrentDay(day);
    setShowModal(true);
  };

  return (
    <div className={style.containerMain}>
      <ul className={style.containerMonth}>
        {DAYS.map((day) => (
          <ContainerByDay day={day} key={day} hours={hoursLocal[currentMonth][day]} onOpenModal={onOpenModal} />
        ))}
        <ContainerTools
          totalHours={totalHours}
          priceByHour={priceByHour}
          changeMonth={setCurrentMonth}
          currentMonth={currentMonth}
        />
      </ul>

      {/* //* модальное окно для внесения часов */}
      {showModal && (
        <Modal onClose={onCloseModal} isOpen={showModal} currentDay={currentDay} currentMonth={currentMonth} />
      )}
    </div>
  );
}

export default ContainerByMonth;
