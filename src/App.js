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
          hover: false,
          showProcent: false,
        });

        id += 1;
      }

      newTable.push(row);
    }

    procentCalculation(newTable);
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

    procentCalculation(newTable);
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
        ...table[0][0],
        amount,
        id,
      });

      id += 1;
    }

    newTable.push(row);

    procentCalculation(newTable);
  };

  const removeRow = (event) => {
    const newArr = [...table];

    newArr.splice(event.target.value, 1);
    handleTable(newArr);
  };

  const hoverAmount = (event) => {
    const newTable = [...table];

    const arr = [];

    newTable.forEach(row => row.forEach(num => arr.push(+num.amount)));

    arr.sort((a, b) => a - b);
    const index = arr.indexOf(+event.target.innerText);

    const a = arr[index + 1];
    const b = arr[index - 1];

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        if (+newTable[i][j].amount === a
          || +newTable[i][j].amount === b) {
          newTable[i][j].hover = true;
        }
      }
    }

    handleTable(newTable);
  };

  const endHoverAmount = () => {
    const newTable = [...table];

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].hover = false;
      }
    }

    handleTable(newTable);
  };

  useEffect(() => {
    if (table.length > 0) {
      const newAverage = [];

      for (let i = 0; i < table[0].length; i += 1) {
        const a = table.reduce((acc, current) => acc + current[i].amount, 0);

        newAverage.push((a / table.length).toFixed(1));
      }

      handleAverahe(newAverage);
    }
  }, [table]);

  function procentCalculation(newTab) {
    const newTable = [...newTab];

    for (let i = 0; i < newTable.length; i += 1) {
      const sum = newTab[i].reduce((acc, num) => acc + (+num.amount), 0);

      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].procent
          = (+newTable[i][j].amount / sum * 100).toFixed(1);
      }
    }

    handleTable(newTable);
  }

  const showProcent = (event) => {
    const newTable = [...table];
    const i = event.target.id;

    for (let j = 0; j < newTable[i].length; j += 1) {
      newTable[i][j].showProcent = true;
    }

    handleTable(newTable);
  };

  const endShowProcent = () => {
    const newTable = [...table];

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].showProcent = false;
      }
    }

    handleTable(newTable);
  };

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
        removeRow={removeRow}
        hoverAmount={hoverAmount}
        endHoverAmount={endHoverAmount}
        showProcent={showProcent}
        endShowProcent={endShowProcent}
      />
    </>
  );
}

export default App;
