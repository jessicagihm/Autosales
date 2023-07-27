import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

async function updateSalesperson(salesperson) {
  const response = await fetch(`http://localhost:8090/api/salespeople/${salesperson.id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(salesperson),
  });

  if (!response.ok) {
    throw new Error(`Failed to update salesperson with id ${salesperson.id}`);
  }

  const updatedSalesperson = await response.json();
  return updatedSalesperson;
}

async function deleteSalesperson(id) {
  const response = await fetch(`http://localhost:8090/api/salespeople/${id}/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete salesperson with id ${id}`);
  }

  return id;
}

function SalespersonDetail({ getSalespeople }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesperson, setSalesperson] = useState(null);
  const [editedSalesperson, setEditedSalesperson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSalesperson = async () => {
      const response = await fetch(`http://localhost:8090/api/salespeople/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setSalesperson(data);
        setEditedSalesperson({
          ...data,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          employee_id: data.employee_id || "",
          custom_id: data.custom_id || "",
        });
      } else {
        console.error('Failed to fetch salesperson');
      }
    };

    fetchSalesperson();
  }, [id]);

  const handleEditChange = (event) => {
    setEditedSalesperson({
      ...editedSalesperson,
      [event.target.name]: event.target.value
    });
  }

  const handleDelete = async () => {
    try {
      await deleteSalesperson(salesperson.id);
      setMessage('Salesperson deleted');
      setTimeout(() => {
        setMessage(null);
        navigate('/salespeople', { state: { message: 'Salesperson deleted' } });
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (salesperson.id) {
      try {
        await updateSalesperson(editedSalesperson);
        setIsEditing(false);
        setMessage('Profile edited');
        setTimeout(() => {
          setMessage(null);
          navigate('/salespeople', { state: { message: 'Profile edited' } });
        }, 2000);
      } catch (error) {
        console.error("Failed to update salesperson:", error);
      }
    } else {
      console.error("Cannot update salesperson: salesperson id is undefined.");
    }
  };

  const handleCancel = () => {
    navigate('/salespeople');
  };

  if (!salesperson) {
    return <div>No salesperson found with the specified ID.</div>;
  }

  return (
    <div className="salesperson-detail">
      {message && <div className="alert alert-success">{message}</div>}
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <label>
            First Name:
            <input type="text" name="first_name" value={editedSalesperson.first_name} onChange={handleEditChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" value={editedSalesperson.last_name} onChange={handleEditChange} />
          </label>
          <label>
            Employee ID:
            <input type="text" name="employee_id" value={editedSalesperson.employee_id} onChange={handleEditChange} disabled />
          </label>
          <label>
            Custom ID:
            <input type="text" name="custom_id" value={editedSalesperson.custom_id} onChange={handleEditChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <>
          <h5>{salesperson.first_name} {salesperson.last_name}</h5>
          <p>Employee ID: {salesperson.employee_id}</p>
          <p>Custom ID: {salesperson.custom_id || 'None'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default SalespersonDetail;
