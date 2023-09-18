
import React, { useState } from 'react';
import { idb } from '../lib/idb';

// Adding some basic styles
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    margin: '2rem'
  },
  input: {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1rem'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none'
  }
};

function CostForm({ onNewCost }) {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('FOOD');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await idb.addCost({ sum, category, description });
    onNewCost();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="number" placeholder="Sum" value={sum} onChange={(e) => setSum(e.target.value)} style={styles.input} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
        <option value="FOOD">FOOD</option>
        <option value="HEALTH">HEALTH</option>
        <option value="EDUCATION">EDUCATION</option>
        <option value="TRAVEL">TRAVEL</option>
        <option value="HOUSING">HOUSING</option>
        <option value="OTHER">OTHER</option>
      </select>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} />
      <button type="submit" style={styles.button}>Add Cost</button>
    </form>
  );
}

export default CostForm;
