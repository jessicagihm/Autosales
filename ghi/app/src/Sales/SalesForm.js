import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SalesForm() {
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedAutomobile, setSelectedAutomobile] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8090/api/salespeople/')
    .then(response => response.json())
    .then(data => setSalespeople(data.salespeople))
    .catch(error => console.error('Error fetching salespeople:', error));


    fetch('http://localhost:8090/api/customers/')
      .then(response => response.json())
      .then(data => setCustomers(data.customers))
      .catch(error => console.error('Error fetching customers:', error));


    fetch('http://localhost:8100/api/automobiles/')
      .then(response => response.json())
      .then(data => setAutomobiles(data.autos))
      .catch(error => console.error('Error fetching automobiles:', error));
  }, []);

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSelectedSalesperson(value);
  }

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setSelectedCustomer(value);
  }

  const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setSelectedAutomobile(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      automobile_vin: selectedAutomobile,
      salesperson_id: selectedSalesperson,
      customer_id: selectedCustomer,
      price: parseFloat(price),
    };
    const response = await fetch('http://localhost:8090/api/sales/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('There was an error creating the sale', await response.text());
      return;
    }

    const updateResponse = await fetch(`http://localhost:8100/api/automobiles/${selectedAutomobile}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sold: true }),
    });

    if (!updateResponse.ok) {
      console.error('There was an error updating the car status', await updateResponse.text());
      return;
    }

    navigate('/sales');
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a new Sale</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <select name="automobile_vin" value={selectedAutomobile} onChange={handleAutomobileChange}>
            <option value="">--Select an Automobile--</option>
            {automobiles.map(auto => (
              <option key={auto.vin} value={auto.vin}>
                {auto.vin} - {auto.color} {auto.model.name}
              </option>
            ))}
          </select>
            </div>
            <div className="mb-3">
            <select name="salesperson_id" value={selectedSalesperson} onChange={handleSalespersonChange}>
            <option value="">--Select a Salesperson--</option>
            {salespeople.map(salesperson => (
              <option key={salesperson.employee_id} value={salesperson.employee_id}>
                {salesperson.first_name} {salesperson.last_name}
              </option>
            ))}
          </select>
            </div>
            <div className="mb-3">
            <select name="customer_id" value={selectedCustomer} onChange={handleCustomerChange}>
            <option value="">--Select a Customer--</option>
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
            </div>
            <div className="form-floating mb-3">
              <input name="price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price" className="form-control" id="price"/>
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
