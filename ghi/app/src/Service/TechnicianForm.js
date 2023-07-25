import React, { useState, useEffect } from 'react';


function TechnicianForm() {
    const[first_name, setFirstName] = useState('');
    const[last_name, setLastName] = useState('');
    const[employee_id, setEmployeeId] = useState('');


    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
      };
      const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
      };
      const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setEmployeeId(value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            first_name,
            last_name,
            employee_id,
        };

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(technicianUrl, fetchConfig);

        if (response.ok) {
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    };
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Technician</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={handleFirstNameChange} value={first_name} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control"/>
                    <label htmlFor="first_name">First name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleLastNameChange} value={last_name} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control"/>
                    <label htmlFor="last_name">Last name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEmployeeIdChange} value={employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control"/>
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>

    )
}


export default TechnicianForm
