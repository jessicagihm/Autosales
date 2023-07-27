import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function createSalesperson(salesperson) {
  const response = await fetch('http://localhost:8090/api/salespeople/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salesperson),
  });

  if (!response.ok) {
    throw new Error(`Failed to create salesperson`);
  }

  const newSalesperson = await response.json();
  return newSalesperson;
}



function SalespersonForm ({ getSalespeople, onClose }) {
  console.log('getSalespeople', getSalespeople);


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [customId, setCustomId] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const salesperson = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
      custom_id: customId,
    };

    createSalesperson(salesperson)
    .then(newSalesperson => {
      console.log('Salesperson created:', newSalesperson);
      navigate('/salespeople');
      if (typeof onClose === 'function') {
        onClose();
      }
    })
    .catch(error => console.error('Failed to create salesperson:', error));
};


  const handleFormClose = () => {
  console.log(typeof getSalespeople); // debug line
  if (typeof getSalespeople === 'function') {
    getSalespeople(); // Refresh the list of salespeople
  }
  navigate('/salespeople'); // Navigate to the salespeople list
  if (typeof onClose === 'function') {
    onClose();
  }
};

  return (
    <div className="row">
      {message && <div className="alert alert-success">{message}</div>}
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a new Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
            <div className="form-floating mb-3">
              <input
                placeholder="First Name"
                onChange={handleFirstNameChange}
                name="first_name"
                required
                type="text"
                id="first_name"
                className="form-control"
                value={firstName}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="Last Name"
                onChange={handleLastNameChange}
                name="last_name"
                required
                type="text"
                id="last_name"
                className="form-control"
                value={lastName}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                placeholder="CustomStaff ID (optional)"
                onChange={event => setCustomId(event.target.value)}
                name="custom_id"
                type="text"
                id="custom_id"
                className="form-control"
                value={customId}
              />
              <label htmlFor="employee_id">Staff ID (optional)</label>
            </div>
            <button className="btn btn-primary">Add</button>
            <button type="button" className="btn btn-secondary" onClick={handleFormClose}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
