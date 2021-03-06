import ContainerByMonth from './ContainerByMonth/ContainerByMonth';

import style from './App.module.css';

function App() {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight(); // ? динамически определяем высоту экрана и запишем её в css переменную

  return (
    <div className={style.containerApp}>
      <ContainerByMonth />
    </div>
  );
}

export default App;
