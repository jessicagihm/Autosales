import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SalespersonHistory() {
  const [sales, setSales] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8090/api/salespeople/${id}`)
      .then(response => response.json())
      .then(salesperson => {
        fetch("http://localhost:8090/api/sales/")
          .then(response => response.json())
          .then(data => {
            const salesForSalesperson = data.sales.filter(sale => sale.salesperson.employee_id === salesperson.employee_id);
            setSales(salesForSalesperson);
          });
      });
  }, [id]);

  if (!sales) {
    return <div>Loading...</div>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Salesperson's Name and Employee ID</th>
          <th>Customer's Name</th>
          <th>Automobile VIN</th>
          <th>Price of the sale</th>
        </tr>
      </thead>
      <tbody>
        {sales.map(sale => (
          <tr key={sale.sale_id}>
            <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name} (${sale.salesperson.employee_id})`}</td>
            <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
            <td>{sale.automobile.vin}</td>
            <td>{sale.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SalespersonHistory;
