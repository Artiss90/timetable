import ButtonByDay from '../ButtonByDay/ButtonByDay';
import style from './ContainerByDay.module.css';

function ContainerByDay({ day }) {
  return (
    <li className={style.containerDay}>
      <ButtonByDay id={day} />
    </li>
  );
}

export default ContainerByDay;
