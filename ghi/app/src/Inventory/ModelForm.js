import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ModelsForm ({ getModels }) {
    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturer_id, setManufacturerId] = useState('');

    let navigate = useNavigate();

    const handleNameChange = (event) => {
      setName(event.target.value);
    }

    const handlePictureUrlChange = (event) => {
      setPictureUrl(event.target.value);
    }

    const handleManufacturerIdChange = (event) => {
      setManufacturerId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name: name,
            picture_url: picture_url,
            manufacturer_id: manufacturer_id,
        };

        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(modelsUrl, fetchConfig);
            if (response.ok) {
              setName('');
              setPictureUrl("");
              setManufacturerId("");

              await getModels(); // Wait for getModels to finish before navigating
              navigate('/models', { state: { message: 'Model Created' } });
            } else {
              const errorResponse = await response.json();
              console.error(errorResponse);
            }
        } catch (error) {
            console.error('Failed to create model:', error);
        }
      }


    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new model</h1>
            <form onSubmit={handleSubmit} id="create-model-form">
              <div className="form-floating mb-3">
                <input placeholder="Name" onChange={handleNameChange} name="name" required type="text" id="name" className="form-control" value={name}/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Picture URL" onChange={handlePictureUrlChange} name="picture_url" required type="text" id="picture_url" className="form-control" value={picture_url}/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Manufacturer ID" onChange={handleManufacturerIdChange} name="manufacturer_id" required type="number" id="manufacturer_id" className="form-control" value={manufacturer_id}/>
                <label htmlFor="manufacturer_id">Manufacturer ID</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ModelsForm;
