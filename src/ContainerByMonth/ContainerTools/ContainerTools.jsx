import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import style from './ContainerTools.module.css';
import { useState } from 'react';

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

function ContainerTools({ totalHours, priceByHour, changeMonth, currentMonth }) {
  const handleChange = (event) => {
    changeMonth(event.target.value);
  };

  return (
    <li className={style.supportContainer}>
      <p>{`${totalHours} год. * ${priceByHour} грн. = ${totalHours * priceByHour} грн.`}</p>
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
