import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportsDashboard from './dashboard/reports-dasboard';
import Moh710Report from './reports/moh-710/moh-710.component';
import Moh711Report from './reports/moh-711/moh-711.component';
import Moh717Report from './reports/moh-717/moh-717.component';
import MoH706Report from './reports/moh-706/moh-706.component';

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
      </Routes>
    </BrowserRouter>
  );
};

export default RootComponent;
