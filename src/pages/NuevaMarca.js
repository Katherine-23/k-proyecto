import React, { useState } from 'react';
import axios from 'axios';

const NuevaMarca = ({ onAddMarca, onCloseModal }) => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaMarca = { nombre, estado: parseInt(estado) };
    try {
      const response = await axios.post('http://localhost:8000/api/marcas', nuevaMarca);
      const marcaAgregada = response.data;
      onAddMarca(marcaAgregada);
      onCloseModal(); // Close the modal after adding the brand
    } catch (error) {
      console.error('Error al agregar marca:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <center><h2>Nueva Marca</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br/><br/>
          <label htmlFor="estado">Estado:</label>
          <input type="number" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} /><br/><br />
          <button type="submit">Agregar Marca</button><br/>
          <button type="button" onClick={onCloseModal}>Cancelar</button> {/* Botón para cerrar el modal */}
        </form></center>
      </div>
    </div>
  );
};

export default NuevaMarca;
