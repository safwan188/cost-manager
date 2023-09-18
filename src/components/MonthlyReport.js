
import React from 'react';
import * as idb from '../lib/idb';

// Adding some basic styles
const styles = {
  container: {
    padding: '1rem',
    margin: '2rem',
    borderRadius: '5px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '1rem'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #ccc'
  },
  categoryTag: {
    padding: '0.2rem 0.5rem',
    borderRadius: '3px',
    background: '#ccc',
    color: 'white',
    fontSize: '0.8rem'
  }
};

function MonthlyReport({ costs }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Monthly Report</h2>
      <ul>
        {costs.map((cost, index) => (
          <li key={index} style={styles.listItem}>
            <span>{new Date(cost.date).toLocaleDateString()}</span>
            <span>{cost.sum}</span>
            <span style={styles.categoryTag}>{cost.category}</span>
            <span>{cost.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MonthlyReport;
