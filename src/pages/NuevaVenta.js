import React, { useState } from 'react';
import axios from 'axios';

const NuevaVenta = ({ closeModal, updateVentas }) => {
  const [usuario, setUsuario] = useState('');
  const [producto, setProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/cart-purchases', {
        usuario,
        producto,
        precio,
        cantidad
      });
      // Actualiza el estado local de ventas con la nueva venta
      updateVentas(prevVentas => [...prevVentas, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error adding venta:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <center><h2>Nueva Venta</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} /><br/><br/>
          </label>
          <label>
            Producto:
            <input type="text" value={producto} onChange={e => setProducto(e.target.value)} /><br/><br/>
          </label>
          <label>
            Precio:
            <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} /><br/><br/>
          </label>
          <label>
            Cantidad:
            <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} /><br/><br/>
          </label>
          <button type="submit">Agregar Venta</button><br />
          <button type="button" onClick={closeModal}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default NuevaVenta;
