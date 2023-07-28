import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SalesList() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8090/api/sales/')
      .then(response => response.json())
      .then(data => setSales(data.sales));

    fetch('http://localhost:8090/api/salespeople/')
      .then(response => response.json())
      .then(data => setSalespeople(data.salespeople));

    fetch('http://localhost:8090/api/customers/')
      .then(response => response.json())
      .then(data => setCustomers(data.customers));

    fetch('http://localhost:8100/api/automobiles/')
      .then(response => response.json())
      .then(data => setAutomobiles(data.autos));
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div>
          <h1>Sales</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Automobile</th>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => {
                const automobile = automobiles.find(auto => auto.id === sale.automobile);
                const salesperson = salespeople.find(sp => sp.id === sale.salesperson);
                const customer = customers.find(cust => cust.id === sale.customer);

                return (
                  <tr key={sale.id}>
                    <td>{automobile ? automobile.vin : ''}</td>
                    <td>{salesperson ? `${salesperson.first_name} ${salesperson.last_name}` : ''}</td>
                    <td>{customer ? `${customer.first_name} ${customer.last_name}` : ''}</td>
                    <td>{sale.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
          <Link to="/sales/create" className="btn btn-primary">Add a Sale</Link>
        </div>
      </div>
    </div>
  );
}

export default SalesList;
