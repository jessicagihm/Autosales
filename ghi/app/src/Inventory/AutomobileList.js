import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import AutomobileForm from './AutomobileForm';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);
    const navigate = useNavigate();

    const getAutomobiles = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        const data = await response.json();
        if (response.ok) {
            setAutomobiles(data.autos);
        } else {
            console.error('Failed to fetch automobiles');
        }
    }

    useEffect(() => {
        getAutomobiles();
    }, []);

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2>Automobiles</h2>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                            <button onClick={() => navigate("create")} className="btn btn-primary btn-lg px-4 gap-3">
                                Add an Automobile
                            </button>
                        </div>
                        {automobiles && automobiles.map(auto => (
                            <div key={auto.vin} className="col-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{auto.vin}</h5>
                                        <p className="card-text">Name: {auto.name}</p>
                                        <p className="card-text">Color: {auto.color}</p>
                                        <p className="card-text">Year: {auto.year}</p>
                                        <p className="card-text">Status: {auto.sold ? "Sold" : "Not Sold"}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }/>
                <Route path="create" element={<AutomobileForm getAutomobiles={getAutomobiles} />} />
            </Routes>
        </div>
    );
}

export default AutomobileList;
