import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Package, BookOpen } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Ventas Hoy', value: '€1,234.56', icon: TrendingUp, color: 'from-green-400 to-emerald-500' },
    { label: 'Clientes Activos', value: '128', icon: Users, color: 'from-blue-400 to-indigo-500' },
    { label: 'Productos en Stock', value: '5,432', icon: Package, color: 'from-orange-400 to-amber-500' },
    { label: 'Libros Escolares', value: '789', icon: BookOpen, color: 'from-purple-400 to-pink-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Dashboard Principal</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={`bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 flex flex-col items-start`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ translateY: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
          >
            <div className={`p-3 rounded-full mb-4 bg-gradient-to-br ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-gray-700">
            <span>Venta #12345 - Cliente: Juan Pérez</span>
            <span className="font-semibold">€55.00</span>
          </li>
          <li className="flex items-center justify-between text-gray-700">
            <span>Artículo añadido: "Libro de Matemáticas"</span>
            <span className="text-sm text-gray-500">Hace 10 min</span>
          </li>
          <li className="flex items-center justify-between text-gray-700">
            <span>Nuevo cliente registrado: María García</span>
            <span className="text-sm text-gray-500">Hace 30 min</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Home;