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
import SalesList from './Sales/SalesList';
import SalesForm from './Sales/SalesForm';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobileList';
import ModelsForm from './Inventory/ModelForm';
import ModelsList from './Inventory/ModelList';
import SalesHistory from './Sales/SalesHistory';

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
            <Route path="create" element={<SalespersonForm />} />
            <Route path=":id" element={<SalespersonDetail />} />
          </Route>
          <Route path="/customers/*" element={<CustomersList />}>
          <Route path="create" element={<CustomerForm />} />
          <Route path=":id" element={<CustomerDetail />} />
        </Route>
        <Route path="/sales/*">
          <Route index element={<SalesList />} />
          <Route path="create" element={<SalesForm />} />
        </Route>
        <Route path="/automobiles/*" element={<AutomobileList />} />
        <Route path="create" element={<AutomobileForm />} />
        <Route path="/models/*" element={<ModelsList />} />
        <Route path="create" element={<ModelsForm />} />
        <Route path="/sales/history" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
