import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const NuevaCategoria = ({ onClose, onAgregarCategoria }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombres: '',
    tipo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria((prevCategoria) => ({
      ...prevCategoria,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/categorias', nuevaCategoria);
      onAgregarCategoria(response.data);
      onClose();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <center><h2>Nueva Categoría</h2></center>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombre: </label>
            <input type="text" id="nombres" name="nombres" value={nuevaCategoria.nombres} onChange={handleChange} />
          </div><br/>
          <div>
            <label htmlFor="tipo">Tipo: </label>
            <input type="text" id="tipo" name="tipo" value={nuevaCategoria.tipo} onChange={handleChange} />
          </div><br />
          <center><button type="submit">Agregar Categoría</button><br/>
          <button type="button" onClick={onClose}>Cancelar</button></center>
        </form>
      </div>
    </div>
  );
};

export default NuevaCategoria;
