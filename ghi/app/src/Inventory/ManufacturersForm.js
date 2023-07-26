import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function ManufacturerForm () {
  const [manufacturer, setManufacturer] = useState('');
  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  }

  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = manufacturer;

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }

    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      navigateTo('/manufacturers')
    }
  }

  return (
    <div>
      <div className="my-2 container">
        <Link to={'..'}>
          <button className="btn bg-2" id="Button">Back to manufacturer list</button>
        </Link>
      </div>
      <div className="shadow p-4 mt-4">
        <h1>Add a new manufacturer</h1>
        <form onSubmit={handleSubmit} >
          <div className="form-floating mb-3">
            <input
            onChange={handleManufacturerChange}
            placeholder='manufacturer'
            type='text'
            value={manufacturer}
            className="form-control"
            />
            <label htmlFor='manufacturer'>Manufacturer</label>
          </div>
          <button className="btn bg-2" id="newThingButton">Add manufacturer</button>
        </form>
      </div>
    </div>
  )
}

export default ManufacturerForm;
