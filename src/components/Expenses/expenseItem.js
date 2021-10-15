import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseItem = ({ id, title, amount, date, category }) => (
  <div>
    <Link to={`/updateExpense/${id}`}>
      <div style={{display:'inline-flex'}}>
        <p>{date}</p>
        <p>{title}</p>
        <p>{numeral(amount / 100).format('$0,0.00')}</p>
        <p>{category}</p>
      </div>
    </Link>
  </div>
);

export default ExpenseItem;