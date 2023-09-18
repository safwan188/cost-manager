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
      if (!db) console.log("Could not open the database.");
      
      const transaction = db.transaction(["costs"], "readonly");
      const objectStore = transaction.objectStore("costs");
      const request = objectStore.getAll();

      request.onsuccess = function(event) {
        const allCosts = event.target.result;
        setAllCosts(allCosts);
      };
    }
    fetchData();
  }, [year]);

  const getCostsByMonth = (month) => {
    return allCosts.filter(cost => {
      const date = new Date(cost.date);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  }
   return (
    <div className="App">
      <h1>Cost Manager</h1>
      <div>
        <label>Select Year:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {years.map(y => <option value={y} key={y}>{y}</option>)}
        </select>
      </div>
      <CostForm onNewCost={async () => {
        // Your existing logic here
      }} />
      {months.map((month, index) => (
        <div key={index}>
          <h2>{month}</h2>
          <MonthlyReport costs={getCostsByMonth(index)} />
        </div>
      ))}
    </div>
  );
}




export default App;
