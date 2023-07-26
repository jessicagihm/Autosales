import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">

      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
                <NavLink className="nav-link" to="/">HOME</NavLink>
            </li>

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventory
                  </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/automobiles">
                      Automobile List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/automobiles/create">
                      Create an Automobile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/manufacturers">
                      Manufacturer List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/manufacturers/create">
                      Create a Manufacturer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/models">
                      Models List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/models/create">
                      Create a Model
                    </NavLink>
                  </li>
                </ul>
              </li>


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Service
                  </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <li>
                    <NavLink className="dropdown-item" to="/technician/create">
                      Add a Technician
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/technician">
                      Technician List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/appointment">
                      Service Appointments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/appointment/create">
                      Create a Service Appointment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/appointment/history">
                      Service History
                    </NavLink>
                  </li>
                </ul>
              </li>


              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales
                  </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/salespeople">
                      Salespeople List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/salespeople/create">
                      Add a Salesperson
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/customers">
                      Customer List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/customers/create">
                      Add a Customer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/sales">
                      List of Sales
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/sales/create">
                      Create New Sale
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/sales/history">
                      Sales History
                    </NavLink>
                  </li>
                </ul>
              </li>


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
