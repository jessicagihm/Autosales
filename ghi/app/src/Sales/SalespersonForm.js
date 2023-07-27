import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SalespersonForm ({ getSalespeople, setCreateMessage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [customId, setCustomId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
      custom_id: customId,
    };

    const response = await fetch('http://localhost:8090/api/salespeople/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setCreateMessage('Salesperson created successfully');
      getSalespeople();
      navigate('..'); // Navigate back to the list page
    } else {
      console.error('Failed to create salesperson');
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a new salesperson</h1>
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
              <input name="employee_id" onChange={(e) => setEmployeeId(e.target.value)} value={employeeId} placeholder="Employee ID" className="form-control" id="employee_id" disabled/>
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <div className="form-floating mb-3">
              <input name="custom_id" onChange={(e) => setCustomId(e.target.value)} value={customId} placeholder="Custom ID" className="form-control" id="custom_id"/>
              <label htmlFor="custom_id">Custom ID</label>
            </div>
            <button className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('..')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
