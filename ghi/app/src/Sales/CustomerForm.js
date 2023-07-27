import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerForm({ getCustomers, setCreateMessage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerId, setCustomerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      address: address,
      phone_number: phoneNumber,
      customer_id: customerId,
    };

    const response = await fetch('http://localhost:8090/api/customers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setCreateMessage('Customer created successfully');
      getCustomers();
      navigate('..');
    } else {
      console.error('Failed to create customer');
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a new customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input name="first_name" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First Name" className="form-control" id="first_name"/>
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input name="last_name" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Last Name" className="form-control" id="last_name"/>
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input name="address" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address" className="form-control" id="address"/>
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input name="phone_number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder="Phone Number" className="form-control" id="phone_number"/>
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div className="form-floating mb-3">
              <input name="customer_id" onChange={(e) => setCustomerId(e.target.value)} value={customerId} placeholder="Customer ID" className="form-control" id="customer_id"/>
              <label htmlFor="customer_id">Customer ID</label>
            </div>
            <button className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('..')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
