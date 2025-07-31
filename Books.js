import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, PlusCircle, Truck, CheckCircle, Calendar, User } from 'lucide-react';

const mockSchoolBooks = [
  { id: 'LB001', name: 'Matemáticas 1º ESO', stock: 5, price: 25.00, reserved: 2, delivered: 1 },
  { id: 'LB002', name: 'Lengua Castellana 2º Bach', stock: 3, price: 28.50, reserved: 1, delivered: 0 },
  { id: 'LB003', name: 'Historia 4º ESO', stock: 8, price: 22.00, reserved: 0, delivered: 0 },
  { id: 'LB004', name: 'Inglés 1º Primaria', stock: 10, price: 18.00, reserved: 3, delivered: 2 },
];

const mockReservations = [
  { id: 'RES001', bookId: 'LB001', studentName: 'Ana García', date: '2024-08-15', status: 'reserved' },
  { id: 'RES002', bookId: 'LB004', studentName: 'Carlos Ruiz', date: '2024-08-20', status: 'delivered' },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewReservationModal, setShowNewReservationModal] = useState(false);
  const [newReservation, setNewReservation] = useState({ bookId: '', studentName: '', date: '' });

  const filteredBooks = mockSchoolBooks.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewReservation = () => {
    if (!newReservation.bookId || !newReservation.studentName || !newReservation.date) {
      alert('Por favor, completa todos los campos para la reserva.');
      return;
    }
    // Aquí iría la lógica para enviar la reserva a Sage
    console.log('Nueva reserva:', newReservation);
    alert(`Reserva para ${newReservation.studentName} del libro ${newReservation.bookId} creada.`);
    setShowNewReservationModal(false);
    setNewReservation({ bookId: '', studentName: '', date: '' });
    // Actualizar mockReservations o recargar desde Sage
  };

  const handleDeliverBook = (reservationId) => {
    // Lógica para marcar como entregado en Sage y generar ticket específico
    console.log('Entregando reserva:', reservationId);
    alert(`Libro de la reserva ${reservationId} entregado y ticket generado.`);
    // Actualizar estado de la reserva en mockReservations
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Gestión de Libros Escolares</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Búsqueda y listado de libros */}
        <motion.div 
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> Catálogo de Libros
          </h3>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar libro por nombre o código..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button 
              onClick={() => setShowNewReservationModal(true)}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle className="w-5 h-5" />
              Nueva Reserva
            </motion.button>
          </div>

          <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {filteredBooks.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No se encontraron libros escolares.</p>
            ) : (
              <ul className="space-y-3">
                {filteredBooks.map(book => (
                  <motion.li
                    key={book.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{book.name} <span className="text-sm text-gray-500">({book.id})</span></p>
                      <p className="text-sm text-gray-600">
                        Stock: {book.stock} | Reservados: {book.reserved} | Entregados: {book.delivered}
                      </p>
                    </div>
                    <span className="font-semibold text-blue-600">€{book.price.toFixed(2)}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>

        {/* Reservas y Entregas */}
        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-600" /> Reservas Pendientes
          </h3>
          <ul className="space-y-3">
            {mockReservations.filter(res => res.status === 'reserved').length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay reservas pendientes.</p>
            ) : (
              mockReservations.filter(res => res.status === 'reserved').map(res => {
                const book = mockSchoolBooks.find(b => b.id === res.bookId);
                return (
                  <motion.li
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{book ? book.name : 'Libro Desconocido'}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1"><User className="w-4 h-4" /> {res.studentName}</p>
                      <p className="text-xs text-gray-500">Reserva: {res.date}</p>
                    </div>
                    <motion.button
                      onClick={() => handleDeliverBook(res.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-md font-semibold text-sm shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Truck className="w-4 h-4" /> Entregar
                    </motion.button>
                  </motion.li>
                );
              })
            )}
          </ul>
        </motion.div>
      </div>

      {/* Modal Nueva Reserva */}
      <AnimatePresence>
        {showNewReservationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full border border-gray-200/50"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crear Nueva Reserva</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="bookSelect" className="block text-gray-700 font-medium mb-2">Libro:</label>
                  <select
                    id="bookSelect"
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={newReservation.bookId}
                    onChange={(e) => setNewReservation({ ...newReservation, bookId: e.target.value })}
                  >
                    <option value="">Selecciona un libro</option>
                    {mockSchoolBooks.map(book => (
                      <option key={book.id} value={book.id}>{book.name} (Stock: {book.stock})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="studentName" className="block text-gray-700 font-medium mb-2">Nombre del Alumno:</label>
                  <input
                    type="text"
                    id="studentName"
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="Ej: Juan Pérez"
                    value={newReservation.studentName}
                    onChange={(e) => setNewReservation({ ...newReservation, studentName: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="reservationDate" className="block text-gray-700 font-medium mb-2">Fecha de Reserva:</label>
                  <input
                    type="date"
                    id="reservationDate"
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    value={newReservation.date}
                    onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <motion.button
                  onClick={() => setShowNewReservationModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleNewReservation}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="w-5 h-5 mr-2" /> Crear Reserva
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Books;