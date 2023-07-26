import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturesForm from './Inventory/ManufacturersForm';
import ManufacturesList from './Inventory/ManufacturersList';
import TechicianForm from './Service/TechnicianForm';
import TechicianList from './Service/TechnicianList';
import AppointmentList from './Service/AppointmentList';
import AppointmentForm from './Service/AppointmentForm';
import AppointmentHistory from './Service/AppointmentHistory';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturesList />} />
            <Route path="create" element={<ManufacturesForm />} />
          </Route>
          <Route path="technician">
            <Route path="" element={<TechicianList />} />
            <Route path="create" element={<TechicianForm/>} />
          </Route>
          <Route path="appointment">
            <Route path="" element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm/>} />
            <Route path="history" element={<AppointmentHistory/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
