import React, { useState, useEffect } from 'react';
import './App.css';
import CostForm from './components/CostForm';
import MonthlyReport from './components/MonthlyReport';
import { idb } from './lib/idb';

function App() {
  const [costs, setCosts] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    async function fetchData() {
      const db = await idb.openCostsDB("costsdb", 1);
      const monthlyCosts = await idb.getCostsByMonthAndYear(month, year);
      setCosts(monthlyCosts);
    }
    fetchData();
  }, [month, year]);

  return (
    <div className="App">
      <h1>Cost Manager</h1>
      <div>
        <label>Select Month:</label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {months.map((m, index) => <option value={index} key={index}>{m}</option>)}
        </select>
        <label>Select Year:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map(y => <option value={y} key={y}>{y}</option>)}
        </select>
      </div>
      <CostForm onNewCost={async () => {
        const newCosts = await idb.getCostsByMonthAndYear(month, year);
        setCosts(newCosts);
      }} />
      <MonthlyReport costs={costs} />
    </div>
  );
}

export default App;
