import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import CustomerForm from './CustomerForm';
import CustomerDetail from './CustomerDetail';

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [createMessage, setCreateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [message, setMessage] = useState(null);
  const [edited, setEdited] = useState(false);
  const navigate = useNavigate();

  const getCustomers = async () => {
    const response = await fetch('http://localhost:8090/api/customers/');
    const data = await response.json();
    if (response.ok) {
        setCustomers(data.customers);
    } else {
        console.error('Failed to fetch customers');
    }
  }

  const fetchCustomers = async () => {
    setDeleted(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [deleted]);

  useEffect(() => {
    if (edited) {
      getCustomers();
      setEdited(false);
    }
  }, [edited]);

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  useEffect(() => {
    if (createMessage) {
      setTimeout(() => {
        setCreateMessage(null);
      }, 3000);
    }
  }, [createMessage]);

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage, setDeleteMessage]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <div>
            <h2>Customers</h2>
            {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
            {createMessage && <div className="alert alert-success">{createMessage}</div>}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
              <button onClick={() => navigate("new")} className="btn btn-primary btn-lg px-4 gap-3">
                Add a Customer
              </button>
            </div>
            {customers && customers.map(customer => {
              if (!customer) return null;
              return (
                  <div key={customer.id} className="col-4 mb-4">
                  <div className="card">
                      <div className="card-body">
                      <h5 className="card-title">{customer.first_name} {customer.last_name}</h5>
                      <p className="card-text">Address: {customer.address || 'None'}</p>
                      <p className="card-text">Phone number: {customer.phone_number || 'None'}</p>
                      <p className="card-text">Custom ID: {customer.customer_id || 'None'}</p>
                      <div className="card-footer">
                      <Link to={`/customers/${customer.id}`}>View/Edit/Delete</Link>
                      </div>
                  </div>
                  </div>
                  </div>
              );
              })}
          </div>
        }/>
        <Route path="new" element={<CustomerForm setCreateMessage={setCreateMessage} getCustomers={getCustomers} />} />
        <Route path=":id" element={<CustomerDetail getCustomers={getCustomers} setDeleted={setDeleted} setEdited={setEdited} setDeleteMessage={setDeleteMessage} />} />
      </Routes>
    </div>
  );
}

export default CustomersList;
