import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SalespersonDetail({ getSalespeople, setDeleteMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesperson, setSalesperson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchSalesperson = async () => {
    const response = await fetch(`http://localhost:8090/api/salespeople/${id}`);
    const data = await response.json();
    if (response.ok) {
      setSalesperson(data);
    } else {
      console.error('Failed to fetch salesperson');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8090/api/salespeople/${id}/`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setDeleteMessage('Salesperson deleted successfully');
      getSalespeople();
      navigate('/salespeople'); // navigate back to the list
    } else {
      console.error(`Failed to delete salesperson with id ${id}`);
    }
  };

  useEffect(() => {
    fetchSalesperson();
  }, []);

  if (!salesperson) {
    return <div>No salesperson found with the specified ID.</div>;
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const updatedSalesperson = {
      ...salesperson,
      first_name: event.target['first_name'].value,
      last_name: event.target['last_name'].value,
      custom_id: event.target['custom_id'].value,
    };

    const response = await fetch(`http://localhost:8090/api/salespeople/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSalesperson),
    });

    if (response.ok) {
      setSalesperson(updatedSalesperson);
      setIsEditing(false);
      getSalespeople();
    } else {
      console.error(`Failed to update salesperson with id ${id}`);
    }
  };

  const handleCancel = () => {
    navigate('/salespeople');
  };

  return (
    <div className="card salesperson-detail">
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <label>
              First Name:
              <input type="text" name="first_name" defaultValue={salesperson.first_name} />
            </label>
            <label>
              Last Name:
              <input type="text" name="last_name" defaultValue={salesperson.last_name} />
            </label>
            <label>
              Custom ID:
              <input type="text" name="custom_id" defaultValue={salesperson.custom_id} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </form>
        ) : (
          <>
            <h5 className="card-title">{salesperson.first_name} {salesperson.last_name}</h5>
            <p className="card-text">Employee ID: {salesperson.employee_id}</p>
            <p className="card-text">Custom ID: {salesperson.custom_id || 'None'}</p>
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default SalespersonDetail;
