import React, { useState, useEffect } from 'react';


function AppointmentForm() {
const [dateTime, setDateTime] = useState('');
const [reason, setReason] = useState('');
const [status, setStatus] = useState('');
const [vin, setVin] = useState('');
const [customer, setCustomer] = useState('');
const [technician, setTechnician] = useState('');

useEffect(() => {
    async function getTechnician() {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnician(data.technicians);
      }
    }
    getTechnician();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date_time: dateTime,
      reason,
      status,
      vin,
      customer,
      technician,
    };

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);

    if (response.ok) {
      setDateTime('');
      setReason('');
      setStatus('');
      setVin('');
      setCustomer('');
      setTechnician('');
    }
  };

  const handleDateTimeChange = (e) => {
    const value = e.target.value;
    setDateTime(value);
  };
  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason(value);
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };
  const handleVinChange = (e) => {
    const value = e.target.value;
    setVin(value);
  };
  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setCustomer(value);
  };
  const handleTechnicianChange = (e) => {
    const value = e.target.value;
    setTechnician(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a service appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="first_name" id="first_name" className="form-control"/>
              <label htmlFor="first_name">Automobile VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleCustomerChange} value={customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control"/>
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleStatusChange} value={customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control"/>
              <label htmlFor="customer">Customer</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleDateTimeChange} value={dateTime} placeholder="Date and Time" required type="datetime-local" name="date_time" id="date_time" className="form-control"/>
              <label htmlFor="date_time">Date and Time</label>
            </div>
            <div className="mb-3">
              <select required onChange={handleTechnicianChange} name="technician" id="technician" className="form-select" value={technician}>
                <option value="">Choose a technician</option>
                {technician.map((technician) => {
                  return (
                    <option key={technician.id} value={technician.id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="reason">Reason</label>
              <textarea onChange={handleReasonChange} id="reason" rows="3" name="reason" className="form-control"></textarea>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
      </div>
  );
}


export default AppointmentForm;
