import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Sales from './pages/Sales';
import Customers from './pages/Customers';
import Books from './pages/Books';
import Settings from './pages/Settings';

// Páginas de ejemplo, puedes expandirlas
// Customers.js ya existe, pero lo dejo aquí para referencia si se moviera
// const Customers = () => (
//   <div className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50">
//     <h2 className="text-4xl font-bold text-gray-800">Gestión de Clientes</h2>
//     <p className="text-gray-600 mt-2">Aquí podrás ver y gestionar a tus clientes. ¡Qué emoción!</p>
//   </div>
// );
// Books.js ya existe, pero lo dejo aquí para referencia si se moviera
// const Books = () => (
//   <div className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50">
//     <h2 className="text-4xl font-bold text-gray-800">Libros Escolares</h2>
//     <p className="text-gray-600 mt-2">La sección especial para esos pequeños genios y sus libros. ¡A facturar!</p>
//   </div>
// );
// Settings.js ya existe, pero lo dejo aquí para referencia si se moviera
// const Settings = () => (
//   <div className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50">
//     <h2 className="text-4xl font-bold text-gray-800">Configuración</h2>
//     <p className="text-gray-600 mt-2">Donde la magia ocurre... o al menos, donde ajustas las cosas.</p>
//   </div>
// );

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/books" element={<Books />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;