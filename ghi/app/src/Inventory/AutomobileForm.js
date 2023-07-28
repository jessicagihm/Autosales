import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AutomobileForm({ getAutomobiles }) {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model_id, setModelId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            color: color,
            year: year,
            vin: vin,
            model_id: model_id,
        };

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(automobileUrl, fetchConfig);
            if (response.ok) {
                setColor('');
                setYear("");
                setVin("");
                setModelId("");

                await getAutomobiles();
                navigate('/automobiles', { state: { message: 'Automobile Created' } });
            } else {
                const errorResponse = await response.json();
                console.error(errorResponse);
            }
        } catch (error) {
            console.error('Failed to create automobile:', error);
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a new automobile</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input placeholder="Color" onChange={(e) => setColor(e.target.value)} name="color" required type="text" id="color" className="form-control" value={color} />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Year" onChange={(e) => setYear(e.target.value)} name="year" required type="number" id="year" value={year} className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="VIN" onChange={(e) => setVin(e.target.value)} name="vin" required type="text" id="vin" value={vin} className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input placeholder="Model ID" onChange={(e) => setModelId(e.target.value)} name="model_id" required type="number" id="model_id" value={model_id} className="form-control" />
                            <label htmlFor="model_id">Model ID</label>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;
