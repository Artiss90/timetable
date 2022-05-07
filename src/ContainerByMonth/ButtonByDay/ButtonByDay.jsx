import style from './ButtonByDay.module.css';

import sn from 'classnames';

function ButtonByDay({ id, hours, onOpenModal }) {
  return (
    <button className={sn(style.btnByDay, { [style.dayOff]: !hours })} onClick={() => onOpenModal(id)}>
      <p className={style.titleDay}>{id}</p>
      {hours ? <p className={style.titleHours}>{hours}</p> : false}
    </button>
  );
}

export default ButtonByDay;
