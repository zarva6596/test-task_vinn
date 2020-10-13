import React from 'react';
import PropTypes from 'prop-types';
import './showTable.scss';

export const ShowTable = ({
  table,
  average,
  amountClick,
  removeRow,
  hoverAmount,
  endHoverAmount,
  showProcent,
  endShowProcent,
}) => (
  <div
    className={table.length > 0
      ? `showTable`
      : `showTable--none`}
  >
    <ul
      className="showTable__list"
    >
      {table.map((row, i) => (
        <li
          className="showTable__item"
          key={Math.random()}
        >
          {row.map(show => (
            <div
              className="showTable__row"
              key={Math.random()}
            >
              <button
                type="button"
                value={show.id}
                className={!show.hover ? 'showTable__amount'
                  : 'showTable__amount showTable__amount--near'}
                onMouseEnter={event => hoverAmount(event)}
                onMouseLeave={() => endHoverAmount()}
                onClick={event => amountClick(event)}
              >
                {!show.showProcent ? show.amount : `${show.procent} %`}

                <div
                  style={{
                    height: `${+show.procent}%`,
                  }}
                  className={!show.showProcent ? 'showTable__procent--none'
                    : 'showTable__procent'}
                >
                  .
                </div>
              </button>
            </div>
          ))}
          <span
            className="showTable__sum"
            id={i}
            onMouseEnter={event => showProcent(event)}
            onMouseLeave={() => endShowProcent()}
          >
            {row.reduce((acc, current) => acc + current.amount, 0)}
          </span>
          <div>
            <button
              className="showTable__remove"
              type="button"
              value={i}
              onClick={event => removeRow(event)}
            >
              X
            </button>
          </div>
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
  table: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.object),
  ).isRequired,
  average: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeRow: PropTypes.func.isRequired,
  hoverAmount: PropTypes.func.isRequired,
  endHoverAmount: PropTypes.func.isRequired,
  showProcent: PropTypes.func.isRequired,
  endShowProcent: PropTypes.func.isRequired,
};
