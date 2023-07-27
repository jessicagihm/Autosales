import React, { useState, useEffect } from 'react';

function SalesList() {
  const [sales, setSales] = useState([]);

  const fetchSales = () => {
    fetch("http://localhost:8090/api/sales/")
      .then(response => response.json())
      .then(async data => {

        const salesWithDetails = await Promise.all(data.sales.map(async sale => {

          const automobileResponse = await fetch(`http://localhost:8100/api/automobiles/${sale.automobile}`);
          const automobile = await automobileResponse.json();

          const salespersonResponse = await fetch(`http://localhost:8090/api/salespeople/${sale.salesperson}`);
          const salesperson = await salespersonResponse.json();

          const customerResponse = await fetch(`http://localhost:8090/api/customers/${sale.customer}`);
          const customer = await customerResponse.json();


          return {
            ...sale,
            automobile,
            salesperson,
            customer
          };
        }));

        setSales(salesWithDetails);
      });
  };

  useEffect(fetchSales, []);

  if (!sales) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={fetchSales}>Refetch data</button>
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
          {sales && sales.map(sale => {
            return (
              <tr key={sale.sale_id}>
                <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name} (${sale.salesperson.employee_id})`}</td>
                <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
