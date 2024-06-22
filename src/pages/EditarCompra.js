import React, { useState } from 'react';
import axios from 'axios';

const EditarCompra = ({ compra, closeModal, updateCompras }) => {
  const [usuario, setUsuario] = useState(compra.usuario);
  const [producto, setProducto] = useState(compra.producto);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud PUT para actualizar la compra
      await axios.put(`http://localhost:8000/api/carts/${compra.id}`, {
        usuario,
        producto
      });
      
      // Actualizar la compra en el estado local
      updateCompras(prevCompras => {
        return prevCompras.map(prevCompra => {
          if (prevCompra.id === compra.id) {
            return { ...prevCompra, usuario, producto };
          } else {
            return prevCompra;
          }
        });
      });

      closeModal(); // Cierra el modal después de editar la compra con éxito
    } catch (error) {
      console.error('Error updating compra:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <center>
          <h2>Editar Compra</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Usuario:
              <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} /><br/><br/>
            </label>
            <label>
              Producto:
              <input type="text" value={producto} onChange={e => setProducto(e.target.value)} /><br/><br/>
            </label>
            <button type="submit">Guardar cambios</button><br />
            <button type="button" onClick={closeModal}>Cancelar</button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default EditarCompra;
