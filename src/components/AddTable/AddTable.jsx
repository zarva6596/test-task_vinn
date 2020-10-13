import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './addTable.scss';

export const AddTable = ({ table, createTable, addRow }) => {
  const [m, createM] = useState('');
  const [n, createN] = useState('');

  return (
    <div
      className="addTable"
    >
      <div
        className="addTable__block"
      >
        <h1 className="addTable__heading">Columns = </h1>
        <input
          className="addTable__input"
          type="number"
          max="10"
          min="1"
          value={m}
          onChange={event => createM(event.target.value)}
          placeholder="M"
        />

        <h1 className="addTable__heading">Rows = </h1>
        <input
          className="addTable__input"
          type="number"
          max="10"
          min="1"
          value={n}
          onChange={event => createN(event.target.value)}
          placeholder="N"
        />
      </div>

      <button
        type="button"
        className="addTable__button"
        onClick={() => createTable(m, n)}
      >
        Create
      </button>

      <button
        type="button"
        className={table.length > 0
          ? `addTable__button`
          : `addTable__button--none`}
        onClick={() => addRow(m)}
      >
        Add new row
      </button>
    </div>
  );
};

AddTable.propTypes = {
  table: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.object),
  ).isRequired,
  createTable: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
};
