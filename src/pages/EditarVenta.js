import React, { useState } from 'react';
import axios from 'axios';

const EditarVenta = ({ venta, closeModal, updateVentas }) => {
  const [usuario, setUsuario] = useState(venta.usuario);
  const [producto, setProducto] = useState(venta.producto);
  const [precio, setPrecio] = useState(venta.precio);
  const [cantidad, setCantidad] = useState(venta.cantidad);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/cart-purchases/${venta.id}`, {
        usuario,
        producto,
        precio,
        cantidad
      });
      // Actualizar la venta directamente sin depender de la respuesta
      updateVentas(prevVentas => {
        return prevVentas.map(prevVenta => {
          if (prevVenta.id === venta.id) {
            return { ...prevVenta, usuario, producto, precio, cantidad };
          } else {
            return prevVenta;
          }
        });
      });
      closeModal(); // Cierra el modal después de editar la venta con éxito
    } catch (error) {
      console.error('Error updating venta:', error);
      // No necesitamos mostrar ningún mensaje de error al usuario
      // Simplemente manejamos el error sin mostrar nada al usuario
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <center><h2>Editar Venta</h2>
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
          <button type="submit">Guardar cambios</button><br />
          <button type="button" onClick={closeModal}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default EditarVenta;
