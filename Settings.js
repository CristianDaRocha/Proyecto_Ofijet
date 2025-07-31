import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Database, FileText, DollarSign, Printer } from 'lucide-react';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Configuración del Sistema</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sección de Integración con Sage */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" /> Integración Sage 200
          </h3>
          <p className="text-gray-600 mb-4">Gestiona la conexión y sincronización con tu sistema Sage 200.</p>
          <motion.button 
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Configurar Conexión
          </motion.button>
          <motion.button 
            className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Sincronizar Datos Ahora
          </motion.button>
        </motion.div>

        {/* Sección de Cierre de Caja */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-600" /> Cierre de Caja Diario
          </h3>
          <p className="text-gray-600 mb-4">Realiza el cierre de caja, revisa el resumen y exporta informes.</p>
          <motion.button 
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Realizar Cierre de Caja
          </motion.button>
          <motion.button 
            className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className="inline-block w-5 h-5 mr-2" /> Ver Historial de Cierres
          </motion.button>
        </motion.div>

        {/* Sección de Impresión */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Printer className="w-6 h-6 text-orange-600" /> Configuración de Impresión
          </h3>
          <p className="text-gray-600 mb-4">Ajusta las opciones para la impresión de tickets y albaranes.</p>
          <motion.button 
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Gestionar Impresoras
          </motion.button>
          <motion.button 
            className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className="inline-block w-5 h-5 mr-2" /> Diseñar Plantillas
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;