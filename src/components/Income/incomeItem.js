import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const IncomeItem = ({ id, description, amount, date }) => (
  <div>
    <Link to={`/updateIncome/${id}`}>
      <div style={{display:'inline-flex'}}>
        <p>{date}</p>
        <p>{description}</p>
        <p>{numeral(amount / 100).format('$0,0.00')}</p>
      </div>
    </Link>
  </div>
);

export default IncomeItem;