import React,{useEffect, useState} from "react";


function AppointmenList() {
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url)

        if (response.ok) {
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
            fetchData()
        }, [])

        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date/Time</th>
                        <th>Technician</th>

                    </tr>
                </thead>
                <tbody>
                    {appointments}.map(appointment) => {
                        return (
                            <tr key={ appointment.id}>
                                <td>{ appointment.vin }</td>
                                <td>{ String(appointment.vip)}</td>
                                <td>{ appointment.date_time}</td>
                                <td>{ appointment.technician.first_name}</td>
                                <td>{ appointment.reason}</td>
                            <td>
                                <button onClick={() => finishAppointment ( appointment.id )}>Finish</button>
                            </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        );
    }
