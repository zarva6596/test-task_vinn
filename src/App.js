import React, { useState, useEffect } from 'react';
import './App.scss';
import { AddTable } from './components/AddTable';
import { ShowTable } from './components/ShowTable';

function App() {
  const [table, handleTable] = useState([]);
  const [average, handleAverahe] = useState([]);

  const createTable = (m, n) => {
    const newTable = [];
    let id = 0;

    for (let i = 0; i < n; i += 1) {
      const row = [];

      for (let j = 0; j < m; j += 1) {
        let amount = Math.floor(Math.random() * 1000);

        if (amount < 100) {
          amount += 100;
        }

        row.push({
          amount,
          procent: 0,
          id,
        });

        id += 1;
      }

      newTable.push(row);
    }

    handleTable(newTable);
  };

  const amountClick = (event) => {
    const id = event.target.value;

    const newTable = [...table];

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        if (+newTable[i][j].id === +id) {
          newTable[i][j].amount += 1;
        }
      }
    }

    handleTable(newTable);
  };

  const addRow = (m) => {
    const newTable = [...table];

    const row = [];
    let id = table[table.length - 1][m - 1].id + 1;

    for (let j = 0; j < m; j += 1) {
      let amount = Math.floor(Math.random() * 1000);

      if (amount < 100) {
        amount += 100;
      }

      row.push({
        amount,
        procent: 0,
        id,
      });

      id += 1;
    }

    newTable.push(row);

    handleTable(newTable);
  };

  useEffect(() => {
    if (table.length > 0) {
      const newAverage = [];

      for (let i = 0; i < table[0].length; i += 1) {
        const a = table.reduce((acc, current) => acc + current[i].amount, 0);

        newAverage.push((a / table.length).toFixed(2));
      }

      handleAverahe(newAverage);
    }
  }, [table]);

  return (
    <>
      <AddTable
        createTable={createTable}
        addRow={addRow}
        table={table}
      />

      <ShowTable
        table={table}
        average={average}
        amountClick={amountClick}
      />
    </>
  );
}

export default App;
