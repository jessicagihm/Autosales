import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CustomerDetail({ getCustomers, setDeleteMessage, setEdited }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  async function updateCustomer(customer) {
    const response = await fetch(`http://localhost:8090/api/customers/${customer.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      throw new Error(`Failed to update customer with id ${customer.id}`);
    }

    const updatedCustomer = await response.json();
    return updatedCustomer;
  }

  async function deleteCustomer(id, navigate) {
    const response = await fetch(`http://localhost:8090/api/customers/${id}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete customer with id ${id}`);
    }

    navigate('/customers', { state: { message: 'Customer deleted' } });
  }

  const handleDelete = async () => {
    try {
      await deleteCustomer(customer.id, navigate);
      setMessage('Customer deleted');
      setDeleteMessage('Customer deleted');
      setTimeout(() => {
        setMessage(null);
        getCustomers();
        navigate('/customers');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(`http://localhost:8090/api/customers/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setCustomer(data);
        setEditedCustomer({
          ...data,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          address: data.address || "",
          phone_number: data.phone_number || "",
          customer_id: data.customer_id || "",
        });
      } else {
        console.error('Failed to fetch customer');
      }
    };

    fetchCustomer();
  }, [id]);

  const handleEditChange = (event) => {
    setEditedCustomer({
      ...editedCustomer,
      [event.target.name]: event.target.value
    });
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (customer.id) {
      try {
        await updateCustomer(editedCustomer);
        setIsEditing(false);
        setMessage('Profile edited');
        setEdited(true);
        setTimeout(() => {
          setMessage(null);
          navigate('/customers', { state: { message: 'Profile edited' } });
        }, 2000);
      } catch (error) {
        console.error("Failed to update customer:", error);
      }
    } else {
      console.error("Cannot update customer: customer id is undefined.");
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  if (!customer) {
    return <div>No customer found with the specified ID.</div>;
  }

  return (
    <div className="card customer-detail">
      {message && <div className="alert alert-success">{message}</div>}
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
        <label>
            First Name:
            <input type="text" name="first_name" value={editedCustomer.first_name} onChange={handleEditChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={editedCustomer.last_name} onChange={handleEditChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={editedCustomer.address} onChange={handleEditChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phone_number" value={editedCustomer.phone_number} onChange={handleEditChange} />
          </label>
          <label>
            Customer ID:
            <input type="text" name="customer_id" value={editedCustomer.customer_id} onChange={handleEditChange} disabled />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div className="card-body">
          <h5 className="card-title">{customer.first_name} {customer.last_name}</h5>
          <p className="card-text">Address: {customer.address}</p>
          <p className="card-text">Phone Number: {customer.phone_number}</p>
          <p className="card-text">Customer ID: {customer.customer_id}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default CustomerDetail;
