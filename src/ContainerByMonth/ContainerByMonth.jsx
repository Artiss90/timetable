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
  // TODO создаем базовую таблицу учёта часов если таковой нет
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

  const priceByHourLocal = JSON.parse(localStorage.getItem('priceByHour'));
  // TODO устанавливаем почасовую оплату если таковой нет
  if (!priceByHourLocal) {
    localStorage.setItem('priceByHour', JSON.stringify('80'));
  }

  const [tableHours, setTableHours] = useState(hoursLocal);
  const [showModal, setShowModal] = useState(false);
  const [showModalPrice, setShowModalPrice] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [totalHours, setTotalHours] = useState(0);
  const [totalWorkDay, setTotalWorkDay] = useState(0);
  const [priceByHour, setPriceByHour] = useState(priceByHourLocal);

  useEffect(() => {
    const currentTableHours = JSON.parse(localStorage.getItem('hours'));
    if (!currentTableHours) {
      return;
    }
    setTableHours(currentTableHours);
    // * всего рабочих часов за месяц
    const calcHours = Object.values(currentTableHours[currentMonth]).reduce((acc, item) => {
      if (!item) {
        return acc;
      }
      return (acc += +item);
    }, 0);
    // * всего количество рабочих дней за месяц
    const calcWorkDays = Object.values(currentTableHours[currentMonth]).reduce((acc, item) => {
      if (!item) {
        return acc;
      }
      return (acc += 1);
    }, 0);
    setTotalHours(calcHours);
    setTotalWorkDay(calcWorkDays);
  }, [currentMonth, showModal]);

  // * change prise by hour
  useEffect(() => {
    const currentPriceByHour = JSON.parse(localStorage.getItem('priceByHour'));
    if (currentPriceByHour !== priceByHour) {
      setPriceByHour(currentPriceByHour);
    }
  }, [priceByHour, showModalPrice]);

  // * change month
  useEffect(() => {
    const currentMonthLocal = JSON.parse(localStorage.getItem('month'));

    if (currentMonthLocal !== currentMonth && currentMonthLocal) {
      setCurrentMonth(currentMonthLocal);
    }
  }, [currentMonth]);

  // *for modal set hours
  const onCloseModal = () => {
    setShowModal(false);
  };
  const onOpenModal = (day) => {
    setCurrentDay(day);
    setShowModal(true);
  };

  // *for modal set price by hours
  const onCloseModalPrice = () => {
    setShowModalPrice(false);
  };
  const onOpenModalPrice = () => {
    setShowModalPrice(true);
  };
  return (
    <div className={style.containerMain}>
      <ul className={style.containerMonth}>
        {DAYS.map((day) => (
          <ContainerByDay day={day} key={day} hours={hoursLocal[currentMonth][day]} onOpenModal={onOpenModal} />
        ))}
        <ContainerTools
          totalHours={totalHours}
          totalWorkDay={totalWorkDay}
          priceByHour={priceByHour}
          changeMonth={setCurrentMonth}
          changePriceByHour={setPriceByHour}
          onOpenModalPrice={onOpenModalPrice}
          currentMonth={currentMonth}
        />
      </ul>

      {/* //* модальное окно для внесения часов */}
      {showModal && (
        <Modal onClose={onCloseModal} isOpen={showModal} currentDay={currentDay} currentMonth={currentMonth} />
      )}
      {/* //* модальное окно для изменения почасовой оплаты */}
      {showModalPrice && <Modal onClose={onCloseModalPrice} isOpen={showModalPrice} currentPrice={priceByHour} />}
    </div>
  );
}

export default ContainerByMonth;
