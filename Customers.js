import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, PlusCircle } from 'lucide-react';

const mockCustomers = [
  { id: 'C001', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '123-456-7890' },
  { id: 'C002', name: 'María García', email: 'maria.garcia@example.com', phone: '098-765-4321' },
  { id: 'C003', name: 'Empresa XYZ S.L.', email: 'info@xyz.com', phone: '555-123-4567' },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Gestión de Clientes</h2>
      
      <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" /> Listado de Clientes
        </h3>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cliente por nombre, email o teléfono..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <motion.button 
            className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Cliente
          </motion.button>
        </div>

        <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-4 min-h-[200px] max-h-[500px] overflow-y-auto">
          {filteredCustomers.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No se encontraron clientes.</p>
          ) : (
            <ul className="space-y-3">
              {filteredCustomers.map(customer => (
                <motion.li
                  key={customer.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-800">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.email} | {customer.phone}</p>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md font-semibold text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Detalles
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Customers;