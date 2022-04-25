import style from './ButtonByDay.module.css';

import sn from 'classnames';

function ButtonByDay({ id, hours = 0 }) {
  if (id === 5) {
    hours = 8;
  }
  return (
    <button className={sn(style.btnByDay, { [style.dayOff]: hours === 0 })}>
      <p className={style.titleDay}>{id}</p>
      {hours ? <p className={style.titleHours}>{hours}</p> : false}
    </button>
  );
}

export default ButtonByDay;
