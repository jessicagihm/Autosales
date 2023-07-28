import { useEffect, useState } from "react";

function SalesHistory() {
  const [sales, setSales] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchSales = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales);
    } else {
      console.error(response);
    }
  }

  const searchSales = async () => {
    if(!searchText){
      await fetchSales()
      return
    }
    const filtered = sales.filter(function(sale) {
      const doesmatch = sale.automobile.vin.indexOf(searchText) > -1;
      if (doesmatch){
        return true
      }
        return false
    })
    setSales(filtered)
  }

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div>
      <input onChange={handleTextChange} value={searchText} type="search" placeholder="Search by VIN..." />
      <button onClick={searchSales}>Search</button>

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
          {sales.map(sale => {
            return (<tr key={sale.id}>
              <td>{sale.automobile.vin}</td>
              <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
              <td>{sale.customer.first_name} {sale.customer.last_name}</td>
              <td>{sale.price}</td>
              <td>{sale.sale_date}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SalesHistory;
