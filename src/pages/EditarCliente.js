import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarCliente = ({ clienteId, onCloseModal }) => {
  const [cliente, setCliente] = useState({
    nombres: '',
    apellidos: '',
  });

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/clientes/${clienteId}`);
        setCliente(response.data);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    };

    obtenerCliente();
  }, [clienteId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/clientes/${clienteId}`, cliente);
      onCloseModal(); // Cierra el modal después de editar el cliente
    } catch (error) {
      console.error('Error al editar cliente:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <center><h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" value={cliente.nombres} onChange={handleChange} /><br/><br/>
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={cliente.apellidos} onChange={handleChange} />
          </div><br />
          <button type="submit">Guardar Cambios</button><br />
          <button type="button" onClick={onCloseModal}>Cancelar</button>
        </form></center>
      </div>
    </div>
  );
};

export default EditarCliente;
