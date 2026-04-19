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
      </Routes>
    </BrowserRouter>
  );
};

export default RootComponent;
