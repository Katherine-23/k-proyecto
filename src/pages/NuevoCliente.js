import React, { useState } from 'react';
import axios from 'axios';

const NuevoCliente = ({ onAddCliente, onCloseModal }) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombres: '',
    apellidos: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/clientes', nuevoCliente);
      onAddCliente(response.data);
      onCloseModal(); // Cierra el modal después de agregar el cliente
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <center><h2>Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" value={nuevoCliente.nombres} onChange={handleChange} /><br/><br/>
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={nuevoCliente.apellidos} onChange={handleChange} />
          </div><br />
          <button type="submit">Agregar Cliente</button><br />
          <button type="button" onClick={onCloseModal}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default NuevoCliente;
