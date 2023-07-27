import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



function SalespersonDetail({ getSalespeople, setDeleted, setDeleteMessage, setEdited }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesperson, setSalesperson] = useState(null);
  const [editedSalesperson, setEditedSalesperson] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

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

  async function deleteSalesperson(id, navigate) {
      const response = await fetch(`http://localhost:8090/api/salespeople/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete salesperson with id ${id}`);
      }

      navigate('/salespeople', { state: { message: 'Salesperson deleted' } });
    }


    const handleDelete = async () => {
        try {
          await deleteSalesperson(salesperson.id, navigate);  // pass navigate here
          setMessage('Salesperson deleted');
          setDeleteMessage('Salesperson deleted'); // set delete message here
          setTimeout(() => {
            setMessage(null);
            getSalespeople(); // Fetch salespeople data after deleting a salesperson
            navigate('/salespeople');
          }, 2000);
        } catch (error) {
          console.error(error);
        }
      };

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


  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (salesperson.id) {
      try {
        await updateSalesperson(editedSalesperson);
        setIsEditing(false);
        setMessage('Profile edited');
        setEdited(true); // add this
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
    <div className="card salesperson-detail">
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
        <div className="card-body">
          <h5 className="card-title">{salesperson.first_name} {salesperson.last_name}</h5>
          <p className="card-text">Employee ID: {salesperson.employee_id}</p>
          <p className="card-text">Custom ID: {salesperson.custom_id || 'None'}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default SalespersonDetail;
