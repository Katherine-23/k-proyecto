import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/Modal.css';

const NuevoProducto = ({ onAddProducto }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    categoria: '',
    precio: 0,
  });

  const handleAgregarProducto = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/productos', nuevoProducto);
      onAddProducto(response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Agregar Producto</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <center><h2>Agregar Producto</h2>
        <input type="text" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} /><br/><br/>
        <input type="text" value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })} /><br/><br/>
        <input type="number" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} /><br/><br/>
        <button onClick={handleAgregarProducto}>Agregar Producto</button><br />
        <button onClick={() => setModalIsOpen(false)}>Cancelar</button></center>
      </Modal>
    </div>
  );
};

export default NuevoProducto;
