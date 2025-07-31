import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, PlusCircle, Search, Tag, CreditCard, Wallet, Printer, FileText, BookOpen, CheckCircle, X, Building } from 'lucide-react';

const mockProducts = [
  { id: 'P001', name: 'Camiseta Algodón', price: 19.99, stock: 50, family: 'Ropa' },
  { id: 'P002', name: 'Pantalón Vaquero', price: 39.99, stock: 30, family: 'Ropa' },
  { id: 'L001', name: 'Libro Matemáticas 1º ESO', price: 25.00, stock: 15, family: 'Libros Escolares' },
  { id: 'L002', name: 'Libro Lengua 2º Bach', price: 28.50, stock: 10, family: 'Libros Escolares' },
  { id: 'A001', name: 'Auriculares Bluetooth', price: 49.99, stock: 20, family: 'Electrónica' },
];

const mockCustomers = [
  { id: 'C001', name: 'Juan Pérez', type: 'individual' },
  { id: 'C002', name: 'María García', type: 'individual' },
  { id: 'E001', name: 'Tech Solutions S.L.', type: 'company' },
  { id: 'E002', name: 'Global Corp Ltda.', type: 'company' },
];

const Sales = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);
  const [isCompanySale, setIsCompanySale] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(''); // Nuevo estado para la empresa
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setSearchTerm(''); // Clear search after adding
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal * (1 - discount / 100);

  const handleProcessSale = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío. ¡Añade algo para vender!');
      return;
    }
    if (isCompanySale && !selectedCompany) {
      alert('Por favor, selecciona la empresa para el albarán.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    // Aquí iría la lógica de integración con Sage para registrar la venta/albarán
    // Por ahora, solo simulamos el proceso
    console.log('Procesando venta/albarán:', { cart, total, paymentMethod, discount, isCompanySale, selectedCompany });
    alert(`Venta ${isCompanySale ? 'como albarán para ' + selectedCompany : 'directa'} procesada con éxito! Total: €${total.toFixed(2)}`);
    setCart([]);
    setDiscount(0);
    setIsCompanySale(false);
    setSelectedCompany(''); // Limpiar la empresa seleccionada
    setPaymentMethod('cash');
    setShowPaymentModal(false);
  };

  const companyCustomers = mockCustomers.filter(c => c.type === 'company');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Gestión de Ventas</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Nueva Venta / Albarán</h3>
          
          {/* Búsqueda de artículos */}
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto por código, nombre o familia..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {searchTerm && filteredProducts.length > 0 && (
            <motion.div 
              className="bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleAddToCart(product)}
                >
                  <div>
                    <p className="font-medium text-gray-800">{product.name} <span className="text-sm text-gray-500">({product.id})</span></p>
                    <p className="text-sm text-gray-600">Stock: {product.stock} | Familia: {product.family}</p>
                  </div>
                  <span className="font-semibold text-blue-600">€{product.price.toFixed(2)}</span>
                </div>
              ))}
            </motion.div>
          )}
          {searchTerm && filteredProducts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No se encontraron productos.</p>
          )}

          {/* Carrito de compras */}
          <div className="bg-gray-50/80 border border-gray-200 rounded-xl p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">El carrito está vacío. ¡Añade algo para vender!</p>
            ) : (
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">€{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 text-center border border-gray-300 rounded-md py-1"
                      />
                      <motion.button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Descuento y Tipo de Venta */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-600" />
              <label htmlFor="discount" className="text-gray-700 font-medium">Descuento (%):</label>
              <input
                type="number"
                id="discount"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isCompanySale}
                onChange={() => setIsCompanySale(!isCompanySale)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-gray-700 font-medium">Venta para Empresa (Albarán)</span>
            </label>
          </div>

          {/* Selector de Empresa para Albarán */}
          <AnimatePresence>
            {isCompanySale && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <Building className="w-5 h-5 text-blue-600" />
                  <label htmlFor="companySelect" className="text-blue-800 font-medium whitespace-nowrap">Empresa:</label>
                  <select
                    id="companySelect"
                    className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">Selecciona una empresa</option>
                    {companyCustomers.map(company => (
                      <option key={company.id} value={company.name}>{company.name}</option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Totales y Botón de Procesar */}
          <div className="mt-6 flex justify-between items-center text-2xl font-bold text-gray-800 border-t pt-4 border-gray-200">
            <span>Subtotal:</span>
            <span>€{subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex justify-between items-center text-3xl font-bold text-gray-900">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
          <motion.button 
            onClick={handleProcessSale}
            disabled={cart.length === 0 || (isCompanySale && !selectedCompany)}
            className={`mt-6 w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
              cart.length === 0 || (isCompanySale && !selectedCompany)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.01]'
            }`}
            whileHover={cart.length > 0 && (!isCompanySale || selectedCompany) ? { scale: 1.01 } : {}}
            whileTap={cart.length > 0 && (!isCompanySale || selectedCompany) ? { scale: 0.99 } : {}}
          >
            {isCompanySale ? 'Generar Albarán' : 'Procesar Venta'}
          </motion.button>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Historial de Ventas</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center text-gray-700 border-b border-gray-100 pb-2">
              <span>Venta #12344 (20/01/2024)</span>
              <span className="font-semibold">€75.50</span>
            </li>
            <li className="flex justify-between items-center text-gray-700 border-b border-gray-100 pb-2">
              <span>Albarán #A001 (19/01/2024)</span>
              <span className="font-semibold">€120.00</span>
            </li>
            <li className="flex justify-between items-center text-gray-700 border-b border-gray-100 pb-2">
              <span>Venta #12342 (19/01/2024)</span>
              <span className="font-semibold">€30.25</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Modal de Pago */}
      <AnimatePresence>
        {showPaymentModal && (
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
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                {isCompanySale ? `Confirmar Albarán para ${selectedCompany}` : 'Seleccionar Método de Pago'}
              </h3>

              {!isCompanySale && (
                <div className="mb-6">
                  <p className="text-gray-700 font-medium mb-3">Total a Pagar: <span className="text-blue-600 text-2xl font-bold">€{total.toFixed(2)}</span></p>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600 hover:border-blue-300'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Wallet className="w-8 h-8 mb-2" />
                      <span className="font-semibold">Efectivo</span>
                    </motion.button>
                    <motion.button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600 hover:border-blue-300'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <CreditCard className="w-8 h-8 mb-2" />
                      <span className="font-semibold">Tarjeta</span>
                    </motion.button>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4">
                <motion.button
                  onClick={() => setShowPaymentModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleConfirmPayment}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompanySale ? 'Confirmar Albarán' : 'Confirmar Pago'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sales;