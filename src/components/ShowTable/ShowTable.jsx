import React from 'react';
import PropTypes from 'prop-types';
import './showTable.scss';

export const ShowTable = ({ table, average, amountClick }) => (
  <div
    className="showTable"
  >
    <ul
      className="showTable__list"
    >
      {table.map(row => (
        <li
          className="showTable__item"
          key={Math.random()}
        >
          <div
            className="showTable__row"
          >
            {row.map(show => (
              <button
                type="button"
                key={show.id}
                value={show.id}
                className="showTable__amount"
                onClick={event => amountClick(event)}
              >
                {show.amount}
              </button>
            ))}
          </div>
          <span
            className="showTable__sum"
          >
            {row.reduce((acc, current) => acc + current.amount, 0)}
          </span>
        </li>
      ))}
      <li
        className="showTable__item showTable__average"
      >
        {average.map(amount => (
          <span
            key={Math.random()}
            className="showTable__amount showTable__average-item"
          >
            {amount}
          </span>
        ))}
      </li>
    </ul>
  </div>
);

ShowTable.propTypes = {
  amountClick: PropTypes.func.isRequired,
  table: PropTypes.arrayOf().isRequired,
  average: PropTypes.arrayOf().isRequired,
};
