import React, { useState } from 'react';
import axios from 'axios';

const NuevaCompra = ({ closeModal, updateCompras }) => {
  const [usuario, setUsuario] = useState('');
  const [producto, setProducto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/carts', {
        usuario,
        producto
      });
      // Actualiza el estado local de compras con la nueva compra
      updateCompras(prevCompras => [...prevCompras, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error adding compra:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <center><h2>Nueva Compra</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:
            <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} /><br/><br/>
          </label>
          <label>
            Producto:
            <input type="text" value={producto} onChange={e => setProducto(e.target.value)} /><br/><br/>
          </label>
          <button type="submit">Agregar Compra</button><br />
          <button type="button" onClick={closeModal}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default NuevaCompra;
