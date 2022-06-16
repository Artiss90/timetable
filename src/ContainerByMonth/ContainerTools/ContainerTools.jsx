import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import style from './ContainerTools.module.css';

const MONTHS = [
  {
    value: 1,
    label: 'Січень',
  },
  {
    value: 2,
    label: 'Лютий',
  },
  {
    value: 3,
    label: 'Березень',
  },
  {
    value: 4,
    label: 'Квітень',
  },
  {
    value: 5,
    label: 'Травень',
  },
  {
    value: 6,
    label: 'Червень',
  },
  {
    value: 7,
    label: 'Липень',
  },
  {
    value: 8,
    label: 'Серпень',
  },
  {
    value: 9,
    label: 'Вересень',
  },
  {
    value: 10,
    label: 'Жовтень',
  },
  {
    value: 11,
    label: 'Листопад',
  },
  {
    value: 12,
    label: 'Грудень',
  },
];

function ContainerTools({ totalHours, totalWorkDay, priceByHour, onOpenModalPrice, changeMonth, currentMonth }) {
  const handleChange = (event) => {
    changeMonth(event.target.value);
    localStorage.setItem('month', JSON.stringify(event.target.value));
  };

  return (
    <li className={style.supportContainer}>
      <button className={style.btn} type="button" onClick={onOpenModalPrice}>
        Змінити оплата/год
      </button>
      <p>{`${totalHours} год. * ${priceByHour} грн. = ${totalHours * priceByHour} грн. (${totalWorkDay} ${
        totalWorkDay > 4 ? 'змін' : 'зміни'
      })`}</p>
      <TextField
        id="outlined-select-currency"
        select
        label="Поточний місяць"
        value={currentMonth}
        onChange={handleChange}
        helperText="Виберіть поточний місяць"
      >
        {MONTHS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </li>
  );
}

export default ContainerTools;
