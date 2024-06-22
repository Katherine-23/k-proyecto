import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/Modal.css';

const EditarProducto = ({ producto, onEditProducto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productoEditado, setProductoEditado] = useState({
    nombre: producto.nombre,
    categoria: producto.categoria,
    precio: producto.precio
  });

  const handleEditarProducto = async () => {
    try {
      await axios.put(`http://localhost:8000/api/productos/${producto.id}`, productoEditado);
      onEditProducto(productoEditado);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Editar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <center><h2>Editar Producto</h2>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={productoEditado.nombre} 
          onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })} 
        /><br/><br/>
        <label>Categoría:</label>
        <input 
          type="text" 
          value={productoEditado.categoria} 
          onChange={(e) => setProductoEditado({ ...productoEditado, categoria: e.target.value })} 
        /><br/><br/>
        <label>Precio:</label>
        <input 
          type="number" 
          value={productoEditado.precio} 
          onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })} 
        /><br/><br/>
        <button onClick={handleEditarProducto}>Guardar Cambios</button><br />
        <button onClick={() => setModalIsOpen(false)}>Cancelar</button></center>
      </Modal>
    </div>
  );
};

export default EditarProducto;
