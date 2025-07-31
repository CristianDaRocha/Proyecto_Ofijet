import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingCart, Users, BookOpen, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Inicio', icon: Home, path: '/' },
  { name: 'Ventas', icon: ShoppingCart, path: '/sales' },
  { name: 'Clientes', icon: Users, path: '/customers' },
  { name: 'Libros', icon: BookOpen, path: '/books' },
  { name: 'Configuración', icon: Settings, path: '/settings' },
];

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.nav
        className="w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 p-6 flex flex-col shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Ofijet
          </h1>
          <p className="text-gray-500 text-sm mt-1">Tu punto de venta soñado</p>
        </div>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-xl font-medium transition-all duration-200 
                  ${location.pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;