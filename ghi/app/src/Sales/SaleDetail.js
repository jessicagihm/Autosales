import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SaleDetail({ getSales, setDeleted, setDeleteMessage, setEdited }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [editedSale, setEditedSale] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  async function updateSale(sale) {
    const response = await fetch(`http://localhost:8090/api/sales/${sale.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale),
    });

    if (!response.ok) {
      throw new Error(`Failed to update sale with id ${sale.id}`);
    }

    const updatedSale = await response.json();
    return updatedSale;
  }

  async function deleteSale(id, navigate) {
    const response = await fetch(`http://localhost:8090/api/sales/${id}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete sale with id ${id}`);
    }

    navigate('/sales', { state: { message: 'Sale deleted' } });
  }

  const handleDelete = async () => {
    try {
      await deleteSale(sale.id, navigate);
      setMessage('Sale deleted');
      setDeleteMessage('Sale deleted');
      setTimeout(() => {
        setMessage(null);
        getSales();
        navigate('/sales');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSale = async () => {
      const response = await fetch(`http://localhost:8090/api/sales/${id}/`);
      const data = await response.json();
      if (response.ok) {
        setSale(data);
        setEditedSale({
          ...data,
          automobile: data.automobile || "",
          salesperson: data.salesperson || "",
          customer: data.customer || "",
          price: data.price || "",
        });
      } else {
        console.error('Failed to fetch sale');
      }
    };

    fetchSale();
  }, [id]);

  const handleEditChange = (event) => {
    setEditedSale({
      ...editedSale,
      [event.target.name]: event.target.value
    });
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (sale.id) {
      try {
        await updateSale(editedSale);
        setIsEditing(false);
        setMessage('Sale edited');
        setEdited(true);
        setTimeout(() => {
          setMessage(null);
          navigate('/sales', { state: { message: 'Sale edited' } });
        }, 2000);
      } catch (error) {
        console.error("Failed to update sale:", error);
      }
    } else {
      console.error("Cannot update sale: sale id is undefined.");
    }
  };

  const handleCancel = () => {
    navigate('/sales');
  };

  if (!sale) {
    return <div>No sale found with the specified ID.</div>;
  }

  return (
    <div className="card sale-detail">
      {message && <div className="alert alert-success">{message}</div>}
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <label>
            Automobile:
            <input type="text" name="automobile" value={editedSale.automobile} onChange={handleEditChange} />
          </label>
          <label>
            Salesperson:
            <input type="text" name="salesperson" value={editedSale.salesperson} onChange={handleEditChange} />
          </label>
          <label>
            Customer:
            <input type="text" name="customer" value={editedSale.customer} onChange={handleEditChange} />
          </label>
          <label>
            Price:
            <input type="number" step="0.01" name="price" value={editedSale.price} onChange={handleEditChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div className="card-body">
          <h5 className="card-title">Automobile: {sale.automobile}</h5>
          <p className="card-text">Salesperson: {sale.salesperson}</p>
          <p className="card-text">Customer: {sale.customer}</p>
          <p className="card-text">Price: {sale.price}</p>
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default SaleDetail;
