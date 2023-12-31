import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import SalespersonForm from './SalespersonForm';
import SalespersonDetail from './SalespersonDetail';

function SalespersonCard({ salesperson }) {
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
}

function SalespeopleList() {
  const [salespeople, setSalespeople] = useState([]);
  const [createMessage, setCreateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const navigate = useNavigate();

  const getSalespeople = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    const data = await response.json();
    if (response.ok) {
      setSalespeople(data.salespeople);
    } else {
      console.error('Failed to fetch salespeople');
    }
  }

  const clearMessage = (messageSetter) => {
    setTimeout(() => {
      messageSetter(null);
    }, 3000);
  }

  useEffect(() => {
    getSalespeople();
  }, []);

  useEffect(() => {
    if (createMessage) {
      clearMessage(setCreateMessage);
    }
  }, [createMessage]);

  useEffect(() => {
    if (deleteMessage) {
      clearMessage(setDeleteMessage);
    }
  }, [deleteMessage]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <div>
            <h2>Salespeople</h2>
            {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
            {createMessage && <div className="alert alert-success">{createMessage}</div>}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
              <button onClick={() => navigate("create")} className="btn btn-primary btn-lg px-4 gap-3">
                Add a Salesperson
              </button>
            </div>
            {salespeople && salespeople.map(salesperson => (
              <SalespersonCard key={salesperson.id} salesperson={salesperson} />
            ))}
          </div>
        }/>
        <Route path="create" element={<SalespersonForm setCreateMessage={setCreateMessage} getSalespeople={getSalespeople} />} />
        <Route path=":id" element={<SalespersonDetail getSalespeople={getSalespeople} setDeleteMessage={setDeleteMessage} />} />
      </Routes>
    </div>
  );
}

export default SalespeopleList;
