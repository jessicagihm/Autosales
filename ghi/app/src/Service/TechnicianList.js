import React, { useState, useEffect } from 'react';


function TechnicianList() {
    const [technicians, setTechnician] = useState([]);

}

async function fetchData() {
    const url = 'http://localhost:8080/api/technicians/'
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technicians);
    }
}
    useEffect(() => {
      fetchData();

  }, []);


  return(
    <div>
      <h1>Technicians</h1>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>

            </tr>
        </thead>
        <tbody>
            {technicians.map(technician => {
                return (
                    <tr key={technician.id}>
                        <td>{ technician.employee_id }</td>
                        <td>{ technician.first_name}</td>
                        <td>{ technician.last_name}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
);
}

export default TechnicianList;
