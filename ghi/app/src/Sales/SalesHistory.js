import { useEffect, useState } from "react";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);

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

  const salespersonSales = sales.filter(sale => sale.salesperson === selectedSalesperson);
  const selectedSalespersonData = salespeople.find(s => s.id === selectedSalesperson);

  return (
    <div>
      <h1>Sales History</h1>

      <select value={selectedSalesperson || ''} onChange={e => setSelectedSalesperson(Number(e.target.value))}>
        <option value="">Select a salesperson</option>
        {salespeople.map(salesperson => (
          <option key={salesperson.id} value={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name}
          </option>
        ))}
      </select>

      {selectedSalespersonData && (
        <div>
          <h2>Sales for {selectedSalespersonData.first_name} {selectedSalespersonData.last_name}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {salespersonSales.map(sale => {
                const auto = automobiles.find(a => a.id === sale.automobile);
                const salesperson = salespeople.find(s => s.id === sale.salesperson);
                const customer = customers.find(c => c.id === sale.customer);
                return (
                  <tr key={sale.id}>
                    <td>{auto ? auto.vin : ''}</td>
                    <td>{salesperson ? `${salesperson.first_name} ${salesperson.last_name}` : ''}</td>
                    <td>{customer ? `${customer.first_name} ${customer.last_name}` : ''}</td>
                    <td>{sale.price}</td>
                    <td>{sale.sale_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;
