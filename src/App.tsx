import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ItemDetails from './pages/ItemDetails';
import Reports from './pages/Reports';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <InventoryProvider>
      <Router>
        <Routes>
         <Route path="/" element={<Layout/>} >
           <Route index element={<Dashboard/>}/>
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </InventoryProvider>
  );
};

export default App;