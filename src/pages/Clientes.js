import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NuevoCliente from './NuevoCliente';
import EditarCliente from './EditarCliente';
import { Link } from 'react-router-dom';

const Clientes = () => {
  const API_URL = 'http://localhost:8000/api/clientes';

  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClienteId, setSelectedClienteId] = useState(null);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await axios.get(API_URL);
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    obtenerClientes();
  }, [API_URL]);

  const handleAddCliente = async (nuevoCliente) => {
    try {
      const response = await axios.post(API_URL, nuevoCliente);
      setClientes([...clientes, response.data]);
      alert('Cliente agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar cliente:', error);
      alert('Error al agregar cliente');
    }
  };

  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      alert('Cliente eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert('Error al eliminar cliente');
    }
  };

  const handleEditCliente = (id) => {
    setSelectedClienteId(id);
    setShowModal(true);
  };

  const handleUpdateCliente = async (id, updatedCliente) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedCliente);
      setClientes(clientes.map(cliente => (cliente.id === id ? updatedCliente : cliente)));
      alert('Cliente actualizado exitosamente');
      toggleModal();
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      alert('Error al actualizar cliente');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setSelectedClienteId(null);
  };

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{ fontFamily: 'Arial' }}>Clientes</h2></center>
        <button onClick={toggleModal}>Agregar Cliente</button><br />
        {showModal && (
          <NuevoCliente
            onAddCliente={handleAddCliente}
            onCloseModal={toggleModal}
          />
        )}
        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: 'Arial' }}>Nombre</th>
              <th style={{ fontFamily: 'Arial' }}>Apellido</th>
              <th style={{ fontFamily: 'Arial' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombres}</td>
                <td>{cliente.apellidos}</td>
                <td>
                  <button onClick={() => handleEditCliente(cliente.id)}>
                    Editar
                  </button><br />
                  <button onClick={() => handleDeleteCliente(cliente.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {selectedClienteId && (
          <EditarCliente
            clienteId={selectedClienteId}
            onCloseModal={toggleModal}
            onUpdateCliente={handleUpdateCliente}
          />
        )}
        <center><button type='submit'><Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Ir a inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Clientes;
