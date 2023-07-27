import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function fetchData(url, setter) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    setter(data);
  } else {
    console.error(`Data from ${url} is not an array`);
    setter([]);
  }
}

function SalesForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedAutomobile, setSelectedAutomobile] = useState('');
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8090/api/salespeople/')
      .then(response => response.json())
      .then(data => setSalespeople(data.salespeople));

    fetch('http://localhost:8090/api/customers/')
      .then(response => response.json())
      .then(data => setCustomers(data.customers));

    fetch('http://localhost:8100/api/automobiles/')
      .then(response => response.json())
      .then(data => {
        const unsoldAutomobiles = data.autos.filter(auto => auto.sold === false);
        setAutomobiles(unsoldAutomobiles);
      });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      automobile_vin: selectedAutomobile,
      salesperson_id: selectedSalesperson,
      customer_id: selectedCustomer,
      price: price,
    };

    const response = await fetch('http://localhost:8090/api/sales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      navigate('/sales');
    } else {
      const errorData = await response.json();
      console.error('Failed to record sale', errorData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="automobile_vin"
        value={selectedAutomobile}
        onChange={(e) => setSelectedAutomobile(e.target.value)}
      >
        {automobiles.map((auto) => (
          <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
        ))}
      </select>

      <select
        name="salesperson_id"
        value={selectedSalesperson}
        onChange={(e) => setSelectedSalesperson(e.target.value)}
      >
        {salespeople.map((salesperson) => (
          <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
        ))}
      </select>

      <select
        name="customer_id"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Sale Price"
      />

      <button type="submit">Record Sale</button>
    </form>
  );
}

export default SalesForm;
