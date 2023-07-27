import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import SalesForm from './SalesForm';
import SaleDetail from './SaleDetail'; // You will need to implement this component

function SalesList() {
    const [sales, setSales] = useState([]);
    const [createMessage, setCreateMessage] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [message, setMessage] = useState(null);
    const [edited, setEdited] = useState(false);
    const navigate = useNavigate();

    const getSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        const data = await response.json();
        if (response.ok) {
            if (Array.isArray(data.sales)) {
                setSales(data.sales);
            } else {
                console.error('Data fetched from server is not an array:', data);
            }
        } else {
            console.error('Failed to fetch sales');
        }
    }


    const fetchSales = async () => {
        setDeleted(false);
    };

    useEffect(() => {
        fetchSales();
    }, [deleted]);

    useEffect(() => {
        if (edited) {
            getSales();
            setEdited(false);
        }
    }, [edited]);

    useEffect(() => {
        getSales();
    }, []);

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [message]);

    useEffect(() => {
        if (createMessage) {
            setTimeout(() => {
                setCreateMessage(null);
            }, 3000);
        }
    }, [createMessage]);

    useEffect(() => {
        if (deleteMessage) {
            const timer = setTimeout(() => {
                setDeleteMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [deleteMessage, setDeleteMessage]);

    return (
        <div className="container">
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2>Sales</h2>
                        {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
                        {createMessage && <div className="alert alert-success">{createMessage}</div>}
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                            <button onClick={() => navigate("new")} className="btn btn-primary btn-lg px-4 gap-3">
                                Record a Sale
                            </button>
                        </div>
                        {sales && sales.map(sale => {
                            if (!sale) return null;
                            return (
                                <div key={sale.id} className="col-4 mb-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Sale ID: {sale.sale_id}</h5>
                                            <p className="card-text">Automobile: {sale.automobile}</p>
                                            <p className="card-text">Salesperson: {sale.salesperson}</p>
                                            <p className="card-text">Customer: {sale.customer}</p>
                                            <p className="card-text">Price: {sale.price}</p>
                                            <div className="card-footer">
                                                <Link to={`/sales/${sale.id}`}>View/Edit/Delete</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }/>
                <Route path="new" element={<SalesForm setCreateMessage={setCreateMessage} getSales={getSales} />} />
                <Route path=":id" element={<SaleDetail getSales={getSales} setDeleted={setDeleted} setEdited={setEdited} setDeleteMessage={setDeleteMessage} />} />
            </Routes>
        </div>
    );
}

export default SalesList;
