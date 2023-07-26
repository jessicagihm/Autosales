import { useEffect, useState } from "react";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchAppointments = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    } else {
      console.error(response);
    }
  }

  const searchAppointments = async () => {
    if(!searchText){
      await fetchAppointments()
      return
    }
    const filtered = appointments.filter(function(x) {
      const doesmatch = x.vin.indexOf(searchText) > -1;
      if (doesmatch){
        return true
      }
        return false
    })
    setAppointments(filtered)
  }

  const handleTextChange = (event) => {


    setSearchText(event.target.value)
  }



  useEffect(() => {
    fetchAppointments();
  }, []);



  return (
    <div>
      <input onChange={handleTextChange} value={searchText} type="search" placeholder="Search by VIN..." />
      <button onClick={searchAppointments}>Search</button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date/Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appt => {
            return (<tr key={appt.id}>
              <td>{appt.vin}</td>
              <td>{String(appt.vip)}</td>
              <td>{appt.customer}</td>
              <td>{appt.date_time}</td>
              <td>{appt.technician.first_name} {appt.technician.last_name}</td>
              <td>{appt.reason}</td>
              <td>{appt.status}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentHistory;


