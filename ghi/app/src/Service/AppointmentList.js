import React,{useEffect, useState} from "react";


function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        const data = await response.json();
        setAppointments(data.appointments)
    }

    const finishAppointment = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
            method: 'PUT',
        });
    }

    const cancelAppointment = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: 'PUT',
        });
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            <h1>Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date/Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{String(appointment.vip)}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date_time}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td><button type="button"
                                    className='btn btn-success options-outlined'
                                    onClick={() => finishAppointment(appointment.id)}>Finish</button></td>
                                <td><button type="button"
                                    className='btn btn-danger options-outlined'
                                    onClick={() => cancelAppointment(appointment.id)}>Cancel</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;
