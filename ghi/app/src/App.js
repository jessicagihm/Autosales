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
import SalespeopleList from './Sales/SalespersonList';
import SalespersonForm from './Sales/SalespersonForm';
import SalespersonDetail from './Sales/SalespersonDetail';
import CustomersList from './Sales/CustomersList';
import CustomerForm from './Sales/CustomerForm';
import CustomerDetail from './Sales/CustomerDetail';


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
          <Route path="/salespeople/*" element={<SalespeopleList />}>
            <Route path="new" element={<SalespersonForm />} />
            <Route path=":id" element={<SalespersonDetail />} />

          </Route>
          <Route path="/customers/*" element={<CustomersList />}>
          <Route path="new" element={<CustomerForm />} />
          <Route path=":id" element={<CustomerDetail />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
