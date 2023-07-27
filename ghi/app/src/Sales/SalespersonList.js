import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import SalespersonForm from './SalepersonForm';
import SalespersonDetail from './SalespersonDetail';

function SalespeopleList({ deleteMessage, setDeleteMessage }) {
  const [salespeople, setSalespeople] = useState([]);
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const getSalespeople = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    const data = await response.json();
    if (response.ok) {
        setSalespeople(data.salespeople); // Access the "salespeople" key of the data
    } else {
        console.error('Failed to fetch salespeople');
    }
  }

  useEffect(() => {
    getSalespeople();
  }, []);

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {}, 3000);
      console.log(typeof setDeleteMessage);
      return () => {
        clearTimeout(timer);
        setDeleteMessage(null);
      };
    }
  }, [deleteMessage, setDeleteMessage]);

  useEffect(() => {
    if (location.state && location.state.message) {
      const timer = setTimeout(() => {
        navigate('.', { state: null });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const handleAddClick = () => {
    setShowForm(true); // Show the form when the Add button is clicked
  };

  const handleFormClose = () => {
    setShowForm(false); // Hide the form when it's closed
    getSalespeople(); // Refresh the list of salespeople
    navigate('/salespeople');
  };

  return (
    <div className="container">
      {location.state && location.state.message && <div className="alert alert-success">{location.state.message}</div>}
      <h2>Salespeople</h2>
      <div className="row">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
          <button onClick={handleAddClick} className="btn btn-primary btn-lg px-4 gap-3">
            Add a Salesperson
          </button>
        </div>
        {showForm && <SalespersonForm getSalespeople={getSalespeople} onClose={handleFormClose} />}
        {salespeople && salespeople.map(salesperson => {
          return (
            <div key={salesperson.id} className="col-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{salesperson.first_name} {salesperson.last_name}</h5>
                  <p className="card-text">Employee ID: {salesperson.employee_id}</p>
                  <p className="card-text">Custom ID: {salesperson.custom_id || 'None'}</p>
                  <div className="card-footer">
                  <Link to={`/salespeople/${salesperson.id}`}>View/Edit/Delete</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalespeopleList;
