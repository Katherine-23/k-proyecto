import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css';

const EditarProveedor = ({ proveedor, onClose, onUpdate, onEliminar }) => {
  const [proveedorEditado, setProveedorEditado] = useState({
    nombre: proveedor.nombre,
    estado: proveedor.estado,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedorEditado((prevProveedor) => ({
      ...prevProveedor,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/proveedores/${proveedor.id}`, proveedorEditado);
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error al editar proveedor:', error);
    }
  };

  const handleEliminar = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/proveedores/${proveedor.id}`);
      onEliminar(proveedor.id);
      onClose();
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <center><h2>Editar Proveedor</h2></center>
        <form>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={proveedorEditado.nombre}
              onChange={handleChange}
            />
          </div><br/>
          <div>
            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={proveedorEditado.estado}
              onChange={handleChange}
            />
          </div><br />
          <center>
            <button type="button" onClick={handleSave}>Guardar Cambios</button><br />
            <button type="button" onClick={onClose}>Cancelar</button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default EditarProveedor;
