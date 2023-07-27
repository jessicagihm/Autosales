import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesForm() {
  const [automobileVin, setAutomobileVin] = useState('');
  const [salespersonId, setSalespersonId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      automobile_vin: automobileVin,
      salesperson_id: salespersonId,
      customer_id: customerId,
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
      <input
        name="automobile_vin"
        value={automobileVin}
        onChange={(e) => setAutomobileVin(e.target.value)}
        placeholder="Automobile VIN"
      />
      <input
        name="salesperson_id"
        value={salespersonId}
        onChange={(e) => setSalespersonId(e.target.value)}
        placeholder="Salesperson ID"
      />
      <input
        name="customer_id"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Customer ID"
      />
      <input
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />
      <button type="submit">Record Sale</button>
    </form>
  );
}

export default SalesForm;
