import React from 'react';
import { DashboardApp } from './DashboardApp/DashboardApp';
import { Login } from './Login/Login';
import { BrowserRouter, Routes, Route, Navigate, Link, Outlet } from "react-router-dom";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashvigor" />} />
                    <Route path="/*" element={<Navigate to="/dashvigor" />} />
                    <Route path="/dashvigor" element={loggedIn ? <Navigate to="/dashvigor/a" /> : <Navigate to="/dashvigor/login" />} />
                    <Route path="/dashvigor/login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path="/dashvigor/*" element={loggedIn ? <DashboardApp /> : <Navigate to="/dashvigor/login" />}  />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
