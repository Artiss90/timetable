import ContainerByDay from './ContainerByDay/ContainerByDay';
import style from './ContainerByMonth.module.css';

function ContainerByMonth() {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  console.log('🚀 ~ file: ContainerByMonth.jsx ~ line 5 ~ ContainerByMonth ~ days', days);
  return (
    <ul className={style.containerMonth}>
      {days.map((item) => (
        <ContainerByDay day={item} />
      ))}
    </ul>
  );
}

export default ContainerByMonth;
