import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ManufacturerList () {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="my-2 container">
        <div>
          <Link to={'/manufacturers/create'}>
            <button className="btn bg-2" id="Button">Add a manufacturer</button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manufacturer) => {
              return (
                <tr key={manufacturer.id}>
                  <td>{manufacturer.name}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManufacturerList;
