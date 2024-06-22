import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const EditarCategoria = ({ categoria, onClose, onUpdate }) => {
  const [categoriaEditada, setCategoriaEditada] = useState({
    nombres: categoria.nombres,
    tipo: categoria.tipo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada((prevCategoria) => ({
      ...prevCategoria,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/categorias/${categoria.id}`, categoriaEditada);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error al editar categoría:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <center><h2>Editar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombre:</label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={categoriaEditada.nombres}
              onChange={handleChange}
            />
          </div><br />
          <div>
            <label htmlFor="tipo">Tipo:</label>
            <input type="text" id="tipo" name="tipo" value={categoriaEditada.tipo} onChange={handleChange} />
          </div><br />
          <button type="submit">Guardar Cambios</button><br />
          <button type="button" onClick={onClose}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default EditarCategoria;
