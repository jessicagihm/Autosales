import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import ModelsForm from './ModelForm';

function ModelsList() {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    const getModels = async () => {
        const response = await fetch('http://localhost:8100/api/models/');
        const data = await response.json();
        if (response.ok) {
            setModels(data.models);
        } else {
            console.error('Failed to fetch models');
        }
    }

    useEffect(() => {
        getModels();
    }, []);

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2>Models</h2>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                            <button onClick={() => navigate("create")} className="btn btn-primary btn-lg px-4 gap-3">
                                Add a Model
                            </button>
                        </div>
                        {models && models.map(model => (
                            <div key={model.id} className="col-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{model.name}</h5>
                                        <p className="card-text">Manufacturer ID: {model.manufacturer_id}</p>
                                        <p className="card-text"><img src={model.picture_url} alt={model.name} /></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }/>
                <Route path="create" element={<ModelsForm getModels={getModels} />} />
            </Routes>
        </div>
    );
}

export default ModelsList;
