import ButtonByDay from '../ButtonByDay/ButtonByDay';
import style from './ContainerByDay.module.css';

function ContainerByDay({ day, onOpenModal, hours }) {
  return (
    <li className={style.containerDay}>
      <ButtonByDay id={day} onOpenModal={onOpenModal} hours={hours}/>
    </li>
  );
}

export default ContainerByDay;
