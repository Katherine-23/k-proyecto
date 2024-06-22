import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const NuevoProveedor = ({ onClose, onAgregarProveedor }) => {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor((prevProveedor) => ({
      ...prevProveedor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/proveedores', nuevoProveedor);
      onAgregarProveedor(response.data);
      onClose();
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <center><h2>Nuevo Proveedor</h2></center>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" id="nombre" name="nombre" value={nuevoProveedor.nombre} onChange={handleChange} />
          </div><br/>
          <div>
            <label htmlFor="direccion">Estado: </label>
            <input type="number" id="direccion" name="estado" value={nuevoProveedor.estado} onChange={handleChange} />
          </div><br />
          <center>
            <button type="submit">Agregar Proveedor</button><br />
            <button type="button" onClick={onClose}>Cancelar</button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default NuevoProveedor;
