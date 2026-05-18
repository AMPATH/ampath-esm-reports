import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportsDashboard from './dashboard/reports-dasboard';
import Moh710Report from './reports/moh-710/moh-710.component';
import Moh711Report from './reports/moh-711/moh-711.component';
import Moh717Report from './reports/moh-717/moh-717.component';
import MoH706Report from './reports/moh-706/moh-706.component';
import Moh240Report from './reports/moh-240/moh-240.component';
import Moh505Report from './reports/moh-505/moh-505.component';
import Moh705BComponent from './reports/moh-705B/moh-705b.component';
import Moh705AComponent from './reports/moh-705a/moh-705a.component';
import Moh745Component from './reports/moh-745/moh-745.component';
import Moh740Report from './reports/moh-740/moh-740.component';
import Moh204ARegisterComponent from './reports/moh-705a/registers/moh-204a-register.component';
import Moh204BRegisterComponent from './reports/moh-705B/moh-204b-register.component';
import Moh412Register from './reports/moh-745/registers/moh-412-register.component';
import Moh405Register from './reports/moh-711/registers/moh-405-register.component';
import Moh406Register from './reports/moh-711/registers/moh-406-register.component';
import Moh333Register from './reports/moh-711/registers/moh-333-register.component';
import Moh511Register from './reports/moh-711/registers/moh-511-register.component';
import Moh510Register from './reports/moh-711/registers/moh-510-register.component';
import Moh511710Register from './reports/moh-710/registers/moh-511-710-register.component';
import Moh731Report from './reports/moh-731/moh-731.component';
import Moh366Register from './reports/moh-731/registers/moh-366.component';
import PrepRegisterComponent from './reports/moh-731/registers/prep-register.component';

const RootComponent: React.FC = () => {
  const baseName = window.getOpenmrsSpaBase() + 'home/reports';

  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path="/" element={<ReportsDashboard />} />
        <Route path="/moh-710" element={<Moh710Report />} />
        <Route path="/moh-711" element={<Moh711Report />} />
        <Route path="/moh-717" element={<Moh717Report />} />
        <Route path="/moh-706" element={<MoH706Report />} />
        <Route path="/moh-240" element={<Moh240Report />} />
        <Route path="/moh-505" element={<Moh505Report />} />
        <Route path="/moh-705a" element={<Moh705AComponent />} />
        <Route path="/moh-705b" element={<Moh705BComponent />} />
        <Route path="/moh-745" element={<Moh745Component />} />
        <Route path="/moh-740" element={<Moh740Report />} />
        <Route path="/moh-412-register" element={<Moh412Register />} />
        <Route path="/moh-204b" element={<Moh204BRegisterComponent />} />
        <Route path="/moh-204a" element={<Moh204ARegisterComponent />} />
        <Route path="/moh-405-register" element={<Moh405Register />} />
        <Route path="/moh-406-register" element={<Moh406Register />} />
        <Route path="/moh-333-register" element={<Moh333Register />} />
        <Route path="/moh-511-register" element={<Moh511Register />} />
        <Route path="/moh-510-register" element={<Moh510Register />} />
        <Route path="/moh-412-register" element={<Moh412Register />} />
        <Route path="/moh-511-710-register" element={<Moh511710Register />} />
        <Route path="/moh-731" element={<Moh731Report />} />
        <Route path="/moh-366-register" element={<Moh366Register />} />
        <Route path="/prep-register" element={<PrepRegisterComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootComponent;
